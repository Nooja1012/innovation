// /storage.js
//seynab har lavet denne filen
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importer AsyncStorage til lokal lagring

// Nøgler til lagring i AsyncStorage

const MY_REVIEWS_KEY = 'MY_REVIEWS_V1';
const FAVS_KEY = 'FAVORITES_V1';

// ---------- My Reviews ----------
export async function loadMyReviews() {
  const raw = await AsyncStorage.getItem(MY_REVIEWS_KEY);
  return raw ? JSON.parse(raw) : [];
}

// Tilføj en ny review til lokal lagring
export async function addMyReview(review) {
  const list = await loadMyReviews();
  const withId = { id: Date.now().toString(), createdAt: new Date().toISOString(), ...review };
  const updated = [withId, ...list];
  await AsyncStorage.setItem(MY_REVIEWS_KEY, JSON.stringify(updated)); // Gem den opdaterede liste
  return withId;
}

// ---------- Favorites ----------
export async function loadFavorites() {
  const raw = await AsyncStorage.getItem(FAVS_KEY);
  return raw ? JSON.parse(raw) : []; // fx ['KU – Copenhagen', 'TU Berlin']
}
// Tilføj eller fjern en favoritdestination
export async function toggleFavorite(item) {
  const list = await loadFavorites();
  const idx = list.indexOf(item);
  const updated = idx >= 0 ? list.filter(x => x !== item) : [item, ...list];
  await AsyncStorage.setItem(FAVS_KEY, JSON.stringify(updated));
  return updated;
}
// Tjek om en destination er i favoritterne
export async function isFavorite(item) {
  const list = await loadFavorites();
  return list.includes(item);
}
