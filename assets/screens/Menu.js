import React from 'react';
import { View, Text, Button } from 'react-native';

const Login = ({ navigation }) => {
  return (
    <View>
      <Text>Menu</Text>
      <Button
        title="Retour à Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default Login;