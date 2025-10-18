// screens/Country.js
import React, { useEffect, useMemo, useState } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import styles from '../styles';

export default function Country({ route, navigation }) {
  const { apiRegion, continentLabel } = route.params || {};
  const [countries, setCountries] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErr('');
        const url = `https://restcountries.com/v3.1/region/${encodeURIComponent(
          apiRegion || 'europe'
        )}?fields=cca2,name,translations,region,subregion`;

        const r = await fetch(url);
        if (!r.ok) throw new Error('Kunne ikke hente lande');
        const all = await r.json();

        const mapped = all.map((c) => {
          const nameDa = c.translations?.dan?.common || c.name?.common || '';
          return {
            code2: (c.cca2 || '').toUpperCase(),
            name_da: nameDa,
            name_en: c.name?.common || '',
            region: c.region || '',
            subregion: c.subregion || '',
          };
        });

        const sorted = mapped.sort((a, b) =>
          a.name_da.localeCompare(b.name_da, 'da')
        );
        if (alive) setCountries(sorted);
      } catch (e) {
        if (alive) setErr('Kunne ikke hente lande. Tjek internet.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [apiRegion]);

  const data = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return countries;
    return countries.filter(
      (c) =>
        c.name_da.toLowerCase().includes(s) ||
        c.name_en.toLowerCase().includes(s) ||
        c.code2.toLowerCase().includes(s)
    );
  }, [countries, q]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate('Reviews', {
          countryId: item.code2,     // bruges til storage-nøglen
          countryName: item.name_da, // flot titel
        })
      }
    >
      <Text style={styles.itemTitle}>{item.name_da}</Text>
      <Text style={styles.rating}>{item.code2} • {item.subregion || item.region}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{continentLabel || 'Lande'}</Text>

      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Søg (fx Danmark, JP, Sweden)"
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
      />

      {loading && <ActivityIndicator style={{ marginTop: 10 }} />}
      {err ? <Text style={styles.errorText}>{err}</Text> : null}

      <FlatList
        data={data}
        keyExtractor={(it) => it.code2}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          !loading && (
            <Text style={styles.subtitle}>
              Ingen lande fundet{q ? ' på din søgning.' : '.'}
            </Text>
          )
        }
      />
    </View>
  );
}
