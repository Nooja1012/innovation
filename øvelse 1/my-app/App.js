//Maliha har kodet 
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import Home from '../screens/Home';
import Country from '../screens/Country';
import Reviews from '../screens/Reviews';
import StackNavigator from '../Components/Stack';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ color, size }) => {
            const iconMap = {
              Home: 'home',
              Country: 'list',
              Reviews: 'chatbubbles',};
            return (
              <Ionicons
                name={iconMap[route.name] ?? 'ellipse'}
                size={size}
                color={color}/>);
              },
               })}>
        <Tab.Screen name="Home" component={StackNavigator} /> {/* Home → stack */}
        <Tab.Screen name="Country" component={Country} />
        <Tab.Screen name="Reviews" component={Reviews} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
