import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList, Alert,
  KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform,
} from 'react-native';
import styles from '../styles';
import {
  getReviews, createReview, updateReview, deleteReview, getDeviceUserId,
} from '../storage/reviewStorage';

function Stars({ value = 0, onChange, size = 22 }) {
  const arr = [1,2,3,4,5];
  return (
    <View style={styles.starsRow}>
      {arr.map((n) => (
        <TouchableOpacity key={n} onPress={() => onChange?.(n)} activeOpacity={0.7}>
          <Text style={[styles.star, { fontSize: size }]}>{n <= value ? '★' : '☆'}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function Reviews({ route }) {
  const rawId = route?.params?.countryId;
  const countryId = String(rawId || '').trim().toUpperCase();
  const countryName = route?.params?.countryName || countryId || 'Land';

  const [localUserId, setLocalUserId] = useState(null);
  const [items, setItems] = useState([]);
  const [avg, setAvg] = useState({ avgUni: 0, avgCountry: 0, total: 0 });
  const [sort, setSort] = useState('newest');
  const [loading, setLoading] = useState(false);

  const [uniRating, setUniRating] = useState(0);
  const [countryRating, setCountryRating] = useState(0);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const canSubmit = useMemo(
    () => uniRating >= 1 && countryRating >= 1 && title.trim().length >= 3 && text.trim().length >= 10,
    [uniRating, countryRating, title, text]
  );

  const load = useCallback(async () => {
    if (!countryId) return;
    setLoading(true);
    try {
      const data = await getReviews(countryId, sort);
      setItems(data.items);
      setAvg({
        avgUni: data.avgUni || 0,
        avgCountry: data.avgCountry || 0,
        total: data.total || 0,
      });
    } finally {
      setLoading(false);
    }
  }, [countryId, sort]);

  useEffect(() => {
    (async () => {
      const id = await getDeviceUserId();
      setLocalUserId(id);
      await load();
    })();
  }, [load]);

  function resetForm() {
    setUniRating(0); setCountryRating(0);
    setTitle(''); setText('');
    setEditingId(null); setError('');
  }

  async function onSubmit() {
    setError('');
    if (!canSubmit) {
      setError('Udfyld begge ratings (min. 1 stjerne), titel (min. 3) og tekst (min. 10).');
      return;
    }
    try {
      if (editingId) {
        await updateReview(countryId, editingId, {
          uniRating, countryRating, title, text,
        });
      } else {
        await createReview(countryId, {
          uniRating, countryRating, title, text, userName: 'User',
        });
      }
      resetForm(); await load(); Keyboard.dismiss();
    } catch (e) {
      setError(e.message || 'Noget gik galt. Prøv igen.');
    }
  }

  function beginEdit(item) {
    setEditingId(item.id);
    setUniRating(item.uniRating || 0);
    setCountryRating(item.countryRating || 0);
    setTitle(item.title); setText(item.text);
  }

  async function onDelete(id) {
    Alert.alert('Slet review', 'Er du sikker på, at du vil slette dette review?', [
      { text: 'Annuller', style: 'cancel' },
      { text: 'Slet', style: 'destructive', onPress: async () => {
          try { await deleteReview(countryId, id); await load(); }
          catch (e) { setError(e.message || 'Kunne ikke slette review.'); }
        } 
      }
    ]);
  }

  const renderItem = ({ item }) => {
    const mine = localUserId && item.userId === localUserId;
    return (
      <View style={styles.reviewCard}>
        <View style={styles.reviewHeader}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.reviewMeta}>
            {new Date(item.createdAt || Date.now()).toLocaleDateString()}
          </Text>
        </View>

        <View style={[styles.row, { gap: 12 }]}>
          <Text style={styles.reviewMeta}>Universitet:</Text>
          <Stars value={item.uniRating || 0} />
          <Text style={styles.reviewMeta}>Land:</Text>
          <Stars value={item.countryRating || 0} />
        </View>

        <Text style={styles.reviewBody}>{item.text}</Text>

        <View style={[styles.row, styles.spaceBetween, { marginTop: 10 }]}>
          <Text style={styles.reviewMeta}>af {item.userName || 'Anonym'}</Text>
          {mine && (
            <View style={styles.row}>
              <TouchableOpacity style={styles.smallBtn} onPress={() => beginEdit(item)}>
                <Text style={styles.smallBtnText}>Redigér</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.smallBtn} onPress={() => onDelete(item.id)}>
                <Text style={styles.smallBtnText}>Slet</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const Header = (
    <View style={{ padding: 20, paddingTop: 16 }}>
      <Text style={[styles.title, { fontSize: 26 }]}>Reviews – {countryName}</Text>

      {avg.total > 0 && (
        <View style={[styles.row, styles.spaceBetween, { marginTop: 6 }]}>
          <View>
            <View style={styles.row}>
              <Text style={styles.subtitle}>Uni:</Text>
              <Stars value={Math.round(avg.avgUni)} />
              <Text style={{ marginLeft: 8 }}>{avg.avgUni.toFixed(1)} / 5</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.subtitle}>Land:</Text>
              <Stars value={Math.round(avg.avgCountry)} />
              <Text style={{ marginLeft: 8 }}>{avg.avgCountry.toFixed(1)} / 5</Text>
            </View>
          </View>
          <Text style={styles.chip}>{avg.total} i alt</Text>
        </View>
      )}

      <View style={styles.divider} />

      <Text style={styles.subtitle}>Sorter</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.smallBtn, { marginRight: 8 }, sort === 'newest' && { borderColor: '#bbb' }]}
          onPress={() => setSort('newest')}
        >
          <Text style={styles.smallBtnText}>Nyeste</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.smallBtn, sort === 'best' && { borderColor: '#bbb' }]}
          onPress={() => setSort('best')}
        >
          <Text style={styles.smallBtnText}>Bedst (Uni)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <Text style={styles.subtitle}>{editingId ? 'Redigér dit review' : 'Skriv et review'}</Text>

      <Text style={styles.reviewMeta}>Universitet</Text>
      <Stars value={uniRating} onChange={setUniRating} size={24} />

      <Text style={[styles.reviewMeta, { marginTop: 6 }]}>Land</Text>
      <Stars value={countryRating} onChange={setCountryRating} size={24} />

      <TextInput
        placeholder="Titel (fx: God udveksling på CBS)"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        returnKeyType="done"
        onSubmitEditing={Keyboard.dismiss}
      />
      <TextInput
        placeholder="Din erfaring (min. 10 tegn)"
        value={text}
        onChangeText={setText}
        style={[styles.input, { height: 110, textAlignVertical: 'top' }]}
        multiline
        returnKeyType="done"
        onSubmitEditing={Keyboard.dismiss}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.row}>
        {editingId && (
          <TouchableOpacity style={styles.smallBtn} onPress={resetForm}>
            <Text style={styles.smallBtnText}>Annuller</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.btn, { marginLeft: editingId ? 8 : 0 }]}
          onPress={onSubmit}
          disabled={!canSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>{editingId ? 'Gem ændringer' : 'Indsend review'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#F4F3FB' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <FlatList
          data={items}
          keyExtractor={(it) => it.id}
          renderItem={renderItem}
          ListHeaderComponent={Header}
          ListEmptyComponent={
            !loading ? (
              <Text style={[styles.subtitle, { paddingHorizontal: 20 }]}>
                Ingen reviews endnu – vær den første!
              </Text>
            ) : null
          }
          contentContainerStyle={{ paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
          onRefresh={load}
          refreshing={loading}
        />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
