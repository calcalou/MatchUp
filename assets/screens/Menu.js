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
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';

import * as Font from "expo-font"; // import Font
import * as SplashScreen from "expo-splash-screen"; // import Font
import { useCallback } from "react"; // import Font

import Swiper from 'react-native-swiper';
import { InterfaceOrientation } from "react-native-reanimated";

import { BarChart } from 'react-native-chart-kit'; //Import Tableau Stats


// ================== DEF FONCTION LOCAL ==================

// ================== DEF CONST ==================
const IndexMenu = 1; // def n° de page affiché après chargement

function Menu(props) {

  //====================== DEF PROFILE ======================

  // === DEF INFO/PROFILE BUTTON ===
  const [infomatchselected, setinfomatchselected] = useState(1);

  const ProfileInfoHandle = (input) => {
    setinfomatchselected(1);
    setViewNumber(1);
  };
  
  const ProfileMatchHandle = (input) => {
    setinfomatchselected(2);
    setViewNumber(2);
  };

  // === set des views du body profile === 

  // Initialisez l'état pour gérer quelle vue fille est affichée (1 ou 2)
  const [viewNumber, setViewNumber] = useState(1);

  // === DEF SCROLL VIEW HORIZONTAL MATCH===
  const viewWidth = Dimensions.get('window').width - wp("15%");
  
  // === DEF TABLE STATS USER ===
  const UserDataElo = {
    // labels: ["", "", "", "", "", ""],
    labels: ["Foot",
             "Basket",
             "Volley",
             "Padel",
             "Badminton",
             "Squash"
            ],
    datasets: [
      {
        data: [1100, 1700, 2000, 1500, 1800, 980],
        colors: [
          () => `#71B77B`,
          () => `#F59172`,
          () => `#FDC433`,
          () => `#4574F4`,
          () => `#1DB6A8`,
          () => `#999896`,
      ]
      }
    ]
  };

  const chartConfigStyle = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.5,

    fillShadowGradient: `rgba(1, 122, 205, 1)`,

    propsForLabels: {
      fontFamily: 'Poppins-SemiBold',
    },

    decimalPlaces: 0,
  };

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
        bounces={false}
      >
        {/* ==== PAGE PROFIL ==== */}
        <View style={styles.PageProfile}>
          {viewNumber === 1 ? (
            // AFFICHAGE TOP VIEW INFO
            <View style={styles.PagePTopContainerInfo}>
              <View style={styles.PagepProfilePictureInfoContainer}>
                <Image source={require("../images/ImageDefaultProfile.png")} resizeMode="cover" style={styles.PagepProfilePictureInfo}></Image>
              </View>
              <Text style={styles.PagepNameUserInfo}>#NOM USER</Text>
              <View style={styles.StatsProfileInfoContainer}>
                <Text style={styles.TextSatsInfoProfile}>
                  <Image style={styles.IcoTrophyStatsInfo} source={require("../images/IcoTrophy.png")} resizeMode="contain"></Image> 
                  Points : #X
                 </Text>
                <Text style={styles.TextSatsInfoProfile}>
                  <Image style={styles.IcoTrophyStatsInfo} source={require("../images/IcoClassement.png")} resizeMode="contain"></Image> 
                  Rang : #X
                </Text>
                <Text style={styles.TextSatsInfoProfile}>
                  <Image style={styles.IcoTrophyStatsInfo} source={require("../images/IcoReputation.png")} resizeMode="contain"></Image> 
                  Réputation : #X
                </Text>
              </View>
            </View>
          ) : (
            // AFFICHAGE TOP VIEW MATCH
            <View style={styles.PagePTopContainerMatch}>
              <View style={styles.PagepProfilePictureMatchContainer}>
                <Image source={require("../images/ImageDefaultProfile.png")} resizeMode="cover" style={styles.PagepProfilePictureMatch}></Image>
              </View>
              <Text style={styles.PagepNameUserMatch}>#NOM USER</Text>

            </View>
          )}

          {/* Two button switch : */}
          <View style={styles.PagePButtonInfoMatch}>
            <TouchableOpacity onPress={ProfileInfoHandle} style={[styles.PagePButtonInfos, infomatchselected === 1 && styles.PagePButtonInfoMatchSelected]}>
              <Text style={[styles.textbutton, infomatchselected === 1 && styles.textbuttonSelected]}>Infos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ProfileMatchHandle} style={[styles.PagePButtonMatch, infomatchselected === 2 && styles.PagePButtonInfoMatchSelected]}>
              <Text style={[styles.textbutton, infomatchselected === 2 && styles.textbuttonSelected]}>Match</Text> 
            </TouchableOpacity>              
          </View>

          {/* Body page profile INFO/MATCH :  */}
          <View style={styles.ContainerBodyProfile}>
              {viewNumber === 1 ? ( 
                // affichage view BODY INFO :
                <View style={styles.ContainerBodyProfileInfo}>
                  <ScrollView 
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollViewverticalInfo}>
                    <Text style={styles.TitleProfileInfo}>Statistique joueur</Text>
                    <View style={styles.StatsTableContainer}>
                      <BarChart
                        style={styles.TableStatsProfileInfo}
                        data={UserDataElo}
                        width={wp("85%")}
                        height={hp("40%")}
                        chartConfig={chartConfigStyle}
                        verticalLabelRotation={-90}
                        fromZero
                        showBarTops={false}
                        withInnerLines={false}
                        yAxisSuffix={" 🏆"}
                        withCustomBarColorFromData={true}
                      />
                    </View>
                    <Text style={styles.TitleProfileInfo}>Équipes</Text>
                    <View style={styles.ActualTeamBoxProfileContainer}>
                      <View style={styles.ActualTeamBoxProfile}>

                      </View>
                    </View>
                  </ScrollView>                 
                </View>
                ) : (
                // affichage view BODY MATCH:
                <View style={styles.ViewMatch}>           
                  <Text style={styles.TitleViewMatch}>Match à venir</Text>
                  <View style={styles.MatchOngoingContainer}>
                    {/* scroll view des matchs ongoing  */}
                    <ScrollView
                      horizontal
                      contentContainerStyle={styles.scrollViewHorizontalContainerMatch}
                      showsHorizontalScrollIndicator={false}
                      snapToInterval={viewWidth + 20}  // Ajoutez la marge gauche et droite (10 + 10)
                      decelerationRate="fast"
                      >
                      <View style={[styles.scrollViewHorizontalContainerMatchFille, { width: viewWidth }]}>
                        <Text>View Fille 1</Text>
                      </View>
                      <View style={[styles.scrollViewHorizontalContainerMatchFille, { width: viewWidth }]}>
                        <Text>View Fille 2</Text>
                      </View>
                      <View style={[styles.scrollViewHorizontalContainerMatchFille, { width: viewWidth }]}>
                        <Text>View Fille 3</Text>
                      </View>
                      <View style={[styles.scrollViewHorizontalContainerMatchFille, { width: viewWidth }]}>
                        <Text>View Fille 4</Text>
                      </View>
                    </ScrollView>

                  </View>
                  <Text style={styles.TitleViewMatch}>Match terminés</Text>
                  <View style={styles.MatchDoneContainer}>
                    <ScrollView
                      horizontal
                      contentContainerStyle={styles.scrollViewHorizontalContainerMatch}
                      showsHorizontalScrollIndicator={false}
                      snapToInterval={viewWidth + 20}  // Ajoutez la marge gauche et droite (10 + 10)
                      decelerationRate="fast"
                      >
                      <View style={[styles.scrollViewHorizontalContainerMatchFille, { width: viewWidth }]}>
                        <Text>View Fille 1</Text>
                      </View>
                      <View style={[styles.scrollViewHorizontalContainerMatchFille, { width: viewWidth }]}>
                        <Text>View Fille 2</Text>
                      </View>
                      <View style={[styles.scrollViewHorizontalContainerMatchFille, { width: viewWidth }]}>
                        <Text>View Fille 3</Text>
                      </View>
                      <View style={[styles.scrollViewHorizontalContainerMatchFille, { width: viewWidth }]}>
                        <Text>View Fille 4</Text>
                      </View>
                    </ScrollView>
                  </View>
                </View>  
                )}
          </View>
          

        
       </View> 
        {/* ==== FIN PAGE PROFIL ==== */}
        {/* ==== PAGE TOURNOIS ==== */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgreen' }}>
          
        </View>

        {/* ==== PAGE EQUIPE ==== */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'salmon' }}>
          
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
  
  // === COMMUN ===
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  }, 

  // === PAGE PROFILE ===
  PageProfile: {
    backgroundColor: "white", //rgba(247,247,247,1)
    flex : 1,
    alignItems: "center",
  },

  ContainerBodyProfile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%"
  },

  PagePButtonInfoMatch: {
    backgroundColor: "rgba(235,235,235,1)",
    height: hp("5%"),
    width: wp("80%"),
    marginTop: hp("2%"),
    borderRadius: hp("2%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center",
  },

  PagePButtonInfoMatchSelected: {
    backgroundColor: "rgba(253,196,51,1)",
  },

  textbutton: {
    fontFamily: "Poppins-Medium",
    color: "rgba(119,126,144,1)",
  },

  textbuttonSelected: {
    color: "black",
    fontFamily: "Poppins-SemiBold",
  },

  // ++INFO SECTION++
  // -TOP SECTION-
  PagePTopContainerInfo: {
    width: wp("100%"),
    height:hp("30%"),
    backgroundColor: "rgba(235,235,235,1)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
  },

  PagepProfilePictureInfoContainer: {
    height: hp("15%"),
    width: hp("15%"),
    borderRadius: hp("7.5%"),
    backgroundColor: "white",
    marginTop: hp("5%"),
    justifyContent: "center",
    alignItems: "center",

    borderRightColor: "rgba(253,196,51,1)",
    borderBottomColor: "rgba(253,196,51,1)", 
    borderColor: "rgba(235,235,235,1)",
    borderWidth: 4,
  },

  PagepProfilePictureInfo: {
    height: "90%",
    width: "90%",
    borderRadius: 100,
  },   

  PagepNameUserInfo: {
    marginTop: "3%",
    fontFamily: "Poppins-SemiBold",
    fontSize: wp("5.5%"),
  },

  StatsProfileInfoContainer : {
    width: "80%",
    height:"10%",
    marginTop:"2%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center"
  },

  TextSatsInfoProfile: {
    fontFamily: "Poppins-Medium",
    marginHorizontal: "2.5%",
  },

  IcoTrophyStatsInfo: {
    height:13,
    width:13,
    marginRight: 4,
  },

  // -BODY SECTION INFO-

  PagePButtonInfos: {
    width: "45%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginRight:"1.6%",
    borderRadius: hp("1.3%"),
  },

  ContainerBodyProfileInfo: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    // backgroundColor: "lightgray",
  },

  scrollViewverticalInfo: {
    flex: 1,
    paddingTop: hp("3%"),
    width: "100%",
  },

  StatsTableContainer: {
    // fontFamily:"Poppins-Light",
  },  

  TableStatsProfileInfo: {
    alignItems:"center"
  },

  TitleProfileInfo: {
    fontSize: hp("2.2%"),
    fontFamily: "Poppins-SemiBold",
    marginBottom: hp("2%"),
    marginLeft: wp("4%"),
  },

  ActualTeamBoxProfileContainer: {
    height: hp("40%"),
    width:"100%",
    alignItems: "center",
  },

  ActualTeamBoxProfile: {
    width: "80%",
    height: "55%",
    backgroundColor: "rgba(248, 248, 248, 1)",
    borderRadius: wp("5%"),

    // shadow-box proprieties
    shadowColor: 'black',
    shadowOffset: {width: 5, height: 9},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  // ++MATCH SECTION++
  // -TOP SECTION-
  PagePTopContainerMatch: {
    width: wp("100%"),
    height:hp("20%"),
    backgroundColor: "rgba(235,235,235,1)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
  },

  PagepProfilePictureMatchContainer: {
    height: hp("10%"),
    width: hp("10%"),
    borderRadius: hp("5%"),
    backgroundColor: "white",
    marginTop: hp("5%"),
    justifyContent: "center",
    alignItems: "center",
  
    borderRightColor: "rgba(253,196,51,1)",
    borderBottomColor: "rgba(253,196,51,1)", 
    borderColor: "rgba(235,235,235,1)",
    borderWidth: 4,
  },

  PagepProfilePictureMatch: {
    height: "90%",
    width: "90%",
    borderRadius: 100,
  }, 

  PagepNameUserMatch: {
    marginTop: "3%",
    fontFamily: "Poppins-SemiBold",
    fontSize: wp("4.5%"),
  },

  // -BODY SECTION MATCH-
  PagePButtonMatch:{
    width: "45%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "1.6%",
    borderRadius: hp("1.3%"),
  },

  ViewMatch: {
    width: "100%",
    height: "100%",
    padding: wp("6%"),
  },

  TitleViewMatch: {
    fontFamily: "Poppins-SemiBold",
    fontSize: hp("2.5%"),
  },

  MatchOngoingContainer: {
    width: "100%",
    height : hp("17%"),
    marginTop: hp("2%"),
    marginBottom: hp("2%"),
  },

  scrollViewHorizontalContainerMatch: {
    alignItems: 'center',
  },

  scrollViewHorizontalContainerMatchFille: {
    backgroundColor: 'rgba(235,235,235,0.8)',
    borderRadius: hp("4%"),
    height: "100%",
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "rgba(119,126,144,1)"
  },

  MatchDoneContainer: {
    width: "100%",
    height : hp("17%"),
    marginTop: hp("2%"),
    marginBottom: hp("2%"),   
  },

  // === BOTTOM BAR MENU ===
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