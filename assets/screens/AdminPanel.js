import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import * as Font from "expo-font"; // import Font
import * as SplashScreen from "expo-splash-screen"; // import Font
import { useCallback } from "react"; // import Font

// ================== DEF FONCTION LOCAL ==================

// ================== DEF STYLE CONST ==================


function AdminPanel(props) {

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
  });

  const onLayoutRootView = useCallback(async () => {if (fontsLoaded || fontError) {await SplashScreen.hideAsync();}}, [fontsLoaded, fontError]);
  if (!fontsLoaded && !fontError) {return null;}

  //====================== DEF BUTTON ======================
  const ArrowHandle = () => { // Button retour flèche
    props.navigation.navigate("Login");
  };

  const EquipeHandle = () => { // Button Equipe
    props.navigation.navigate("AdminEquipe");
  };

  const MatchHandle = () => { // Button Match
    props.navigation.navigate("AdminMatch");
  };

  

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={ArrowHandle} style={styles.ContainerArrowButton}>
            <Image 
              source={require("../images/FlecheRMVBG.png")}
              resizeMode="cover"
              style={styles.ReturnArrow}></Image>
        </TouchableOpacity>

        <Image             
          source={require("../images/LOGORMVBG.png")}
          resizeMode="cover"
          style={styles.LogoMiddle}></Image>

        <Text style={styles.Title}>Panneau Admin</Text>
        
        <TouchableOpacity onPress={EquipeHandle}>
            <View style={styles.Button}>
                <Text style={styles.TextButton}>Equipe</Text>
            </View>   
        </TouchableOpacity>
        
        <TouchableOpacity>
            <View style={styles.Button}>
                <Text style={styles.TextButton}>Joueur</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={MatchHandle}>
            <View style={styles.Button}>
                <Text style={styles.TextButton}>Match</Text>
            </View>
        </TouchableOpacity>


        <TouchableOpacity>
            <View style={styles.Button}>
                <Text style={styles.TextButton}>Tournois</Text>
            </View>
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {// modif container ALL
    height: hp("100%"),
    width: wp("100%"),
    alignItems: "center"
  },

  ContainerArrowButton:{
    position: "absolute",
    left : wp("5%"),
    top: hp("8%"),

  },

  ReturnArrow: {
    height: hp("6%"),
    width: hp("6%")
  },

  LogoMiddle: {
    height: hp("11%"),
    width: hp("11%"),
    top : hp("6%")
  },

  Title: {
    paddingTop: hp("15%"),
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    paddingBottom: hp("8%"),
  },


  Button: {
    height: hp("8%"),
    width: wp("75%"),
    backgroundColor: "rgba(253, 196, 51, 1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    marginBottom: hp("3%"),
  },

  TextButton: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,  
  },
});

export default AdminPanel;