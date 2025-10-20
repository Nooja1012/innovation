/**
 * Forside.js
 * Startskærmen for Know Before You Go applikationen
 * Viser velkomstbillede og navigation til appens hovedfunktioner
 */

import React from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../globalstyle'; 

export default function Forside({ navigation }) {
  return (
    <View style={[globalStyles.containerCentered, { position: 'relative' }]}>
       {/* Profil ikon i øverste højre hjørne - Position absolute placerer det uafhængigt af resten af layoutet*/}
      <Pressable 
        style={{
          position: 'absolute',
          top: 50,
          right: 20,
          padding: 10,
        }}
        onPress={() => navigation.navigate('Login')}
      >
        <Ionicons name="person-circle" size={32} color="#6C63FF" /> {/*Profil ikon på forsiden*/}
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

       {/*Hovedknap til at starte udforskning af kontinenter 
        TouchableOpacity giver visuel feedback ved tryk*/}
      <TouchableOpacity
        style={globalStyles.btn}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={globalStyles.btnText}>Go to Continents</Text>
      </TouchableOpacity>
    </View>
  );
}