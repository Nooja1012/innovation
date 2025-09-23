import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Country from './screens/Country';
import Reviews from './screens/Reviews';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Know before you go' }} />
        <Stack.Screen name="Countries" component={Country} options={{ title: 'Vælg land' }} />
        <Stack.Screen name="Reviews" component={Reviews} options={{ title: 'Reviews' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
