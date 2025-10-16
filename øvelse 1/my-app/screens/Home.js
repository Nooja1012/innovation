import { View, Text, Pressable, FlatList } from 'react-native';
import styles from '../styles';
import { continents } from '../Components/data';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vælg kontinent</Text>
      <FlatList
        data={continents}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => (
          <Pressable style={styles.btn}
            onPress={() => navigation.navigate('Countries', { continent: item })}>
            <Text style={styles.btnText}>{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
