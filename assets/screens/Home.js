import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

function Home(props) {
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../images/HomePage.png")} resizeMode="cover" style={styles.image} imageStyle={styles.image_imageStyle} /* Image de Fond */ >
        <Image // Logo MatchUp
          source={require("../images/LOGOscriptRMVBG.png")}
          resizeMode="contain"
          style={styles.image2}
        ></Image>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("Register")}
          style={styles.startFrame}>
          <Text style={styles.startTxt}>Commencer !</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.LoginButton} onPress={() => props.navigation.navigate("Login")} /* Button vers login */ >
          <Text style={styles.LoginText} >Se connecter</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
  },

  image: {
    flex:1,
    width: null,
    height: null,
    width: '100%',
    alignItems: 'center',
  },
  
  image2: {
    width: 200,
    height: 200,
  },

  startFrame: {
    marginTop: hp("57%"),
    width: 238,
    height: 44,
    borderWidth: 3,
    borderColor: "rgba(234,234,234,1)",
    borderRadius: 15,
    alignItems : 'center',
    justifyContent: 'center',
  },

  startTxt: {
    color: "rgba(239,235,235,1)",
    fontSize: 21,
  },

  LoginButton: { // button vers login 
    marginTop: hp("5%"),
  },

  LoginText: { // text de button vers login
    fontStyle: 'italic',
    color: "rgba(234,234,234,1)",
    fontSize: 15,
    textDecorationLine: 'underline',
  },

});

export default Home;