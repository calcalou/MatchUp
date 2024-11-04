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
// import { TextInput } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';

import * as Font from "expo-font"; // import Font
import * as SplashScreen from "expo-splash-screen"; // import Font
import { useCallback } from "react"; // import Font

import Swiper from 'react-native-swiper';
// import { InterfaceOrientation } from "react-native-reanimated";

import { BarChart } from 'react-native-chart-kit'; //Import Tableau Stats


// ================== DEF FONCTION LOCAL ==================

// ================== DEF CONST ==================
const IndexMenu = 1; // def n° de page affiché après chargement

function Menu(props) {
  
   // ====================== CONNEXION FORM PHP ======================

   // =========== DEF FUNCTION RECUP USER INFO ===========
   const [userPseudoFetched, setUserPseudoFetched] = useState(''); // State pour stocker le pseudo
   const [userTeamID, setuserTeamID] = useState(''); // State pour stocker le pseudo
   const RequestUserInfo = async () => {
     try {
       const response = await fetch('http://www.discord.re/GetUserInfo.php', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         //body: JSON.stringify({ Email, Password }),
       });
       const data = await response.json();
 
       if (data.success) {
         // Récupérer les informations utilisateur
          const userInfo = data.user;
          const usersexe = data.user.Sexe;

          const userPseudo = data.user.Pseudo;
          setUserPseudoFetched(userPseudo);

          const userIDteam = data.user.IDEquipe;
          setuserTeamID(userIDteam);

         //console.log('ID team :', userIDteam);
         // console.log('sex Info:', usersexe);
         // // Vous pouvez maintenant utiliser ces informations dans votre application
         // console.log('User Info:', userInfo);
         // Rediriger vers une autre page ou effectuer d'autres actions
         //props.navigation.navigate("Menu");
       } else {
         Alert.alert('Error', data.message);
       }
     } catch (error) {
       console.error('Error:', error);
       Alert.alert('Error', "Une erreur s'est produite. Veuillez réessayer plus tard.");
     }
   };
   useEffect(() => { RequestUserInfo();}, []);
   
   // =========== DEF FUNCTION RECUP USER Team ===========
   
   const [userTeamPseudo, setuserTeamPseudo] = useState('');
   const [userTeamPoint, setuserTeamPoint] = useState('');
   
   const RequestUserTeamInfo = async () => {
    try {
      const response = await fetch('http://www.discord.re/LoadUserTeam.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify({userTeamID}),
      });
      const data = await response.json();

      if (data.success) {
        // Récupérer les informations utilisateur
        const userTeamPseudo = data.user.Nom;
        setuserTeamPseudo(userTeamPseudo);
        //console.log(userTeamPseudo);
        const userTeamPoint = data.user.Points;
        setuserTeamPoint(userTeamPoint);
        //console.log(userTeamPoint);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', "Une erreur s'est produite. Veuillez réessayer plus tard.");
    }
  };
  useEffect(() => { RequestUserTeamInfo();}, []);   



   // =========== DEF FUNCTION RECUP USER Trophy ===========
  const [userTrophyFootFetched, setuserTrophyFootFetched] = useState(''); // State
  const [userTrophyBasketFetched, setuserTrophyBasketFetched] = useState(''); // State
  const [userTrophyVolleyFetched, setuserTrophyVolleyFetched] = useState(''); // State
  const [userTrophyPadelFetched, setuserTrophyPadelFetched] = useState(''); // State
  const [userTrophyBadmintonFetched, setuserTrophyBadmintonFetched] = useState(''); // State
  const [userTrophySquashFetched, setuserTrophySquashFetched] = useState(''); // State

  // Fonction pour calculer la somme des trophées
  const calculateTotalTrophies = () => {
    const foot = parseInt(userTrophyFootFetched) || 0;
    const basket = parseInt(userTrophyBasketFetched) || 0;
    const volley = parseInt(userTrophyVolleyFetched) || 0;
    const padel = parseInt(userTrophyPadelFetched) || 0;
    const badminton = parseInt(userTrophyBadmintonFetched) || 0;
    const squash = parseInt(userTrophySquashFetched) || 0;

    const total = foot + basket + volley + padel + badminton + squash;
    return total;
  };

    // Exemple d'utilisation
    const PointsUser = calculateTotalTrophies();

   const RequestUserTrophy = async () => {
     try {
       const response = await fetch('http://www.discord.re/GetUserTrophy.php', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         //body: JSON.stringify({ Email, Password }),
       });
       const data = await response.json();
 
       if (data.success) {
         // Récupérer les informations utilisateur
         const TrophyFoot = data.user.TrophyFoot;
         setuserTrophyFootFetched(TrophyFoot);

         const TrophyBasket = data.user.TrophyBasket;
         setuserTrophyBasketFetched(TrophyBasket);

         const TrophyVolley = data.user.TrophyVolley;
         setuserTrophyVolleyFetched(TrophyVolley);

         const TrophyPadel = data.user.TrophyPadel;
         setuserTrophyPadelFetched(TrophyPadel);

         const TrophyBadminton = data.user.TrophyBadminton;
         setuserTrophyBadmintonFetched(TrophyBadminton);

         const TrophySquash = data.user.TrophySquash;
         setuserTrophySquashFetched(TrophySquash); 
         
         //props.navigation.navigate("Menu");
       } else {
         Alert.alert('Error', data.message);
       }
     } catch (error) {
       console.error('Error:', error);
       Alert.alert('Error', "Une erreur s'est produite. Veuillez réessayer plus tard.");
     }
   };
   useEffect(() => { RequestUserTrophy();}, []);



  // ====================== DEF PROFILE ====================== 

  // === DEF INFO/PROFILE BUTTON ===
  const [infomatchselected, setinfomatchselected] = useState(1);

  const ProfileInfoHandle = () => {
    setinfomatchselected(1);
    setViewNumber(1);
  };
  
  const ProfileMatchHandle = () => {
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
    labels: ["Foot","Basket","Volley","Padel","Badminton","Squash"],
    datasets: [
      {
        data: [userTrophyFootFetched, userTrophyBasketFetched, userTrophyVolleyFetched, userTrophyPadelFetched, userTrophyBadmintonFetched, userTrophySquashFetched],

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
  //====================== DEF TOURNOIS ======================  
  const [AvenirHistoriqueSelected, setAvenirHistoriqueSelected] = useState(1);

  const AvenirButtonPressed = () => {
    setAvenirHistoriqueSelected(1);
  };

  const HistoriqueButtonPressed = () => {
    setAvenirHistoriqueSelected(2);
  };

  //====================== DEF EQUIPE ======================  
  // Variable qui détermine le nombre de groupes de vues à afficher
  const numberOfGroups = 23; // Par exemple, cette variable peut être dynamique

  // Fonction pour rendre les groupes de vues en fonction de la variable
  const renderGroups = () => {
    let groups = [];
    for (let i = 0; i < numberOfGroups; i++) {
      groups.push(
        <View key={i.toString()} style={styles.MemberBoxProfileContainer}>
          <View style={styles.MemberBoxProfile}>
            <Text>{i + 1}</Text>
          </View>
        </View>
      );
    }
    return groups;
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
              <Text style={styles.PagepNameUserInfo}>{userPseudoFetched}</Text>
              <View style={styles.StatsProfileInfoContainer}>
                <Text style={styles.TextSatsInfoProfile}>
                  <Image style={styles.IcoTrophyStatsInfo} source={require("../images/IcoTrophy.png")} resizeMode="contain"></Image> 
                  Points : {PointsUser}
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
              <Text style={styles.PagepNameUserMatch}>{userPseudoFetched}</Text>

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
                        fromZero={true}
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
        <View style={styles.PageTournois}>
          <View style={styles.PageTopContainerTournois}>
            <Image // Logo MatchUp
              source={require("../images/LOGORMVBG.png")}
              style={styles.LogoPageTournois}
            ></Image>
          </View>
          <View style={styles.PageTournoisMidleBody}>
            <Text style={styles.TitlePageTournois}>Tournois</Text>
            <Text style={styles.TextPageTounois}>Participe aux tournois organisés par Match up,</Text>
            <Text style={styles.TextPageTounois}>
              <Text style={styles.TextPageTounoisSemiBold}>remporte des points multisport</Text>
              <Text style={styles.TextPageTounois}> et grimpe</Text>
            </Text>
            <Text style={styles.TextPageTounois}>dans le classement !</Text>
            <View style={styles.ButtonPageTournoisMain}>
              <TouchableOpacity onPress={AvenirButtonPressed} style={[styles.ButtonPageTournoisMainAvenir, AvenirHistoriqueSelected === 1 && styles.AvenirHistoriquebuttonselected]}>
                <Text style={styles.TextButtonPageTournoisMain}>À venir</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={HistoriqueButtonPressed} style={[styles.ButtonPageTournoisMainHistorique, AvenirHistoriqueSelected === 2 && styles.AvenirHistoriquebuttonselected]}>
                <Text style={styles.TextButtonPageTournoisMain}>Historique</Text>
              </TouchableOpacity>
            </View>  
          </View>
          <ScrollView 
              showsVerticalScrollIndicator={false}
              style={styles.PageTournoisverticalBodyScrollView}
          >
            <ScrollView
              horizontal
              contentContainerStyle={styles.PageTournoisHorizontalBodyScrollView}
              showsHorizontalScrollIndicator={false}
              snapToInterval={0}
              decelerationRate="fast"
            >
              <View style={styles.PagetournoisViewScrollFille}> 
                <LinearGradient 
                  colors={['#FDC433','#FFEFC8']} // Couleurs du dégradé
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.PagetournoisViewScrollFille}
                >
                  <Image style={styles.CardBodyTournoisBackGround} source={require("../images/LayerTounoisCard.png")} resizeMode="contain"></Image>
                  <Text style={styles.TitleCardBodyTournois}>Tournoi</Text>
                  <Text style={styles.SubTitleCardBodyTournois}>#NOM DU TOURNOIS</Text>
                  <Text style={styles.SemiSubTitleCardBodyTournois}>Du ## au ## #MONTHS ####</Text>
                  <Text style={styles.MainTextCardBodyTournois}>Date limite d'inscription : ##/##/####</Text>
                  
                  <Text style={styles.LigneTexteCardBodyTournois}>
                    <Text style={styles.TextCardBodyTournois}>Sports : </Text>
                    <Text style={styles.TextBoldCardBodyTournois}>#SPORT1 - #SPORT2 - #SPORT3</Text>
                  </Text>
                  
                  <Text style={styles.LigneTexteCardBodyTournois}>
                    <Text style={styles.TextCardBodyTournois}>Points minimum : </Text>
                    <Text style={styles.TextBoldCardBodyTournois}>#### points</Text>
                  </Text>

                  <Text style={styles.LigneTexteCardBodyTournois}>
                    <Text style={styles.TextCardBodyTournois}>Équipes inscrites : </Text>
                    <Text style={styles.TextBoldCardBodyTournois}>## sur ##</Text>
                  </Text>

                  <TouchableOpacity style={styles.ButtonInfoBodyCardTournois}>
                    <Text style={styles.ButtonTextBodycardTournois}>En savoir plus</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.ButtonRegisterBodyCardTournois}>
                    <Text style={styles.ButtonTextBodycardTournois}>J'inscris mon équipe</Text>
                  </TouchableOpacity>

                </LinearGradient> 
              </View>
              <View style={styles.PagetournoisViewScrollFille}> 
                <LinearGradient 
                  colors={['#FDC433','#FFEFC8']} // Couleurs du dégradé
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.PagetournoisViewScrollFille}
                >
                  <Image style={styles.CardBodyTournoisBackGround} source={require("../images/LayerTounoisCard.png")} resizeMode="contain"></Image>
                  <Text style={styles.TitleCardBodyTournois}>Tournoi</Text>
                  <Text style={styles.SubTitleCardBodyTournois}>#NOM DU TOURNOIS</Text>
                  <Text style={styles.SemiSubTitleCardBodyTournois}>Du ## au ## #MONTHS ####</Text>
                  <Text style={styles.MainTextCardBodyTournois}>Date limite d'inscription : ##/##/####</Text>
                  
                  <Text style={styles.LigneTexteCardBodyTournois}>
                    <Text style={styles.TextCardBodyTournois}>Sports : </Text>
                    <Text style={styles.TextBoldCardBodyTournois}>#SPORT1 - #SPORT2 - #SPORT3</Text>
                  </Text>
                  
                  <Text style={styles.LigneTexteCardBodyTournois}>
                    <Text style={styles.TextCardBodyTournois}>Points minimum : </Text>
                    <Text style={styles.TextBoldCardBodyTournois}>#### points</Text>
                  </Text>

                  <Text style={styles.LigneTexteCardBodyTournois}>
                    <Text style={styles.TextCardBodyTournois}>Équipes inscrites : </Text>
                    <Text style={styles.TextBoldCardBodyTournois}>## sur ##</Text>
                  </Text>

                  <TouchableOpacity style={styles.ButtonInfoBodyCardTournois}>
                    <Text style={styles.ButtonTextBodycardTournois}>En savoir plus</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.ButtonRegisterBodyCardTournois}>
                    <Text style={styles.ButtonTextBodycardTournois}>J'inscris mon équipe</Text>
                  </TouchableOpacity>

                </LinearGradient> 
              </View>
              <View style={styles.PagetournoisViewScrollFille}> 
                <LinearGradient 
                  colors={['#FDC433','#FFEFC8']} // Couleurs du dégradé
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.PagetournoisViewScrollFille}
                >
                  <Image style={styles.CardBodyTournoisBackGround} source={require("../images/LayerTounoisCard.png")} resizeMode="contain"></Image>
                  <Text style={styles.TitleCardBodyTournois}>Tournoi</Text>
                  <Text style={styles.SubTitleCardBodyTournois}>#NOM DU TOURNOIS</Text>
                  <Text style={styles.SemiSubTitleCardBodyTournois}>Du ## au ## #MONTHS ####</Text>
                  <Text style={styles.MainTextCardBodyTournois}>Date limite d'inscription : ##/##/####</Text>
                  
                  <Text style={styles.LigneTexteCardBodyTournois}>
                    <Text style={styles.TextCardBodyTournois}>Sports : </Text>
                    <Text style={styles.TextBoldCardBodyTournois}>#SPORT1 - #SPORT2 - #SPORT3</Text>
                  </Text>
                  
                  <Text style={styles.LigneTexteCardBodyTournois}>
                    <Text style={styles.TextCardBodyTournois}>Points minimum : </Text>
                    <Text style={styles.TextBoldCardBodyTournois}>#### points</Text>
                  </Text>

                  <Text style={styles.LigneTexteCardBodyTournois}>
                    <Text style={styles.TextCardBodyTournois}>Équipes inscrites : </Text>
                    <Text style={styles.TextBoldCardBodyTournois}>## sur ##</Text>
                  </Text>

                  <TouchableOpacity style={styles.ButtonInfoBodyCardTournois}>
                    <Text style={styles.ButtonTextBodycardTournois}>En savoir plus</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.ButtonRegisterBodyCardTournois}>
                    <Text style={styles.ButtonTextBodycardTournois}>J'inscris mon équipe</Text>
                  </TouchableOpacity>

                </LinearGradient> 
              </View>
              <View style={styles.PagetournoisViewScrollFille}> 
                <LinearGradient 
                  colors={['#FDC433','#FFEFC8']} // Couleurs du dégradé
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.PagetournoisViewScrollFille}
                >
                  <Image style={styles.CardBodyTournoisBackGround} source={require("../images/LayerTounoisCard.png")} resizeMode="contain"></Image>
                  <Text style={styles.TitleCardBodyTournois}>Tournoi</Text>
                  <Text style={styles.SubTitleCardBodyTournois}>#NOM DU TOURNOIS</Text>
                  <Text style={styles.SemiSubTitleCardBodyTournois}>Du ## au ## #MONTHS ####</Text>
                  <Text style={styles.MainTextCardBodyTournois}>Date limite d'inscription : ##/##/####</Text>
                  
                  <Text style={styles.LigneTexteCardBodyTournois}>
                    <Text style={styles.TextCardBodyTournois}>Sports : </Text>
                    <Text style={styles.TextBoldCardBodyTournois}>#SPORT1 - #SPORT2 - #SPORT3</Text>
                  </Text>
                  
                  <Text style={styles.LigneTexteCardBodyTournois}>
                    <Text style={styles.TextCardBodyTournois}>Points minimum : </Text>
                    <Text style={styles.TextBoldCardBodyTournois}>#### points</Text>
                  </Text>

                  <Text style={styles.LigneTexteCardBodyTournois}>
                    <Text style={styles.TextCardBodyTournois}>Équipes inscrites : </Text>
                    <Text style={styles.TextBoldCardBodyTournois}>## sur ##</Text>
                  </Text>

                  <TouchableOpacity style={styles.ButtonInfoBodyCardTournois}>
                    <Text style={styles.ButtonTextBodycardTournois}>En savoir plus</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.ButtonRegisterBodyCardTournois}>
                    <Text style={styles.ButtonTextBodycardTournois}>J'inscris mon équipe</Text>
                  </TouchableOpacity>

                </LinearGradient> 
              </View>
            </ScrollView>
          </ScrollView>
        </View>

        {/* ==== PAGE EQUIPE ==== */}
        <View style={styles.PageProfile}>          
          {userTeamID !== 0 ? (
            <>
          {viewNumber === 1 ? (
            // AFFICHAGE TOP VIEW INFO
            <View style={styles.PagePTopContainerInfo}>
              <View style={styles.PagepProfilePictureInfoContainer}>
                <Image source={require("../images/ImageDefaultProfile.png")} resizeMode="cover" style={styles.PagepProfilePictureInfo}></Image>
              </View>
              <Text style={styles.PagepNameUserInfo}>{userTeamPseudo}</Text>
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
              <Text style={styles.PagepNameUserMatch}>#NOM EQUIPE</Text>
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
                    <Text style={styles.TitleProfileInfo}>Statistique equipe</Text>
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
                    <Text style={styles.TitleProfileInfo}>Joueurs</Text> 
                    {/* Affichage render en fonction de membre d'equipe : */}
                    {renderGroups()}
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
          </>
          ) : ( // Si pas d'équipe
            <View style={styles.EmptyTeamPageContainer}>
              <Image 
                source={require("../images/LogoEmptyTeam.png")}
                resizeMode="contain"
                style={styles.LogoEmptyTeam}
              ></Image>
              <Text style={styles.SubTitleEmptyTeam}>Vous n'avez pas équipe</Text>
              <Text style={styles.TextEmptyTeam}>Crées-en une ou rejoins celle de tes amis pour</Text>
              <Text style={styles.TextEmptyTeam}>participer aux compétitions</Text>

              <TouchableOpacity 
                onPress={() => props.navigation.navigate("SearchTeam")}
                style={styles.JoinTeamButton}>
                <Text style={styles.JoinTeamButtonText}>Rejoindre une équipe</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => props.navigation.navigate("CreateTeam")}
                style={styles.CreateTeamButton}>
                <Text style={styles.CreateTeamButtonText}>Créer mon équipe</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={ProfileHandle}
                style={styles.LogoEmptyProfileButton}>
                <Image 
                  source={require("../images/LogoEmptyProfile.png")}
                  resizeMode="contain"
                  style={styles.LogoEmptyProfile}
                ></Image>
              </TouchableOpacity>

            </View>
          )}
        </View>{/* FIN PAGE EQUIPE */}
                
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
  // === FIN PAGE PROFILE ===

  // === PAGE TOURNOIS ===
    PageTournois : {
      height: hp("100%"),
      backgroundColor: "rgba(242,242,242,1)",
      width: wp("100%"),
      alignItems: "center",
      justifyContent: "flex-start",
    },

    //+ Top Section+
      PageTopContainerTournois : {
        width: "100%",
        height: "15%",
        // backgroundColor: "yellow",
        alignItems: "center",
        justifyContent: "flex-end",
      },

      LogoPageTournois: {
        width : hp("10%"),
        height : hp("10%"),
      },

    //+ Mid Section +
      PageTournoisMidleBody : {
        height: "25%",
        width: "100%",
        paddingRight: wp("5%"),
        paddingLeft: wp("5%"),
        // backgroundColor: "green",
      },

      TitlePageTournois: {
        fontFamily: "Poppins-SemiBold",
        fontSize: hp("4%"),
      },

      TextPageTounois: {
        fontFamily: "Poppins-Regular",
        fontSize: wp("3.4%"),
      },

      TextPageTounoisSemiBold: {
        fontFamily: "Poppins-SemiBold",
        fontSize: wp("3.4%"),
      },

      ButtonPageTournoisMain: {
        width : "100%",
        height: "25%",
        // backgroundColor : "red",
        marginTop: hp("2%"),
        borderRadius : hp("2.7%"),
        borderWidth: 2,
        borderColor : "rgba(253,196,51,1)",
        flexDirection: "row"
      },

      ButtonPageTournoisMainAvenir : {
        // backgroundColor : 'red',
        height: "100%",
        width : "50%",
        borderRadius : hp("2.3%"),
        alignItems: "center",
        justifyContent: "center",
      },

      ButtonPageTournoisMainHistorique : {
        // backgroundColor : 'yellow',
        height: "100%",
        width : "50%",
        borderRadius : hp("2.3%"),
        alignItems: "center",
        justifyContent: "center",
      },

      AvenirHistoriquebuttonselected: {
        backgroundColor: "rgba(253,196,51,1)",
      },

      TextButtonPageTournoisMain:{
        fontFamily : "Poppins-SemiBold",
        fontSize: "16%"
      },

    //+ Body/Card Section +
    
    PageTournoisverticalBodyScrollView: {
      paddingLeft: wp("5%"),
    },

    PageTournoisHorizontalBodyScrollView : {
      height : hp("70%")
    },  

    PagetournoisViewScrollFille : {
      height: "90%",
      width: wp("75%"),
      borderRadius: "45%",
      marginRight : wp("5%")
    },

    CardBodyTournoisBackGround: {
      // position: "absolute",
      height : "65%",
      width: "65%",
      opacity: 0.7,
      marginTop: "-25%",
      marginBottom: "-20%",
      marginLeft: "5%",
    },

    TitleCardBodyTournois:{
      fontFamily: "Poppins-Bold",
      color: "white",
      fontSize: 55,
      marginLeft: "5%",
      marginTop: "-20%",
    },

    SubTitleCardBodyTournois: {
      fontFamily: "Poppins-SemiBold",
      color: "white",
      fontSize: 20,
      marginLeft: "5%",
      marginTop: "-3%",
    },

    SemiSubTitleCardBodyTournois: {
      fontFamily: "Poppins-Regular",
      color: "Black",
      fontSize: 16,
      marginLeft: "5%",
      marginTop: "3%"
    },

    MainTextCardBodyTournois: {
      fontFamily: "Poppins-SemiBold",
      marginLeft: "5%",
      fontSize: 11,
      marginBottom: "1%"
    },

    LigneTexteCardBodyTournois: {
      marginLeft: "5%",
      marginTop: "2%"
    },

    TextCardBodyTournois: {
      fontFamily: "Poppins-Regular",
      fontSize: 12,
    },

    TextBoldCardBodyTournois: {
      fontFamily: "Poppins-Bold",
      fontSize: 11,
    },

    ButtonInfoBodyCardTournois: {
      width: "90%",
      height: "10%",
      marginLeft: "5%",
      marginTop: "5%",
      borderRadius: "15%",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
    },

    ButtonRegisterBodyCardTournois: {
      width: "90%",
      height: "10%",
      marginLeft: "5%",
      marginTop: "5%",
      borderRadius: "15%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(253, 196, 51, 1)"
    },

    ButtonTextBodycardTournois: {
      fontFamily: "Poppins-SemiBold",
      fontSize: "14%",
    },
    
  // === FIN PAGE TOURNOIS ===
  
  // === PAGE EQUIPE ===

    MemberBoxProfileContainer: {
      height: hp("20%"),
      width:"100%",
      alignItems: "center",
      marginBottom: hp("-4%"),
    },

    MemberBoxProfile: {
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

    // + Empty Team + 

    LogoEmptyProfile: {
      height: hp("5%"),
      width: hp("5%"),

    },

    LogoEmptyProfileButton: {
      position : "absolute",
      top : hp("8%"),
      left : wp("4%"),
    },

    LogoEmptyTeam: {
      // backgroundColor: "red",
      height: hp("25%"),
      width: hp("25%"),

    },

    EmptyTeamPageContainer: {
      height: hp("100%"),
      width: wp("100%"),
      //backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center",

    },

    SubTitleEmptyTeam: {
      fontFamily : "Poppins-SemiBold",
      fontSize: 20,
      marginTop: hp("4%"),
      marginBottom: hp("3%"),

    },

    TextEmptyTeam: {
      fontFamily : "Roboto-Medium",
      fontSize: 14,
      color: "rgba(119, 126, 144, 1)",   
    },

    JoinTeamButton: {
      height : "6%",
      width: "80%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: hp("5%"),
      backgroundColor: "rgba(51, 51, 51, 1)",
      borderRadius: 18,
      
    },

    JoinTeamButtonText: {
      color: "rgba(255, 255, 255, 1)",
      fontSize: 16,
      fontFamily : "Poppins-SemiBold"
    },

    CreateTeamButton: {
      height: "6%",
      width: "80%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: hp("1%"),
      backgroundColor : "rgba(253, 196, 51, 1)",
      borderRadius: 18,
    },

    CreateTeamButtonText: {
      color: "rgba(51, 51, 51, 1)",
      fontSize: 16,
      fontFamily : "Poppins-SemiBold"
    },

  // === FIN PAGE EQUIPE ===

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