// screens/CountryAdvisories.js
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { View, Text, Pressable, FlatList, TextInput, ActivityIndicator, Linking, Alert } from 'react-native';
import styles from '../styles';

/* ---------- Helpers ---------- */

// fjern parantes i tekst (når lande har flere navne)
const removeParens = (s='') => s.replace(/\((.*?)\)/g, '').trim();

// Normaliser streng til sammenligning
const norm = (s='') => removeParens(s)
  .toLowerCase()
  .replaceAll('&',' og ')
  .replaceAll(' and ',' og ')
  .replaceAll('æ','ae').replaceAll('ø','oe').replaceAll('å','aa')
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // fjern accenter
  .replace(/[^a-z0-9\s-]/g,'')
  .replace(/\s+/g,' ')
  .trim();

// omdanner navn så det matcher med det navn som udenrigsministeriet anvender 
const slugify = (s='') => norm(s).replace(/\s+/g, '-');

// Hvis lande har andre navne/alias
const ALIAS_DA = {
  'united states': 'Amerikas Forenede Stater',
  'usa': 'Amerikas Forenede Stater',
  'united kingdom': 'Storbritannien',
  'uk': 'Storbritannien',
  'czechia': 'Tjekkiet',
  'ivory coast': 'Elfenbenskysten',
  'cape verde': 'Kap Verde',
  'myanmar': 'Myanmar',
  'burma': 'Myanmar',
  'eswatini': 'Swaziland',
  'north macedonia': 'Nordmakedonien',
  'lao': 'Laos',
  'viet nam': 'Vietnam',
  'drc': 'Den Demokratiske Republik Congo',
  'democratic republic of the congo': 'Den Demokratiske Republik Congo',
  'republic of the congo': 'Congo',
  'south korea': 'Sydkorea',
  'north korea': 'Nordkorea',
  'east timor': 'Østtimor',
  'timor-leste': 'Østtimor',
  'uae': 'De Forenede Arabiske Emirater',
  'united arab emirates': 'De Forenede Arabiske Emirater',
  'palestine': 'De Palæstinensiske Områder',
  'russia': 'Rusland',
  'syrian arab republic': 'Syrien',
  'venezuela bolivarian republic of': 'Venezuela',
  'bolivia plurinational state of': 'Bolivia',
  'tanzania united republic of': 'Tanzania',
  'iran islamic republic of': 'Iran',
  'korea democratic people s republic of': 'Nordkorea',
  'korea republic of': 'Sydkorea',
  'hong kong': 'Hongkong',
  'macau': 'Macao',
  'brunei darussalam': 'Brunei',
  'bahamas the': 'Bahamas',
  'gambia the': 'Gambia',
};

// Byg mulige UM-URL’er for et land (dansk + engelsk + alias)
const buildUmCandidates = (name_da, name_en) => {
  const BASE = 'https://um.dk/rejse-og-ophold/rejse-til-udlandet/rejsevejledninger';
  const da = removeParens(name_da || '');
  const en = removeParens(name_en || '');
  const aliasKey = norm(name_da || name_en);
  const alias = ALIAS_DA[aliasKey] || ALIAS_DA[norm(name_en)] || null;

  const candidates = [];
  if (da) candidates.push(`${BASE}/${slugify(da)}`);
  if (alias) candidates.push(`${BASE}/${slugify(alias)}`);
  if (en) candidates.push(`${BASE}/${slugify(en)}`);

  // som sidste udvej: UM-søgning via Google, hvis siden ikke loades 
  const query = encodeURIComponent(`site:um.dk rejsevejledninger ${name_da || name_en}`);
  candidates.push(`https://www.google.com/search?q=${query}`);

  return candidates;
};

// Tjek om en URL ser “rigtig” ud 
async function isReachable(url) {
  try {
    const r = await fetch(url, { method: 'GET' });
    // accepthvis 200/301/302 – UM kan redirecte
    return r.status >= 200 && r.status < 400;
  } catch {
    return false;
  }
}

/* ---------- Data: REST Countries ---------- */
async function fetchRestCountries() {
  const r = await fetch('https://restcountries.com/v3.1/all?fields=cca2,cca3,ccn3,name,translations,region,subregion');
  if (!r.ok) throw new Error('REST Countries fejlede');
  const all = await r.json();
  return all.map(c => ({
    code2: c.cca2,
    code3: c.cca3,
    num: c.ccn3,
    name_en: c.name?.common || '',
    name_da: c.translations?.dan?.common || c.name?.common || '',
    region: c.region || '',
    subregion: c.subregion || '',
  })).sort((a,b)=> (a.name_da||'').localeCompare(b.name_da||'', 'da'));
}

/* ---------- Screen ---------- */
export default function CountryAdvisories() {
  const [all, setAll] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    let cancel = false;
    (async () => {
      setLoading(true); setErr('');
      try {
        const countries = await fetchRestCountries();
        if (!cancel) setAll(countries);
      } catch (e) {
        if (!cancel) setErr('Kunne ikke hente lande.');
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, []);

  const data = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return all;
    return all.filter(c =>
      (c.name_da || '').toLowerCase().includes(s) ||
      (c.name_en || '').toLowerCase().includes(s) ||
      (c.code2 || '').toLowerCase() === s ||
      (c.code3 || '').toLowerCase() === s
    );
  }, [q, all]);

  const openUM = useCallback(async (item) => {
    const candidates = buildUmCandidates(item.name_da, item.name_en);

    // prøv hver kandidat – hvis en “ser rigtig ud”, åbn den; ellers åbn sidste (Google-søgning)
    for (let i = 0; i < candidates.length - 1; i++) {
      const url = candidates[i];
      if (await isReachable(url)) {
        Linking.openURL(url);
        return;
      }
    }
    // fallback: søgning
    Linking.openURL(candidates[candidates.length - 1]);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.advisoryHeader}>
        <Text style={styles.title}>Rejsevejledninger</Text>
        <Text style={styles.subtitle}>Vælg et land for at åbne Udenrigsministeriets side</Text>
      </View>

      <TextInput
        style={styles.searchInline}
        placeholder="Søg land (navn eller kode)…"
        value={q}
        onChangeText={setQ}
      />

      {loading ? <ActivityIndicator /> : null}
      {err ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>⚠️ {err}</Text>
        </View>
      ) : null}

      <FlatList
        data={data}
        keyExtractor={(x) => x.code3}
        ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
        renderItem={({ item }) => (
          <Pressable style={styles.listRow} onPress={() => openUM(item)}>
            <View style={styles.listRowContent}>
              <Text style={styles.listRowTitle}>{item.name_da || item.name_en}</Text>
              <Text style={styles.listRowMeta}>
                {item.region}{item.subregion ? ` • ${item.subregion}` : ''}
              </Text>
              <Text style={styles.listRowHint}>Tryk for at åbne UM’s rejsevejledning</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        )}
      />
    </View>
  );
}




