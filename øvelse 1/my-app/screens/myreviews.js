/**
 * MyReviews.js
 * Viser en liste over brugerens egne rejseanmeldelser
 * Henter data fra lokal lagring via AsyncStorage
 */ 

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { loadMyReviews } from '../storage/storage';

/**MyReviews komponent - Oversigt over brugerens egne anmeldelser*/

export default function MyReviews() {
  const [items, setItems] = useState([]);

  useEffect(() => { 
    (async () => setItems(await loadMyReviews()))(); 
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mine reviews</Text>
      {/*
        FlatList til effektiv rendering af review-liste
        - data: Array af review objekter
        - keyExtractor: Bruger review.id som unik nøgle
        - ListEmptyComponent: Vises når brugeren ikke har nogen reviews
        - renderItem: Definerer hvordan hvert review vises
      */}
      <FlatList
        data={items}
        keyExtractor={r => r.id} // Unik ID fra hvert review
        ListEmptyComponent={<Text style={styles.emptyText}>Du har ikke skrevet nogen reviews endnu.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={{ fontWeight: '700' }}>{item.title} · {item.country}</Text>
            <Text>{item.text}</Text>
            <Text style={styles.rating}> {item.rating}/5</Text>
            <Text style={{ opacity: 0.6, marginTop: 4 }}>
              {new Date(item.createdAt).toLocaleString()} 
            </Text>
          </View>
        )}
      />
    </View>
  );
}

//styles for MyReviews komponenten
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eee',
  },
  rating: {
    color: '#FF9529',
    fontWeight: 'bold',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    opacity: 0.6,
  },
});