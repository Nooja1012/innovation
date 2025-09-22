import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CountryScreen from './screens/CountryScreen';
import ReviewsScreen from './screens/ReviewsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Know before you go' }} />
        <Stack.Screen name="Countries" component={CountryScreen} options={{ title: 'Vælg land' }} />
        <Stack.Screen name="Reviews" component={ReviewsScreen} options={{ title: 'Reviews' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
