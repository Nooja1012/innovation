import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import Country from './screens/Country';
import Reviews from './screens/Reviews';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"   // vigtigt: vi er i home-tabben
      screenOptions={{ headerTitleAlign: 'center' }}
    >
        <Stack.Screen name="Home" component={Home} options={{ title: 'Know before you go' }} />
        <Stack.Screen name="Countries" component={Country} options={{ title: 'Vælg land' }} />
        <Stack.Screen name="Reviews" component={Reviews} options={{ title: 'Reviews' }} />
    </Stack.Navigator>
  );
}
