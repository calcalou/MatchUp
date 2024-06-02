import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';

const App = () => {
  const viewWidth = Dimensions.get('window').width - 40;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollViewContainer}
        showsHorizontalScrollIndicator={false}
        snapToInterval={viewWidth + 20}  // Ajoutez la marge gauche et droite (10 + 10)
        decelerationRate="fast"
      >
        <View style={[styles.viewFille, { width: viewWidth }]}>
          <Text>View Fille 1</Text>
        </View>
        <View style={[styles.viewFille, { width: viewWidth }]}>
          <Text>View Fille 2</Text>
        </View>
        <View style={[styles.viewFille, { width: viewWidth }]}>
          <Text>View Fille 3</Text>
        </View>
        <View style={[styles.viewFille, { width: viewWidth }]}>
          <Text>View Fille 4</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContainer: {
    alignItems: 'center',
  },
  viewFille: {
    backgroundColor: 'lightgray',
    borderRadius: 5,
    height: 250,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
