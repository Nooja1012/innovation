import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { loadFavorites } from '../Components/storage';

export default function Favorites() {
  const [items, setItems] = useState([]);

  useEffect(() => { (async () => setItems(await loadFavorites()))(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⭐ Favoritter</Text>
      <FlatList
        data={items}
        keyExtractor={(s, i) => s + i}
        ListEmptyComponent={<Text style={styles.emptyText}>Ingen favoritter endnu.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={{ fontWeight: '600' }}>{item}</Text>
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
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    opacity: 0.6,
  },
});