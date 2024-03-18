import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


// ================== DEF FONCTION LOCAL ==================


function RegisterIII(props) {

  //================== DEF IMAGE INPUT ==================
  const [selectedImage, setSelectedImage] = useState(null);

  const ImageSubmit = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée', 'Vous devez autoriser l\'accès à la bibliothèque de médias pour choisir une image.');
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImage(result.uri);
      }
    } catch (error) {
      console.log('Erreur lors du choix de l\'image:', error);
    }
  };

  //====================== SUMBIT BUTTON IGNORE ======================
  const IgnoreSubmit = () => {
    props.navigation.navigate("RegisterIV")
  };

  //====================== SUMBIT BUTTON NEXT ======================
  const handleSubmit = () => {

  };

  return (
      <View style={styles.container}>
        <ImageBackground //Fond d'écran
          source={require("../images/RegisterIII.png")}
          resizeMode="cover"
          style={styles.backGroud}
          imageStyle={styles.backGroud_imageStyle}>       

          <Image // logo haut d'écran        
            source={require("../images/LOGORMVBG.png")}
            resizeMode="cover"
            style={styles.Logo}
          ></Image>

          <Text style={styles.Title}>On y est presque, encore un effort !</Text>
          
          <Image //Progress bar
            source={require("../images/progress33.png")}
            resizeMode="cover"
            style={styles.ProgressBar}
          ></Image>

          <Text style={styles.SubTitles}>Photo de profil</Text>
          <Text style={styles.NormText}>Aides tes futurs adversaires à t’identifier</Text>


        <TouchableOpacity style={styles.containerInput} onPress={ImageSubmit}>
          <Image
            source={require("../images/UploadIMG.png")}
            style={styles.uploadIMG}
          />
        </TouchableOpacity>
        
          <Text style={styles.NormTextII}>Tu auras la possibilité de modifier ta photo dans ton profil.</Text>

          <TouchableOpacity style={styles.NextButton} // button suivant
            onPress={handleSubmit}>
            <Text style={styles.TextButton}>Finaliser mon inscription</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.IgnoreButton} // button ignore
            onPress={IgnoreSubmit}>
            <Text style={styles.TextButton}>Ignorer</Text>
          </TouchableOpacity>

        </ImageBackground> 

        <TouchableOpacity // Button retour flèche
          onPress={() => props.navigation.navigate("RegisterII")}
          style={styles.button3}>

          <ImageBackground // image fleche button retour
            source={require("../images/FlecheRMVBG.png")}
            resizeMode="contain"
            style={styles.image}>
          </ImageBackground>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {// modif container ALL
    flex: 1,
    width : '100%',
    height : '100%',
  },

  backGroud: {// propriété image
    width: '100%',
    height: '100%',
    backgroundColor: "rgba(112,98,98,0.16)",
    top: 0,
    alignItems : 'center',
  },

  backGroud_imageStyle: { // propriété style image
    opacity: 0.9,
  },

  Title: { // titre en dessous du logo
    fontSize : 24,
    paddingLeft: wp('20%'),
    paddingRight: wp('20%'),
    textAlign : 'center',
    fontWeight : 'bold',
  },

  ProgressBar : {
    marginTop: hp("2.5%"),
    width : 163,
    height : 25,
  },

  SubTitles: {
    textAlign:'left',
    width: wp('100%'),
    marginLeft: wp('13%'),
    fontSize: 23,
    fontWeight : 'bold',
    marginTop: hp('3%'),
  },

  NormText: {
    textAlign:'left',
    width: wp('100%'),
    marginLeft: wp('13%'),
    marginTop: wp('3%'),
    color: "rgba(92, 92, 92, 1)"
  },

  NormTextII: {
    textAlign:'center',
    width: wp('100%'),
    paddingRight: wp("13%"),
    paddingLeft: wp("13%"),
    marginTop: wp('12%'),
    color: "rgba(92, 92, 92, 1)"
  },

  uploadIMG: {
    width: 160,
    height: 157,
  },

  button3: { //button flèche
    width: '10%',
    height: '10%',
    position : 'absolute',
    marginTop : 20,
    marginLeft : 20,
  },

  image: { //image flèche retour
    width: '100%',
    height: '100%',
  },

  Logo: { //600X600
    width: wp('20.4%'),
    height: hp('9.36%'),
    marginTop : wp('13%'),
  },

  containerInput: { //container des cadres d'input
    marginTop : hp('5%'),
    alignItems : 'center',
  },

  NextButton: { // button suivant -> formulaire !
    width: wp("80%"),
    height: hp('6%'),
    backgroundColor: "rgba(255,184,0,1)",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 17,
    alignItems : 'center',
    justifyContent: 'center',
    marginTop: hp('5%'),// ICI !!
  },

  IgnoreButton: { // button ignore -> formulaire !
    width: wp("80%"),
    height: hp('6%'),
    backgroundColor: "rgba(219,219,219,1)",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 17,
    alignItems : 'center',
    justifyContent: 'center',
    marginTop: hp('1.2%'),// ICI !!
  },

  TextButton: { // text du button suivant
    fontSize: 20,
    color: "rgba(65,64,64,100)",
    fontWeight : 'bold',
  },

});

export default RegisterIII;