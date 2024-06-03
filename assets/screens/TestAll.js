import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const App = () => {
  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}>
      <View style={styles.item}>
        <Text style={styles.text}>Item 1</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>Item 2</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>Item 3</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>Item 4</Text>
      </View>
      <Text>OUI</Text>
      <View style={styles.item}>
        <Text style={styles.text}>Item 5</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>Item 6</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>Item 7</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>Item 8</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>Item 9</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>Item 10</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingTop: 50,
  },
  item: {
    height: 100,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
  },
});

export default App;
