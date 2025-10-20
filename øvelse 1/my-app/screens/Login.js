import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { globalStyles } from '../globalstyles';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const handleLogin = async () => {
    if (!email || !pwd) {
      return Alert.alert('Manglende info', 'Skriv email og kodeord.');
    }
    navigation.navigate('Profil');
  };

  const handleGuest = async () => {
    navigation.navigate('Profil');
  };

  return (
    <View style={globalStyles.containerCentered}>
      <Text style={globalStyles.title}>Log ind</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Kodeord"
        placeholderTextColor="#999"
        secureTextEntry
        value={pwd}
        onChangeText={setPwd}
      />

      <Pressable style={globalStyles.btn} onPress={handleLogin}>
        <Text style={globalStyles.btnText}>Log ind</Text>
      </Pressable>

      <Pressable 
        style={[globalStyles.btn, globalStyles.btnSecondary]} 
        onPress={handleGuest}
      >
        <Text style={[globalStyles.btnText, globalStyles.btnTextSecondary]}>
          Fortsæt som gæst
        </Text>
      </Pressable>
    </View>
  );
}