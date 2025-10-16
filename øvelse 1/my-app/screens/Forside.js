import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles';

export default function Forside({ navigation }) {
  return (
    <View style={styles.frontContainer}>
      <Text style={styles.frontTitle}>Know Before You Go</Text>

      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg',
        }}
        style={styles.globe}
      />

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.btnText}>Go to Continents</Text>
      </TouchableOpacity>
    </View>
  );
}
