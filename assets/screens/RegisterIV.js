import React from 'react';
import { 
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import * as Font from "expo-font"; // import Font
import * as SplashScreen from "expo-splash-screen"; // import Font
import { useCallback } from "react"; // import Font

const RegisterIV = (props) => {

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

  //====================== SUMBIT BUTTON NEXT ======================
  const nextHandle = () => {
    props.navigation.navigate("Home")
  };

  return (
    <View style={styles.container}>
      <ImageBackground //Fond d'écran
        source={require("../images/InscriptionChek.png")}
        resizeMode="cover"
        style={styles.backGroud}
        imageStyle={styles.backGroud_imageStyle}>
        
        <View style={styles.TextContainer}>
          <Text style={styles.LigneI}>Bienvenue,</Text>
          <Text style={styles.LigneII}>ton compte a bien</Text>
          <Text style={styles.LigneIII}>été créé !</Text>
        </View>

      <View style={styles.IMGContainer}>
        <TouchableOpacity onPress={nextHandle}>
          <Image
            source={require("../images/FlecheRegisterIV.png")}
            style={styles.FlecheNext}
          ></Image>
        </TouchableOpacity>
      </View>



      </ImageBackground> 
    </View>
  );
};

const styles = StyleSheet.create({

  container: {// modif container ALL
    width : '100%',
    height : '100%',
  },

  backGroud: {// propriété image
    width: '100%',
    height: '100%',
    backgroundColor: "rgba(112,98,98,0.16)",
    top: 0,
    alignItems : 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },

  backGroud_imageStyle: { // propriété style image
    //opacity: 0.06
  },  

  TextContainer:{
    marginBottom: hp('21%'),
    marginLeft: wp('6%'),
    width: wp("94%"),
  },

  LigneI: {
    fontSize: 34,
    fontFamily: "Poppins-Light",
  },

  LigneII: {
    fontSize: 34,
    fontFamily: "Poppins-Light",
  },

  LigneIII: {
    fontSize: 34,
    fontFamily: "Poppins-Light",
  },

  IMGContainer: {
    width: wp('100%'),
  },

  FlecheNext: { // 416 X 413
    alignSelf: 'flex-end', 
    width: 76.5,
    height: 74.25,
    marginRight: 25,
    marginBottom: 25,
  },

});

export default RegisterIV;