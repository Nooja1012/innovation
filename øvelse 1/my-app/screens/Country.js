// screens/Country.js
import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  Modal,
  Platform,
  ActionSheetIOS,
} from 'react-native';
import styles from '../styles';

const normalize = (s) => s.trim().toLowerCase();

export default function Country({ route, navigation }) {
  const { continent } = route.params;

  const [countries, setCountries] = useState(continent.countries || []);
  const [newCountry, setNewCountry] = useState('');
  const [error, setError] = useState('');

  const [chooserOpen, setChooserOpen] = useState(false);
  const [pendingCountry, setPendingCountry] = useState(null);

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

  const openChoice = (country) => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: country,
          options: ['Annuller', 'Reviews', 'Rejsevejledning'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            navigation.navigate('Reviews', { country });
          } else if (buttonIndex === 2) {
            navigation.navigate('CountryAdvisories', { country });
          }
        }
      );
    } else {
      setPendingCountry(country);
      setChooserOpen(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{continent.name} – vælg land</Text>

      <FlatList
        data={countries}
        keyExtractor={(x) => x}
        renderItem={({ item }) => (
          <Pressable style={styles.item} onPress={() => openChoice(item)}>
            <Text style={styles.itemTitle}>{item}</Text>
          </Pressable>
        )}
      />

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

      {/* Android/Web modal */}
      <Modal
        transparent
        visible={chooserOpen}
        animationType="fade"
        onRequestClose={() => setChooserOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.title} numberOfLines={2}>
              {pendingCountry}
            </Text>

            <Pressable
              style={styles.btn}
              onPress={() => {
                setChooserOpen(false);
                navigation.navigate('Reviews', { country: pendingCountry });
              }}
            >
              <Text style={styles.btnText}>Gå til Reviews</Text>
            </Pressable>
            
          </View>
        </View>
      </Modal>
    </View>
  );
}
