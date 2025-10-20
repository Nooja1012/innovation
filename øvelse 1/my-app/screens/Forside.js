import React from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../globalstyle'; // Ret stien til din fil

export default function Forside({ navigation }) {
  return (
    <View style={[globalStyles.containerCentered, { position: 'relative' }]}>
      {/* Profil ikon i hjørnet */}
      <Pressable 
        style={{
          position: 'absolute',
          top: 50,
          right: 20,
          padding: 10,
        }}
        onPress={() => navigation.navigate('Login')}
      >
        <Ionicons name="person-circle" size={32} color="#6C63FF" />
      </Pressable>

      <Text style={globalStyles.title}>Know Before You Go</Text>

      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg',
        }}
        style={{
          width: 200,
          height: 200,
          borderRadius: 100,
          marginBottom: 40,
        }}
      />

      <TouchableOpacity
        style={globalStyles.btn}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={globalStyles.btnText}>Go to Continents</Text>
      </TouchableOpacity>
    </View>
  );
}