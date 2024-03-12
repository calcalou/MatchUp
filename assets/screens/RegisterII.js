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
import * as SQLite from 'expo-sqlite';

// ================== DEF FONCTION LOCAL ==================

// ================== DEF STYLE CONST ==================
const BORDER_WIDTH = 0.4;
const BORDER_RADUIS = 5;
const BORDER_COLOR = "rgba(139,139,139,1)";
const MARGIN_TOP_SPACE = 3;


function RegisterII(props) {

  //================== DEF Email ==================
  const [Email, setEmail] = useState('');
  const [EmailValidated, setEmailValidated] = useState(0);
  const [EmailPlaceholderColor, setEmailPlaceholderColor] = useState('gray');

  const handleEmailSelection = (EmailValue) => {
    setEmailValidated(EmailValue);
  };

  const OnChangeEmail = (text) => {
    setEmail(text);
    handleEmailSelection(0);
  };

  //====================== DEF MDP ======================
  const [Password, setPassword] = useState('');
  const [PasswordValidated, setPasswordValidated] = useState(0);
  const [PasswordPlaceholderColor, setPasswordPlaceholderColor] = useState('gray');

  const handlePasswordSelection = (PasswordValue) =>{
    setPasswordValidated(PasswordValue);
  }

  const OnChangePassword = (text) => {
    setPassword(text);
    handlePasswordSelection(0);
  };

  //================== DEF AWARE.KEYBOARD ======================
  const handlePressOutsideKeyboard = () => {
    Keyboard.dismiss();
  };

  //====================== SUMBIT BUTTON NEXT ======================
  const handleSubmit = () => {
    if (!Email) {
      handleEmailSelection(1);
      setEmailPlaceholderColor("rgba(227,119,111,1)");// set red      
    }

    if (!Password) {
      handlePasswordSelection(1);
      setPasswordPlaceholderColor("rgba(227,119,111,1)"); // set red
    }
  };


  return (
    <TouchableWithoutFeedback onPress={handlePressOutsideKeyboard} /* Fonction dismiss keyboard */>
      <View style={styles.container}>
        <ImageBackground //Fond d'écran
          source={require("../images/VolleyBW.png")}
          resizeMode="cover"
          style={styles.backGroud}
          imageStyle={styles.backGroud_imageStyle}>       

          <Image // logo haut d'écran        
            source={require("../images/LOGORMVBG.png")}
            resizeMode="cover"
            style={styles.Logo}
          ></Image>

          <Text style={styles.Title}>Vérification de ton adresse e-mail !</Text>
          
          <Image //Progress bar
            source={require("../images/progress23.png")}
            resizeMode="cover"
            style={styles.ProgressBar}
          ></Image>

          <View style={styles.containerInput} /* container de tout les inputs */ >
            <View style={[styles.EmailBox, EmailValidated === 1 && styles.EmptyBox]}>
              <TextInput 
                style={[styles.EmailInput, EmailValidated === 1 && styles.EmptyInput]}
                placeholder="Adresse e-mail" 
                maxLength={20}
                value={Email}
                onChangeText={OnChangeEmail}
                placeholderTextColor={EmailPlaceholderColor}
                keyboardType="email-address"
              ></TextInput>
            </View>

            <View style={[styles.PasswordBox, PasswordValidated === 1 && styles.EmptyBox]}>
              <TextInput
                style={[styles.PasswordInput, PasswordValidated === 1 && styles.EmptyInput]}
                placeholder="Mot de passe"
                maxLength={20}
                value={Password}
                onChangeText={OnChangePassword}
                placeholderTextColor={PasswordPlaceholderColor}
                secureTextEntry={true}
              ></TextInput>
            </View>
          </View>

          <TouchableOpacity style={styles.NextButton} // button suivant
            onPress={handleSubmit}>
            <Text style={styles.TextButton}>Suivant</Text>
          </TouchableOpacity>

        </ImageBackground> 

        <TouchableOpacity // Button retour flèche
          onPress={() => props.navigation.navigate("Register")}
          style={styles.button3}>

          <ImageBackground // image fleche button retour
            source={require("../images/FlecheRMVBG.png")}
            resizeMode="contain"
            style={styles.image}>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
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
    opacity: 0.06
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

  Title: { // titre en dessous du logo
    fontSize : 23,
    paddingLeft: wp('20%'),
    paddingRight: wp('20%'),
    textAlign : 'center',
    fontWeight : 'bold',
  },

  ProgressBar : {
    marginTop: hp("2.5%"),
    width : wp("45%"),
    height : hp("3.2%"),
  },

  containerInput: { //container des cadres d'input
    marginTop : hp('5%'),
    width : wp('85%'),
    alignItems : 'center',
  },

  EmptyInput: { // en cas de validation avec champs vide pour tout input
    fontStyle: 'italic',
  },

  EmptyBox: {
    borderColor: "rgba(112, 24, 10, 1)",
  },

  EmailBox: { // cadre de Email
    borderWidth: wp(`${BORDER_WIDTH}%`),
    borderColor: BORDER_COLOR,
    borderRadius: wp(`${BORDER_RADUIS}%`),
    width: wp('80%'),
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(`${MARGIN_TOP_SPACE}%`),
  },

  EmailInput:{
    fontSize: 20,
    width: '100%',
    height: '100%',
    textAlign:'center',
  },
  
  PasswordBox: { // cadre prise localisation
    borderWidth: wp(`${BORDER_WIDTH}%`),
    borderColor: BORDER_COLOR,
    borderRadius: wp(`${BORDER_RADUIS}%`),
    marginTop: hp(`8%`),
    width: wp('80%'),
    height: hp('6%'),  
  },

  PasswordInput:{
    fontSize: 20,
    width: '100%',
    height: '100%',
    textAlign:'center',
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
    marginTop: hp('29%'),
  },

  TextButton: { // text du button suivant
    fontSize: 20,
    color: "rgba(65,64,64,100)",
  },

});

export default RegisterII;