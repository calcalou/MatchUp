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
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import * as Font from "expo-font"; // import Font
import * as SplashScreen from "expo-splash-screen"; // import Font
import { useCallback } from "react"; // import Font

import Swiper from 'react-native-swiper';

// ================== DEF FONCTION LOCAL ==================

// ================== DEF CONST ==================
const IndexMenu = 2; // def n° de page affiché après chargement

function Menu(props) {

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
  const G1 = () => {
    setGraphicactivePage(5); // au début du clic button, enlève le marqueur de page 
    goToPage(0);
  }
  //====================== HANDLE BUTTON G2 ======================
  const G2 = () => {
    setGraphicactivePage(5); // au début du clic button, enlève le marqueur de page 
    goToPage(1);
  }
  //====================== HANDLE BUTTON CENTRE ======================
  const BTNcentre = () => {
    setGraphicactivePage(5); // au début du clic button, enlève le marqueur de page 
    goToPage(2);
  }
  //====================== HANDLE BUTTON R1 ======================
  const R1 = () => {
    setGraphicactivePage(5); // au début du clic button, enlève le marqueur de page 
    goToPage(3);
  }
  //====================== HANDLE BUTTON R2 ======================
  const R2 = () => {
    setGraphicactivePage(5); // au début du clic button, enlève le marqueur de page 
    goToPage(4);
  }

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
          <Text>Page ACCEUIL</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgreen' }}>
          <Text>Page EQUIPE</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'salmon' }}>
          <Text>Page MATCHS</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightyellow' }}>
          <Text>Page CALENDAR</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightcoral' }}>
          <Text>Page CLASSEMENT</Text>
        </View>
      </Swiper>
      {/* //====================== SWIPER DEF END ====================== */}
      {/* //====================== BOTTOM BAR ====================== */}

      <View style={[styles.BBarCircle , GraphicactivePage === 2 && styles.centerement]}></View>
      <View style={styles.menuBar}>
          <TouchableOpacity style={[styles.element, GraphicactivePage === 0 && styles.left1element]} onPress={G1}>
            <Image source={require("../images/AcceuilIMG.png")} style={styles.IMGbutton} ></Image>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.element, GraphicactivePage === 1 && styles.left2ement]} onPress={G2}>
            <Image source={require("../images/EquipeIMG.png")} style={styles.IMGbutton} ></Image>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.element]} onPress={BTNcentre}>
            <Image source={require("../images/BasketIMG.png")} style={styles.IMGcenter} ></Image>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.element, GraphicactivePage === 3 && styles.right1ement]} onPress={R1}>
          < Image source={require("../images/CalendarIMG.png")} style={styles.IMGbutton} ></Image>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.element, GraphicactivePage === 4 && styles.right2ement]} onPress={R2}>
            < Image source={require("../images/ClassementIMG.png")} style={styles.IMGbutton} ></Image>
          </TouchableOpacity>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },

  content: {
    flex: 1,
  },

  menuBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: hp("10%"),
    backgroundColor: "rgba(65,65,89,1)",
    flexDirection: 'row',
    alignItems: 'center',
  },

  BBarCircle: {
    position: "absolute",
    bottom: hp("2.7%"),
    width: hp("10%"),
    height: hp("10%"),
    borderRadius: hp("5%"),
    backgroundColor: "rgba(65,65,89,1)",
    left: "50%", // Centrer horizontalement
    marginLeft: -hp("5%"), // Déplacer de moitié de la largeur pour centrer correctement
  },

  element: {
    fontSize: 20,
    fontWeight: 'bold',
    height: hp("10%"),
    width: wp("20%"),
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 5,
    borderTopColor: "rgba(65,65,89,1)",
  },

  IMGbutton: {
    width: "58%",
    height: "65%",
    bottom: "8%",
  },

  IMGcenter: {
    width: "62%",
    height: "100%",
    bottom: "26%",
  },

  left1element: {
    borderTopWidth: 5, // Modifie la largeur de la bordure supérieure
    borderTopColor: "rgba(253,196,51,1)", // Couleur de la bordure supérieure
    height: "100%",
  },

  left2ement: {
    borderTopWidth: 5, // Modifie la largeur de la bordure supérieure
    borderTopColor: "rgba(253,196,51,1)", // Couleur de la bordure supérieure
    height: "100%",
  },
  centerement: {
    borderColor: "orange", // Couleur de la partie supérieure de la bordure
    borderWidth: hp("0.7%"), // Épaisseur de la bordure
  },

  right1ement: {
    borderTopWidth: 5, // Modifie la largeur de la bordure supérieure
    borderTopColor: "rgba(253,196,51,1)", // Couleur de la bordure supérieure
    height: "100%",
  },

  right2ement: {
    borderTopWidth: 5, // Modifie la largeur de la bordure supérieure
    borderTopColor: "rgba(253,196,51,1)", // Couleur de la bordure supérieure
    height: "100%",
  },

});

export default Menu;