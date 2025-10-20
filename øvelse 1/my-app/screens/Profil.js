/**Profil.js
 * Brugerprofilsiden der viser oversigt over brugerens aktiviteter
 * Viser antal reviews og favoritter med navigation til detaljer
 */

import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { globalStyles } from '../globalstyle';
import { loadMyReviews, loadFavorites } from '../storage/storage'; // Importer lagringsfunktioner

export default function Profile({ navigation }) {
  // State til at holde antal reviews og favoritter
  const [countReviews, setCountReviews] = useState(0);
  const [countFavs, setCountFavs] = useState(0);

  /**
   * useEffect hook der loader brugerdata når skærmen fokuseres
   * Bruger navigation focus listener for at opdatere data ved tilbagevenden
   */
  useEffect(() => {
    const unsub = navigation.addListener('focus', async () => {
       // Hent brugerens data fra AsyncStorage ved skærmfokus
      const my = await loadMyReviews();
      const fav = await loadFavorites();
      setCountReviews(my.length);
      setCountFavs(fav.length);
    });
    return unsub;
  }, [navigation]);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleLarge}>Min profil</Text>
      <Text style={[globalStyles.subtitle, globalStyles.textCenter]}>
        Lokal bruger (ingen login) {/* Placeholder tekst for brugerinfo */}
      </Text>

      <Pressable 
      // Knap til at navigere til Mine Reviews skærmen
        style={[globalStyles.btn, globalStyles.btnLarge]} 
        onPress={() => navigation.navigate('MyReviews')}
      >
        <Text style={globalStyles.btnText}> Mine reviews ({countReviews})</Text>
      </Pressable>

      <Pressable 
      // Knap til at navigere til Favoritter skærmen
        style={[globalStyles.btn, globalStyles.btnLarge]} 
        onPress={() => navigation.navigate('Favorites')}
      >
        <Text style={globalStyles.btnText}> Favoritter ({countFavs})</Text>
      </Pressable>
    </View>
  );
}