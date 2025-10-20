import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { loadMyReviews } from '../Components/storage';

export default function MyReviews() {
  const [items, setItems] = useState([]);

  useEffect(() => { 
    (async () => setItems(await loadMyReviews()))(); 
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mine reviews</Text>
      <FlatList
        data={items}
        keyExtractor={r => r.id}
        ListEmptyComponent={<Text style={styles.emptyText}>Du har ikke skrevet nogen reviews endnu.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={{ fontWeight: '700' }}>{item.title} · {item.country}</Text>
            <Text>{item.text}</Text>
            <Text style={styles.rating}>⭐ {item.rating}/5</Text>
            <Text style={{ opacity: 0.6, marginTop: 4 }}>
              {new Date(item.createdAt).toLocaleString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

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