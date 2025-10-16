//Maliha har kodet 
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import Home from './screens/Home';      
import Country from './screens/Country';  
import Reviews from './screens/Reviews';  
//import StackNavigator from './screens/Stack'; 
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Know before you go' }} />
        <Stack.Screen name="Countries" component={Country} options={{ title: 'Vælg land' }} />
        <Stack.Screen name="Reviews" component={Reviews} options={{ title: 'Reviews' }} />  
      </Stack.Navigator>
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
        <Tab.Screen name="Home" component={Home} /> {/* Home → stack */}
        <Tab.Screen name="Country" component={Country} />
        <Tab.Screen name="Reviews" component={Reviews} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

//Maliha har kodet 


/*export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"  // vigtigt: vi ænder det til forside 
      screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Know before you go' }} />
        <Stack.Screen name="Countries" component={Country} options={{ title: 'Vælg land' }} />
        <Stack.Screen name="Reviews" component={Reviews} options={{ title: 'Reviews' }} />
    </Stack.Navigator>
  );
}
*/