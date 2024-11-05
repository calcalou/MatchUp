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
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import * as Font from "expo-font"; // import Font
import * as SplashScreen from "expo-splash-screen"; // import Font
import { useCallback } from "react"; // import Font

// ================== DEF FONCTION LOCAL ==================

// ================== DEF STYLE CONST ==================



function SearchTeam(props) {

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

  //====================== DEF Input Search ======================

  const [searchText, setSearchText] = useState("");
  //Zconsole.log(searchText);
  //Keyboard.dismiss()
  //**************************** DEF Balise Corp ****************************

  return (
    
      <View style={styles.container}>
        <View style={styles.TopScreenContainer}>
          <Image // Logo MatchUp
            source={require("../images/LOGORMVBG.png")}
            resizeMode="contain"
            style={styles.LogoTopScreen}></Image>
          <Text style={styles.TitleSearch}>Rejoins une équipe !</Text>
        </View>

        {/*================= Body Container ================= */}
        <View style={styles.BodyContainer}>
        
        <View style={styles.ScrollViewContainer}>
            <ScrollView style={styles.ScrollViewTeam}>
              <View style={[styles.box, styles.box1]} />
              <View style={[styles.box, styles.box2]} />
              <View style={[styles.box, styles.box3]} />
              <View style={[styles.box, styles.box4]} />
            </ScrollView> 
          </View>
          
          {/* Scroll bar moitié mis -> mettre en place les liste d'équipe en fonction de searchText
            et mettre en place Keyboard.dismiss() avec button loupe sur InputSearch "LoupesSearch.png"   */}
          
          <View style={styles.InputSearchContainer}>
            <TextInput
              style={styles.SearchInput}
              placeholder="Rechercher..."
              value={searchText}
              onChangeText={setSearchText}
            />
            <Text style={styles.textInputSearch}>Recherche une équipe</Text>
          </View>
        </View>

        <TouchableOpacity    // == Button Fleche Retour ==     
          onPress={() => props.navigation.navigate("Menu")}
          style={styles.FlecheReturnButton}>
            <Image // Fleche retour
              source={require("../images/FlecheRMVBG.png")}
              resizeMode="contain"
              style={styles.FlecheReturnImage}></Image>  
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {// modif container ALL
    // flex: 1,
    alignItems: "center",
    width: wp("100%"),
    height: hp("100%"),
    backgroundColor: "white",
  },

  TopScreenContainer:{
    // backgroundColor: "red",
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },

  FlecheReturnButton :  {
    position: "absolute",
    left : wp("5%"),
    top : hp("13%"),
  },

  FlecheReturnImage: {
    width : wp("11%"),
    height: wp("11%"),
  },

  LogoTopScreen: {
    width : "19%",
    height: "19%",
  },

  TitleSearch : {
    width : "80%",
    position : "absolute",
    bottom : 0,
    fontSize: 20,
    fontFamily : "Poppins-SemiBold",
  },

  //============= Body CSS =============

  BodyContainer : {
    width: wp("100%"),
    justifyContent : "center",
    alignItems : "center",
    // backgroundColor: "red"
  },

  InputSearchContainer: {
    position : "absolute",
    top : 0,
  },

  SearchInput: {
    height: 45,
    width: wp("70%"),
    textAlign : "center",
    borderColor: "rgba(51, 51, 51, 1)",
    borderWidth: 1,
    borderRadius: 15,
    top : hp("4%"),
    fontFamily : "Roboto-Regular",

  },
 
  textInputSearch: {
    position : "absolute",
    top : hp("3%"),
    left : wp("5%"),
    backgroundColor: "white",
    color: "rgba(119, 126, 144, 1)",
    width : wp("33%"),
    textAlign : "center",
    fontFamily: "Roboto-Regular",
    fontSize : 12,
  },

  ScrollViewContainer: {
    height : 200,
    width : 200,

  },
  
  ScrollViewTeam: {
    flex: 1,
    backgroundColor: '#fff',

  },
  box: {
    height: 200, // taille de chaque vue
    marginVertical: 10,


  },
  box1: {
    backgroundColor: 'red',
  },
  box2: {
    backgroundColor: 'blue',
  },
  box3: {
    backgroundColor: 'green',
  },
  box4: {
    backgroundColor: 'purple',
  },

});

export default SearchTeam;