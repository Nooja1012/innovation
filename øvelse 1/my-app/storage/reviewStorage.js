import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_PREFIX = 'reviews:'; // pr. land: reviews:<COUNTRYID>
const USER_ID_KEY = 'local:userId';

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
function normId(countryId) {
  return String(countryId || '').trim().toUpperCase();
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
  return `${KEY_PREFIX}${normId(countryId)}`;
}

async function readList(countryId) {
  const raw = await AsyncStorage.getItem(key(countryId));
  const list = raw ? JSON.parse(raw) : [];
  const id = normId(countryId);
  return list.filter((r) => normId(r.countryId) === id);
}

async function writeList(countryId, list) {
  await AsyncStorage.setItem(key(countryId), JSON.stringify(list));
}

function avgOf(list, field) {
  const arr = list.map((x) => Number(x[field]) || 0);
  if (!arr.length) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

export async function getReviews(countryId, sort = 'newest') {
  const list = await readList(countryId);
  const sorted = [...list].sort((a, b) => {
    if (sort === 'best') return (b.uniRating || 0) - (a.uniRating || 0); // sorter efter uni som “bedst”
    return (b.createdAt || 0) - (a.createdAt || 0);
  });
  return {
    items: sorted,
    total: sorted.length,
    avgUni: avgOf(sorted, 'uniRating'),
    avgCountry: avgOf(sorted, 'countryRating'),
  };
}

export async function createReview(countryId, payload) {
  const userId = await getDeviceUserId();
  const id = normId(countryId);
  const list = await readList(id);

  const item = {
    id: uid(),
    userId,
    userName: payload.userName || 'User',
    countryId: id,
    uniRating: Number(payload.uniRating) || 0,
    countryRating: Number(payload.countryRating) || 0,
    title: String(payload.title || '').trim(),
    text: String(payload.text || '').trim(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  list.push(item);
  await writeList(id, list);
  return item;
}

export async function updateReview(countryId, reviewId, changes) {
  const userId = await getDeviceUserId();
  const id = normId(countryId);
  const list = await readList(id);

  const idx = list.findIndex((r) => r.id === reviewId);
  if (idx === -1) throw new Error('Review ikke fundet.');
  if (list[idx].userId !== userId) throw new Error('Du kan kun redigere dit eget review.');

  list[idx] = {
    ...list[idx],
    ...changes,
    countryId: id,
    uniRating: changes.uniRating != null ? Number(changes.uniRating) : list[idx].uniRating,
    countryRating: changes.countryRating != null ? Number(changes.countryRating) : list[idx].countryRating,
    title: changes.title != null ? String(changes.title).trim() : list[idx].title,
    text: changes.text != null ? String(changes.text).trim() : list[idx].text,
    updatedAt: Date.now(),
  };

  await writeList(id, list);
  return list[idx];
}

export async function deleteReview(countryId, reviewId) {
  const userId = await getDeviceUserId();
  const id = normId(countryId);
  const list = await readList(id);

  const item = list.find((r) => r.id === reviewId);
  if (!item) return;
  if (item.userId !== userId) throw new Error('Du kan kun slette dit eget review.');

  const next = list.filter((r) => r.id !== reviewId);
  await writeList(id, next);
}
