// App.js final 
// Hovedindgangspunkt for Know Before You Go applikationen
// Kombinerer bottom tab navigation med stack navigation for komplekse flows
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Skærme
import Forside from './screens/Forside';
import Home from './screens/Home';
import Country from './screens/Country';
import Reviews from './screens/Reviews';
import CountryAdvisories from './screens/CountryAdvisories';

//Maliha har programmeret disse skærme til profil og login
import Login from './screens/Login';
import Profil from './screens/Profil'; 
import MyReviews from './screens/myreviews';
import Favorites from './screens/favorites';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/** --- Stack 1: Udforsk (Forside → Kontinenter → Lande → Reviews + Profil) --- */

function ExploreStack() {
  return (
    <Stack.Navigator initialRouteName="Forside">
       {/* Forside skærm - appens startpunkt */}
      <Stack.Screen
        name="Forside"
        component={Forside}
        options={{ headerShown: false }} //skjul header pga. custom design
      />
       {/* Kontinent valg skærm */}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Vælg kontinent' }}
      />
      {/* Lande oversigt baseret på valgt kontinent */}
      <Stack.Screen
        name="Country"
        component={Country}
        options={({ route }) => ({
          title: route?.params?.continentLabel || 'Lande',
        })}
      />
       {/* Reviews for specifikt land */}
      <Stack.Screen
        name="Reviews"
        component={Reviews}
        options={({ route }) => ({
          title: route?.params?.countryName || 'Reviews',
        })}
      />
       {/* Rejsevejledninger for land */}
      <Stack.Screen
        name="CountryAdvisories"
        component={CountryAdvisories}
        options={{ title: 'Rejsevejledninger' }}
      />
       {/* PROFIL-RELATEREDE SKÆRME - Udviklet af Maliha */}
      
      {/* Login skærm, Review, Profil, Favorites- ingen header for ren login oplevelse */}
      <Stack.Screen 
        name="Login" 
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Profil" 
        component={Profil}
        options={{ title: 'Min Profil' }}
      />
      <Stack.Screen 
        name="MyReviews" 
        component={MyReviews}
        options={{ title: 'Mine Reviews' }}
      />
      <Stack.Screen 
        name="Favorites" 
        component={Favorites}
        options={{ title: 'Favoritter' }}
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
         {/* Hovedtabs for appens kernefunktioner */}
        <Tab.Screen name="Udforsk" component={ExploreStack} />
        <Tab.Screen name="Vejledninger" component={AdvisoriesStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}