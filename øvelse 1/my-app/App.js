import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Forside from './screens/Forside';
import Home from './screens/Home';
import Country from './screens/Country';
import Reviews from './screens/Reviews';
import CountryAdvisories from './screens/CountryAdvisories';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/** --- Stack 1: Udforsk (Forside → Kontinenter → Lande → Reviews) --- */
function ExploreStack() {
  return (
    <Stack.Navigator initialRouteName="Forside">
      <Stack.Screen
        name="Forside"
        component={Forside}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Vælg kontinent' }}
      />
      <Stack.Screen
        name="Country"
        component={Country}
        options={({ route }) => ({
          title: route?.params?.continentLabel || 'Lande',
        })}
      />
      <Stack.Screen
        name="Reviews"
        component={Reviews}
        options={({ route }) => ({
          title: route?.params?.countryName || 'Reviews',
        })}
      />
      <Stack.Screen
        name="CountryAdvisories"
        component={CountryAdvisories}
        options={{ title: 'Rejsevejledninger' }}
      />

    </Stack.Navigator>
  );
}

/** --- Stack 2: Rejsevejledninger (egen fane) --- */
function AdvisoriesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CountryAdvisories"
        component={CountryAdvisories}
        options={{ title: 'Rejsevejledninger' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,                 // vi viser headers inde i de to stacks
          tabBarActiveTintColor: '#6C63FF',   // matcher din primary
          tabBarInactiveTintColor: '#777777',
          tabBarIcon: ({ color, size, focused }) => {
            let icon = 'ellipse';
            if (route.name === 'Udforsk') icon = focused ? 'earth' : 'earth-outline';
            if (route.name === 'Vejledninger') icon = focused ? 'book' : 'book-outline';
            return <Ionicons name={icon} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Udforsk" component={ExploreStack} />
        <Tab.Screen name="Vejledninger" component={AdvisoriesStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
