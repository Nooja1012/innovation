import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from '../styles';
import { CONTINENTS } from '../Components/data';

export default function Home({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.continentBtn}
      onPress={() =>
        navigation.navigate('Country', {
          continentKey: item.key,
          continentLabel: item.label,
          apiRegion: item.apiRegion,
        })
      }
    >
      <Text style={styles.continentBtnTitle}>{item.label}</Text>
      <Text style={styles.continentBtnSub}>{item.apiRegion}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { marginBottom: 6 }]}>Vælg kontinent</Text>
      <Text style={[styles.subtitle, { marginBottom: 14 }]}>
        Se alle lande fra API for det valgte kontinent
      </Text>

      {/* Kontinent-grid */}
      <FlatList
        data={CONTINENTS}
        keyExtractor={(it) => it.key}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 4 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Divider og knap lidt højere op */}
      <View style={[styles.sectionDivider, { marginVertical: 8 }]}>
        <View style={styles.sectionDividerLine} />
        <Text style={styles.sectionDividerText}>eller</Text>
        <View style={styles.sectionDividerLine} />
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.advisoryBtn, { marginBottom: 20 }]}
        onPress={() => navigation.navigate('CountryAdvisories')}
      >
        <Text style={styles.advisoryBtnText}>Åbn rejsevejledninger</Text>
      </TouchableOpacity>
    </View>
  );
}
