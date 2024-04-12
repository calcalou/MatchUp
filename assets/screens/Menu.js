import React, { useRef, useState, useEffect } from "react";
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
  ActivityIndicator,
  Animated,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';

import * as Font from "expo-font"; // import Font
import * as SplashScreen from "expo-splash-screen"; // import Font
import { useCallback } from "react"; // import Font

import Swiper from 'react-native-swiper';

// ================== DEF FONCTION LOCAL ==================

// ================== DEF CONST ==================
const IndexMenu = 1; // def n° de page affiché après chargement

function Menu(props) {

  //====================== DEF FADE ANIM ======================
  
  
  //====================== DEF SWIPER ======================
  const swiperRef = useRef(null);
  const goToPage = (index) => {
    if (swiperRef.current && swiperRef.current.state.index !== index) {
      swiperRef.current.scrollBy(index - swiperRef.current.state.index);
    }
  };

  const [activePage, setActivePage] = useState(IndexMenu);
  const [GraphicactivePage, setGraphicactivePage] = useState(IndexMenu);

  const handleIndexChanged = (index) => {
    setActivePage(index);
    setGraphicactivePage(index);// a la fin du scroll, affiche le marqueur de page 
    console.log(index);

  };

  const onScrollBeginDrag = () => {
    setGraphicactivePage(5); // au début du scroll, enlève le marqueur de page

  }

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

  //====================== HANDLE BUTTON G1 ======================
  const ProfileHandle = () => {
    if (GraphicactivePage == 0 ) {
      
    }else{
      setGraphicactivePage(5); // au début du clic button, enlève le marqueur de page 
      goToPage(0);
    }
  }
  //====================== HANDLE BUTTON G2 ======================
  const TournoisHandle = () => {
    if (GraphicactivePage == 1) {
      
    }else{
      setGraphicactivePage(5); // au début du clic button, enlève le marqueur de page 
      goToPage(1);
    }
  }
  //====================== HANDLE BUTTON CENTRE ======================
  const EquipeHandle = () => {
    if (GraphicactivePage == 2) {
      
    }else{
      setGraphicactivePage(5); // au début du clic button, enlève le marqueur de page 
      goToPage(2);
    } 
  }

// Profile joueur / tournois / équipe
  return (
    <View style={styles.container}>

      {/* //====================== SWIPER DEF INIT ====================== */}
      <Swiper
        ref={swiperRef}
        showsButtons={false}
        showsPagination={false}
        loop={false}
        index={activePage}
        onIndexChanged={handleIndexChanged}
        onScrollBeginDrag={onScrollBeginDrag}
        bounces={true}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'skyblue' }}>
          <Text>Page Profile</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgreen' }}>
          <Text>Page Tournois</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'salmon' }}>
          <Text>Page Equipe</Text>
        </View>
      </Swiper>
      {/* //====================== SWIPER DEF END ====================== */}
      {/* //====================== BOTTOM BAR ====================== */}

      <View style={styles.menuBar}>

        <View style={styles.ProfileContainer}>
          
            <LinearGradient  
            colors={GraphicactivePage !== 0 ? ['#FFFFFF', '#FFFFFF'] : ['#FFED8C', '#E5A62A']}
            style={styles.ButtonCircle}>
              <TouchableOpacity onPress={ProfileHandle} style={styles.ButtonZone}>
                <Image source={require("../images/acceuilLOGO.png")} style={styles.ButtonIMG}></Image>
              </TouchableOpacity>
            </LinearGradient>
          
        </View>

        <View style={styles.TournoisContainer}>

          <LinearGradient  
            colors={GraphicactivePage !== 1 ? ['#FFFFFF', '#FFFFFF'] : ['#FFED8C', '#E5A62A']}
            style={styles.ButtonCircle}>
            <TouchableOpacity onPress={TournoisHandle} style={styles.ButtonZone}>
                <Image source={require("../images/rencontreLOGO.png")} style={styles.ButtonIMG}></Image>
            </TouchableOpacity>
          </LinearGradient>   

        </View>

        <View style={styles.EquipeContainer}>

          <LinearGradient  
            colors={GraphicactivePage !== 2 ? ['#FFFFFF', '#FFFFFF'] : ['#FFED8C', '#E5A62A']}
            style={styles.ButtonCircle}>
            <TouchableOpacity onPress={EquipeHandle} style={styles.ButtonZone}>
                <Image source={require("../images/equipeLOGO.png")} style={styles.ButtonIMG}></Image>
            </TouchableOpacity>
          </LinearGradient>

        </View>

      </View>
      
    </View>//Fin container
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },

  menuBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: hp("7%"),
    backgroundColor: "rgba(65,65,89,1)",
    flexDirection: 'row',
    alignItems: 'center',
  },

  ProfileContainer:  {
    backgroundColor: 'white',
    height: hp("10%"),
    width: ("33.33%"),
    justifyContent: "center",
    alignItems: "center",
  },

  TournoisContainer: {
    backgroundColor: 'white',
    height: hp("10%"),
    width: ("33.33%"),
    justifyContent: "center",
    alignItems: "center",
  },

  EquipeContainer: {
    backgroundColor: 'white',
    height: hp("10%"),
    width: ("33.33%"),
    justifyContent: "center",
    alignItems: "center",
  },

  ButtonCircle : {
    backgroundColor: "white",
    height: wp("17%"),
    width: wp("17%"),
    borderRadius: wp("8.5%"),
    bottom: hp("3.5%"),
    justifyContent: "center",
    alignItems: "center",
  },

  ButtonIMG: {
    width : wp("10%"),
    height : wp("10%"),
  },

  ButtonZone: {
    width : wp("14%"),
    height: wp("14%"),
    borderRadius: wp("7%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

});

export default Menu;