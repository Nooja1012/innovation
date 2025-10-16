// screens/Reviews.js
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import styles from '../styles';
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  getDeviceUserId,
} from '../storage/reviewStorage';

function Stars({ value = 0, onChange, size = 22 }) {
  const arr = [1, 2, 3, 4, 5];
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
  const { countryId, countryName } = route.params;

  const [localUserId, setLocalUserId] = useState(null);
  const [items, setItems] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState('newest'); // 'newest' | 'best'
  const [loading, setLoading] = useState(false);

  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const canSubmit = useMemo(
    () => rating >= 1 && title.trim().length >= 3 && text.trim().length >= 10,
    [rating, title, text]
  );

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getReviews(countryId, sort);
      setItems(data.items);
      setAvgRating(data.avgRating || 0);
      setTotal(data.total || 0);
    } catch {
      setError('Kunne ikke hente reviews.');
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
    setRating(0);
    setTitle('');
    setText('');
    setEditingId(null);
    setError('');
  }

  async function onSubmit() {
    setError('');
    if (!canSubmit) {
      setError('Udfyld rating, titel (min. 3 tegn) og tekst (min. 10 tegn).');
      return;
    }

    try {
      if (editingId) {
        await updateReview(countryId, editingId, { rating, title, text });
      } else {
        await createReview(countryId, { rating, title, text, userName: 'User' });
      }
      resetForm();
      await load();
      Keyboard.dismiss();
    } catch (e) {
      setError(e.message || 'Noget gik galt. Prøv igen.');
    }
  }

  function beginEdit(item) {
    setEditingId(item.id);
    setRating(item.rating);
    setTitle(item.title);
    setText(item.text);
  }

  async function onDelete(id) {
    Alert.alert('Slet review', 'Er du sikker på, at du vil slette dette review?', [
      { text: 'Annuller', style: 'cancel' },
      {
        text: 'Slet',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteReview(countryId, id);
            await load();
          } catch (e) {
            setError(e.message || 'Kunne ikke slette review.');
          }
        },
      },
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
        <Stars value={item.rating} />
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

      {/* Stats */}
      {total > 0 && (
        <View style={[styles.row, styles.spaceBetween, { marginTop: 4 }]}>
          <View style={styles.row}>
            <Stars value={Math.round(avgRating)} />
            <Text style={{ marginLeft: 8 }}>{avgRating.toFixed(1)} / 5</Text>
          </View>
          <Text style={styles.chip}>{total} i alt</Text>
        </View>
      )}

      <View style={styles.divider} />

      {/* Sortering */}
      <Text style={styles.subtitle}>Sorter</Text>
      <View style={[styles.row]}>
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
          <Text style={styles.smallBtnText}>Bedste</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* Form */}
      <Text style={styles.subtitle}>{editingId ? 'Redigér dit review' : 'Skriv et review'}</Text>
      <Stars value={rating} onChange={setRating} size={24} />

      <TextInput
        placeholder="Titel (fx: Fantastisk udvekslingsoplevelse)"
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
