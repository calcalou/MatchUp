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

import * as Font from "expo-font"; // import Font
import * as SplashScreen from "expo-splash-screen"; // import Font
import { useCallback } from "react"; // import Font

function Home(props) { 

  //====================== DEF FONTS ======================
  const [fontsLoaded, fontError] = Font.useFonts({

    //====================== DEF ROBOTO ======================
    "Roboto-Thin": require("../fonts/Roboto/Roboto-Thin.ttf"),
    "Roboto-ThinItalic": require("../fonts/Roboto/Roboto-ThinItalic.ttf"),

    "Roboto-Light": require("../fonts/Roboto/Roboto-Light.ttf"),
    "Roboto-LightItalic": require("../fonts/Roboto/Roboto-LightItalic.ttf"),

    "Roboto-Regular": require("../fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-RegularItalic": require("../fonts/Roboto/Roboto-Italic.ttf"),

    "Roboto-Medium": require("../fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-MediumItalic": require("../fonts/Roboto/Roboto-MediumItalic.ttf"),

    "Roboto-Bold": require("../fonts/Roboto/Roboto-Bold.ttf"),
    "Roboto-BoldItalic": require("../fonts/Roboto/Roboto-BoldItalic.ttf"),

    "Roboto-Black": require("../fonts/Roboto/Roboto-Black.ttf"),
    "Roboto-BlackItalic": require("../fonts/Roboto/Roboto-BlackItalic.ttf"),

    //====================== DEF POPPINS ======================
    "Poppins-Thin": require("../fonts/Poppins/Poppins-Thin.ttf"),
    "Poppins-ThinItalic": require("../fonts/Poppins/Poppins-ThinItalic.ttf"),

    "Poppins-ExtraLight": require("../fonts/Poppins/Poppins-ExtraLight.ttf"),
    "Poppins-ExtraLightItalic": require("../fonts/Poppins/Poppins-ExtraLightItalic.ttf"),

    "Poppins-Light": require("../fonts/Poppins/Poppins-Light.ttf"),
    "Poppins-LightItalic": require("../fonts/Poppins/Poppins-LightItalic.ttf"),

    "Poppins-Regular": require("../fonts/Poppins/Poppins-Regular.ttf"),
    "Poppins-RegularItalic": require("../fonts/Poppins/Poppins-Italic.ttf"),

    "Poppins-Medium": require("../fonts/Poppins/Poppins-Medium.ttf"),
    "Poppins-MediumItalic": require("../fonts/Poppins/Poppins-MediumItalic.ttf"),

    "Poppins-SemiBold": require("../fonts/Poppins/Poppins-SemiBold.ttf"),
    "Poppins-SemiBoldItalic": require("../fonts/Poppins/Poppins-SemiBoldItalic.ttf"),

    "Poppins-Bold": require("../fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-BoldItalic": require("../fonts/Poppins/Poppins-BoldItalic.ttf"),

    "Poppins-ExtraBold": require("../fonts/Poppins/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraBoldItalic": require("../fonts/Poppins/Poppins-ExtraBoldItalic.ttf"),

    "Poppins-Black": require("../fonts/Poppins/Poppins-Black.ttf"),
    "Poppins-BlackItalic": require("../fonts/Poppins/Poppins-BlackItalic.ttf"),

    //====================== DEF INTER ======================

    "Inter-SemiBold": require("../fonts/Inter/Inter_24pt-SemiBold.ttf"),

  });

  const onLayoutRootView = useCallback(async () => {if (fontsLoaded || fontError) {await SplashScreen.hideAsync();}}, [fontsLoaded, fontError]);
  if (!fontsLoaded && !fontError) {return null;}
    
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
          <Text style={styles.startTxt}>Démarrer l'aventure</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.LoginButton} onPress={() => props.navigation.navigate("Login")} /* Button vers login */ >
          <Text style={styles.LoginText} >Tu as déja un compte ?</Text>
          <Text style={styles.LoginText} >Connectes-toi</Text>
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
    marginTop: hp("9%"),
    width: 200,
    height: 200,
  },

  startFrame: {
    marginTop: hp("46%"),
    width: wp("65%"),
    height: 44,
    borderWidth: 2,
    borderColor: "rgba(234,234,234,1)",
    borderRadius: 16,
    alignItems : 'center',
    justifyContent: 'center',
  },

  startTxt: {
    color: "rgba(239,235,235,1)",
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
  },

  LoginButton: { // button vers login 
    marginTop: hp("3%"),
  },

  LoginText: { // text de button vers login
    color: "rgba(234,234,234,1)",
    fontSize: 15,
    textDecorationLine: 'underline',
    fontFamily: "Inter-SemiBold",
    textAlign: "center"
  },

});

export default Home;