import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Home from './screens/Home';
import Country from './screens/Country';
import Reviews from './screens/Reviews';

import Stack from './Components/Stack';

const Stack = createNativeStackNavigator();

/*export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Know before you go' }} />
        <Stack.Screen name="Countries" component={Country} options={{ title: 'Vælg land' }} />
        <Stack.Screen name="Reviews" component={Reviews} options={{ title: 'Reviews' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}*/

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
            const iconMap = { Forside: 'home', Oversigt: 'list', Review: 'settings' };
            return <Ionicons name={iconMap[route.name] ?? 'ellipse'} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="Countries" component={Country} />
        <Tab.Screen name="Review" component={Review} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
