import React from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';

export default function Forside({ navigation }) {
  return (
    <View style={styles.frontContainer}>
      {/* Profil ikon i hjørnet */}
      <Pressable 
        style={styles.profileIcon}
        onPress={() => navigation.navigate('Login')}
      >
        <Ionicons name="person-circle" size={32} color="#6C63FF" />
      </Pressable>

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

const styles = StyleSheet.create({
  frontContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  profileIcon: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
  },
  frontTitle: {
    fontSize: 32,
    fontWeight: '300',
    marginBottom: 40,
    textAlign: 'center',
    color: '#1a1a1a',
    letterSpacing: 1,
  },
  globe: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 40,
  },
  btn: {
    backgroundColor: '#6C63FF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 200,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});