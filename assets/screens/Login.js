import React from 'react';
import { 
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  Alert,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
 } from 'react-native';

const Login = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.title} >Login</Text>
      <Button
        title="Retour à Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  title:{
    marginTop: 100,
  },  
});

export default Login;