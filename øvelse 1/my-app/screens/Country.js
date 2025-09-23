import { useState } from 'react';
import { View, Text, FlatList, Pressable, TextInput } from 'react-native';
import styles from '../styles';

const normalize = (s) => s.trim().toLowerCase();

export default function Country({ route, navigation }) {
  const { continent } = route.params;

  const [countries, setCountries] = useState(continent.countries || []);
  const [newCountry, setNewCountry] = useState('');
  const [error, setError] = useState('');

  const addCountry = () => {
    const name = newCountry.trim();
    if (!name) {
      setError('Skriv et landenavn.');
      return;
    }
    const exists = countries.some((c) => normalize(c) === normalize(name));
    if (exists) {
      setError('Landet findes allerede på listen.');
      return;
    }
    setCountries((prev) => [...prev, name]);
    setNewCountry('');
    setError('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{continent.name} – vælg land</Text>

      {/* Liste over lande */}
      <FlatList
        data={countries}
        keyExtractor={(x) => x}
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            onPress={() => navigation.navigate('Reviews', { country: item })}
          >
            <Text style={styles.itemTitle}>{item}</Text>
          </Pressable>
        )}
      />

      {/* Tilføj land */}
      <Text style={styles.subtitle}>Mangler dit land?</Text>
      <TextInput
        style={styles.input}
        placeholder="Skriv landenavn (fx Norge)"
        value={newCountry}
        onChangeText={(t) => {
          setNewCountry(t);
          if (error) setError('');
        }}
        autoCapitalize="words"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Pressable style={styles.btn} onPress={addCountry}>
        <Text style={styles.btnText}>Tilføj land</Text>
      </Pressable>
    </View>
  );
}
