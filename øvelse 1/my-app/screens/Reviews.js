import { useState } from 'react';
import { View, Text, FlatList, TextInput, Pressable } from 'react-native';
import styles from '../styles';
import { initialReviews } from '../data';

export default function Reviews({ route }) {
  const { country } = route.params;
  const [reviews, setReviews] = useState(initialReviews[country] || []);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState('5');

  const addReview = () => {
    if (!title || !text) return;
    const r = { id: Date.now().toString(), title, text, rating: Number(rating) || 0 };
    setReviews([r, ...reviews]);
    setTitle(''); setText(''); setRating('5');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{country} – Reviews</Text>

      <FlatList
        data={reviews}
        keyExtractor={(r) => r.id}
        ListEmptyComponent={<Text>Ingen reviews endnu.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={{ fontWeight: '600' }}>{item.title}</Text>
            <Text>{item.text}</Text>
            <Text style={styles.rating}>⭐ {item.rating}/5</Text>
          </View>
        )}
      />

      <Text style={styles.title}>Tilføj review</Text>
      <TextInput style={styles.input} placeholder="Universitet / by" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Dine tips/erfaring" value={text} onChangeText={setText} multiline />
      <TextInput style={styles.input} placeholder="Score 1–5" value={rating} onChangeText={setRating} keyboardType="numeric" />
      <Pressable style={styles.btn} onPress={addReview}>
        <Text style={styles.btnText}>Tilføj review</Text>
      </Pressable>
    </View>
  );
}
