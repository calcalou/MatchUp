import React, { useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [showButtons, setShowButtons] = useState(false);
  const opacity = new Animated.Value(0);

  const fadeIn = () => {
    setShowButtons(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => setShowButtons(false));
  };

  const toggleButtons = () => {
    if (!showButtons) {
      fadeIn();
    } else {
      fadeOut();
    }
  };

  return (
    <View style={styles.container}>
      {showButtons && (
        <Animated.View style={[styles.buttonContainer, { opacity }]}>
          <TouchableOpacity style={styles.smallButton}>
            <Text style={styles.buttonText}>Button 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButton}>
            <Text style={styles.buttonText}>Button 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButton}>
            <Text style={styles.buttonText}>Button 3</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      <TouchableOpacity style={styles.mainButton} onPress={toggleButtons}>
        <Text style={styles.buttonText}>Main Button</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    top: 100,
    width: '100%',
  },
  mainButton: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 10,
  },
  smallButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
  