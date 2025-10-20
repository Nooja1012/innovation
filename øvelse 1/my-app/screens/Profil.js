import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { globalStyles } from '../globalstyle';
import { loadMyReviews, loadFavorites } from '../storage/storage';

export default function Profile({ navigation }) {
  const [countReviews, setCountReviews] = useState(0);
  const [countFavs, setCountFavs] = useState(0);

  useEffect(() => {
    const unsub = navigation.addListener('focus', async () => {
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
        Lokal bruger (ingen login)
      </Text>

      <Pressable 
        style={[globalStyles.btn, globalStyles.btnLarge]} 
        onPress={() => navigation.navigate('MyReviews')}
      >
        <Text style={globalStyles.btnText}>📚 Mine reviews ({countReviews})</Text>
      </Pressable>

      <Pressable 
        style={[globalStyles.btn, globalStyles.btnLarge]} 
        onPress={() => navigation.navigate('Favorites')}
      >
        <Text style={globalStyles.btnText}>⭐ Favoritter ({countFavs})</Text>
      </Pressable>
    </View>
  );
}