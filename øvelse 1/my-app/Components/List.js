import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

//jeg laver en list button, som skal bruges til at lave knapper, for et array af lande, man kan så trykke på knappen og blive videre ført til et review om landet 
export default function ListButton({ title, onPress }) {
  return (
    <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

// Jeg prøvede at lave et separate stylesheet, men det virkede ikke, så jeg har lavet det her i samme fil
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  pressed: {
    backgroundColor: '#ddd',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});