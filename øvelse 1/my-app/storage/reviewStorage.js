// storage/reviewStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_PREFIX = 'reviews:';     // pr. land: reviews:<countryId>
const USER_ID_KEY = 'local:userId';

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export async function getDeviceUserId() {
  let id = await AsyncStorage.getItem(USER_ID_KEY);
  if (!id) {
    id = uid();
    await AsyncStorage.setItem(USER_ID_KEY, id);
  }
  return id;
}

function key(countryId) {
  return `${KEY_PREFIX}${countryId}`;
}

async function readList(countryId) {
  const raw = await AsyncStorage.getItem(key(countryId));
  return raw ? JSON.parse(raw) : [];
}

async function writeList(countryId, list) {
  await AsyncStorage.setItem(key(countryId), JSON.stringify(list));
}

export function computeStats(list) {
  const total = list.length;
  const avgRating = total
    ? list.reduce((s, r) => s + (Number(r.rating) || 0), 0) / total
    : 0;
  return { total, avgRating };
}

/** Hent reviews for et land */
export async function getReviews(countryId, sort = 'newest') {
  const list = await readList(countryId);
  const sorted = [...list].sort((a, b) => {
    if (sort === 'best') return (b.rating || 0) - (a.rating || 0);
    return (b.createdAt || 0) - (a.createdAt || 0); // newest
  });
  const { total, avgRating } = computeStats(sorted);
  return { items: sorted, total, avgRating };
}

/** Opret review – én pr. device-user pr. land */
export async function createReview(countryId, payload) {
  const userId = await getDeviceUserId();
  const list = await readList(countryId);

  if (list.find(r => r.userId === userId)) {
    throw new Error('Du har allerede skrevet et review for dette land.');
  }

  const item = {
    id: uid(),
    userId,
    userName: payload.userName || 'User',
    countryId,
    rating: Number(payload.rating) || 0,
    title: String(payload.title || '').trim(),
    text: String(payload.text || '').trim(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  list.push(item);
  await writeList(countryId, list);
  return item;
}

/** Opdatér eget review */
export async function updateReview(countryId, id, changes) {
  const userId = await getDeviceUserId();
  const list = await readList(countryId);
  const idx = list.findIndex(r => r.id === id);
  if (idx === -1) throw new Error('Review ikke fundet.');
  if (list[idx].userId !== userId) throw new Error('Du kan kun redigere dit eget review.');

  list[idx] = {
    ...list[idx],
    ...changes,
    rating: changes.rating != null ? Number(changes.rating) : list[idx].rating,
    title: changes.title != null ? String(changes.title).trim() : list[idx].title,
    text: changes.text != null ? String(changes.text).trim() : list[idx].text,
    updatedAt: Date.now(),
  };

  await writeList(countryId, list);
  return list[idx];
}

/** Slet eget review */
export async function deleteReview(countryId, id) {
  const userId = await getDeviceUserId();
  const list = await readList(countryId);
  const item = list.find(r => r.id === id);
  if (!item) return;
  if (item.userId !== userId) throw new Error('Du kan kun slette dit eget review.');
  const next = list.filter(r => r.id !== id);
  await writeList(countryId, next);
}
