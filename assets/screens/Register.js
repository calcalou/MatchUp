import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  Alert,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as SQLite from 'expo-sqlite';

const months = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

// ================== DEF INTI DB ==================

const db = SQLite.openDatabase({ name: 'DataBase.db', createFromLocation: 'default' });

// ================== DB INSERT ==================
// Fonction de vérification

const verifierOuvertureDatabase = () => {
  Alert.alert("funcion executé");
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM sqlite_master LIMIT 1',
      [],
      (_, { rows }) => {
        console.log('La base de données a été ouverte avec succès.');
        // Si vous voulez afficher le contenu de la première ligne
        console.log('Contenu de la première ligne :', rows.item(0));
      },
      (_, error) => {
        console.error('Erreur lors de l\'ouverture de la base de données :', error);
      }
    );
  });
};

// ================== DEF FONCTION LOCAL ==================

//================== DEF STYLE CONST ==================
const BORDER_WIDTH = 0.4;
const BORDER_RADUIS = 5;
const BORDER_RADUIS_SEXE = 9;
const BORDER_COLOR = "rgba(139,139,139,1)";
const MARGIN_TOP_SPACE = 3;


function Register(props) {

  //================== DEF PSEUDO ==================
  const [Pseudo, setPseudo] = useState('');
  const [pseudoValidated, setPseudoValidated] = useState(0);
  const [pseudoPlaceholderColor, setPseudoPlaceholderColor] = useState('gray');

  const handlePseudoSelection = (PseudoValue) => {
    setPseudoValidated(PseudoValue);
  };

  const OnChangePseudo = (text) => {
    setPseudo(text);
    handlePseudoSelection(0);
  };

  //================== DEF DAY ================== 
  const [Day, setDay] = useState('');
  const [DayValidated, setDayValidated] = useState(0);
  const [DayPlaceholderColor, setDayPlaceholderColor] = useState('gray');

  const handleDaySelection = (DayValue) => {
    setDayValidated(DayValue);
  };

  const OnChangeDay = (text) => {
    setDay(text);
    handleDaySelection(0);
  };

  //================== DEF YEAR ==================  
  const [Year, setYear] = useState('');
  const [YearValidated, setYearValidated] = useState(0); 
  const [YearPlaceholderColor, setYearPlaceholderColor] = useState('gray');
  
  const handleYearSelection = (YearValue) => {
    setYearValidated(YearValue);
  };

  const OnChangeYear = (text) => {
    setYear(text);
    handleYearSelection(0);
  };

  //================== DEF MONTH ==================
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [MonthValidated, setMonthValidated] = useState(0);
  const [MonthPlaceholderColor, setMonthPlaceholderColor] = useState('gray');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleMonthSelection = (month) => {
    setSelectedMonth(month);
    setModalVisible(false);
    setMonthValue(0);
  };

  const setMonthValue = (MonthValue) => {
    setMonthValidated(MonthValue);
  };
  
  //================== DEF GENDER ==================
  const [gender, setGender] = useState(0);

  const handleGenderSelection = (genderValue) => { // Gender select
    setGender(genderValue);
  };

  //================== DEF AWARE.KEYBOARD ======================
  const handlePressOutsideKeyboard = () => {
    Keyboard.dismiss();
  };

  //====================== SUMBIT BUTTON NEXT ======================
  const handleSubmit = () => {

    props.navigation.navigate("RegisterII"); // DEV SHUNT !!

    // Appeler la fonction de vérification
    //verifierOuvertureDatabase();

    if (gender === 0) {// gender TEST
      //Alert.alert('Sélectionnez un genre', 'Veuillez sélectionner un genre.');
    } else if (gender === 1) {// si homme 
      
      //Alert.alert('Homme');
    } else if (gender === 2) {// si femme
       
      //Alert.alert('Femme');
    }

    if (!Pseudo) {
      handlePseudoSelection(1);
      setPseudoPlaceholderColor("rgba(227,119,111,1)");// set red
    }
    
    if(!Day){
      handleDaySelection(1);
      setDayPlaceholderColor("rgba(227,119,111,1)");// set red
    }

    if (!Year) {
      handleYearSelection(1);
      setYearPlaceholderColor("rgba(227,119,111,1)");// set red
    }

    if (!selectedMonth) {
      setMonthValue(1);
      setMonthPlaceholderColor("rgba(227,119,111,1)");// set red
    }

    if (!Pseudo || !Day || !selectedMonth || !Year ) {
      Alert.alert("Veuillez remplir tous les champs");

    } else if (gender === 0) {
      Alert.alert("Veuillez séléctionner votre genre");

    } else { 
          props.navigation.navigate("RegisterII");
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

          <Text style={styles.Title}>Création de votre compte Match Up !</Text>

          <Image //Progress bar
            source={require("../images/progress13.png")}
            resizeMode="cover"
            style={styles.ProgressBar}
          ></Image>

          <View style={styles.containerInput} /* container de tout les inputs */ >
          <View style={[styles.PseudoBox, pseudoValidated === 1 && styles.EmptyBox ]}>
            <TextInput 
              style={[styles.PseudoInput, pseudoValidated === 1 && styles.EmptyInput]}
              placeholder="Choisissez un pseudo" 
              maxLength={20}
              value={Pseudo}
              onChangeText={OnChangePseudo}
              placeholderTextColor={pseudoPlaceholderColor}
            ></TextInput>
          </View>
            <View style={styles.DateContainer}>
              <View style={[styles.DayBox, DayValidated === 1 && styles.EmptyBox]}>
                <TextInput 
                  style={[styles.DayInput, DayValidated === 1 && styles.EmptyInput]} 
                  placeholder="JJ" maxLength={2} 
                  keyboardType="numeric"
                  value={Day}
                  onChangeText={OnChangeDay}
                  placeholderTextColor={DayPlaceholderColor}
                ></TextInput>
              </View>
              
              <View style={[styles.MonthBox, MonthValidated === 1 && styles.EmptyBox]}>
                  <TextInput
                    style={[styles.MonthTextInput, MonthValidated === 1 && styles.EmptyInput]}
                    placeholder="MM"
                    editable={false} // Empêcher l'édition directe du TextInput
                    value={selectedMonth ? selectedMonth : ''}
                    placeholderTextColor={MonthPlaceholderColor}
                    onPress={toggleModal}
                  ></TextInput>
                <TouchableOpacity style={styles.ButtonToggleMonthModal} onPress={toggleModal}></TouchableOpacity>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={isModalVisible}
                  onRequestClose={() => {
                  setModalVisible(false);
                  }}
                >
                  <View style={styles.MonthModalContainer}>
                  <FlatList
                    data={months}
                    renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleMonthSelection(item)}>
                    <Text style={styles.MonthModalItem}>{item}</Text>
                    </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                  </View>
                </Modal>
              </View>

              <View style={[styles.YearBox, YearValidated === 1 && styles.EmptyBox]}>
                <TextInput 
                  style={[styles.YearInput, YearValidated === 1 && styles.EmptyInput]} 
                  placeholder="YYYY" maxLength={4} 
                  keyboardType="numeric"
                  value={Year}
                  onChangeText={OnChangeYear}
                  placeholderTextColor={YearPlaceholderColor}
                ></TextInput>
              </View>
            </View>
            <View style={styles.SexContainer}>
              <TouchableOpacity onPress={() => handleGenderSelection(1)} 
                                style={[styles.MaleBox, gender === 1 && styles.selectedGender]}>
                <Image source={require("../images/HommeLogoRMVBG.png")} resizeMode="cover" style={styles.MaleLogo}></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleGenderSelection(2)} 
                                style={[styles.FemaleBox, gender === 2 && styles.selectedGender]}>
                <Image source={require("../images/FemmeLogoRMVBG.png")} resizeMode="cover" style={styles.FemaleLogo}></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.LocalisationBox}></View>
          </View>

          <TouchableOpacity style={styles.NextButton} // button suivant
                            onPress={handleSubmit}>
            <Text style={styles.TextButton}>Suivant</Text>
          </TouchableOpacity>

          </ImageBackground> 
          <TouchableOpacity // Button retour
            onPress={() => props.navigation.navigate("Home")}
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
    width : 163,
    height : 25,
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

  PseudoBox: { // cadre de pseudo
    borderWidth: wp(`${BORDER_WIDTH}%`),
    borderColor: BORDER_COLOR,
    borderRadius: wp(`${BORDER_RADUIS}%`),
    width: wp('80%'),
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  PseudoInput:{
    fontSize: 20,
    width: '100%',
    height: '100%',
    textAlign:'center',
  },

  DateContainer: { // vontainer des cadre : jour, mois, année
    width: wp('80%'),
    marginTop: hp(`${MARGIN_TOP_SPACE}%`),
    justifyContent: 'center',
    flexDirection: 'row',
  },

  DayBox: { // cadre jour
    borderWidth: wp(`${BORDER_WIDTH}%`),
    borderColor: BORDER_COLOR,
    borderRadius: wp(`${BORDER_RADUIS}%`),
    width: wp('17%'),
    height: hp('6%'),
    marginRight: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  DayInput: {
    fontSize: 20,
  },

  MonthBox: { // cadre Mois
    borderWidth: wp(`${BORDER_WIDTH}%`),
    borderColor: BORDER_COLOR,
    borderRadius: wp(`${BORDER_RADUIS}%`),
    width: wp('26%'),
    height: hp('6%'),
    marginRight: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  ButtonToggleMonthModal: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',    
  },

  MonthTextInput: {// Text input de l'affichage du mois et button clic
    position: 'absolute',
    fontSize: 20,
  },

  MonthModalContainer: { // background/container du modal -> mois
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(150, 150, 150, 0.9)',
    paddingTop: hp('9%'),
  },

  MonthModalItem: {// Propriété mots -> mois
    padding: 10,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    textAlign: 'center',
    color: 'rgba(66, 66, 63, 1)',
  },

  YearBox: { // cadre année
    borderWidth: wp(`${BORDER_WIDTH}%`),
    borderColor: BORDER_COLOR,
    borderRadius: wp(`${BORDER_RADUIS}%`),
    width: wp('26%'),
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  YearInput: {
    fontSize: 20,
  },

  SexContainer: { // container des button sexe
    width: wp('80%'),
    marginTop: hp(`${MARGIN_TOP_SPACE}%`),
    justifyContent: 'center',
    flexDirection: 'row',
  },

  MaleBox: { // button sexe homme
    borderWidth: wp(`${BORDER_WIDTH}%`),
    borderColor: BORDER_COLOR,
    borderRadius: wp(`${BORDER_RADUIS_SEXE}%`),
    width: wp('35%'),
    height: wp('35%'),   
    marginRight: wp('10%'),
    justifyContent: 'center',
    alignItems : 'center',
  },

  MaleLogo:{ // image sexe homme
    width: wp('18.6%'),
    height: wp('18.6%'),     
  },

  FemaleBox: { // button sexe femme
    borderWidth: wp(`${BORDER_WIDTH}%`),
    borderColor: BORDER_COLOR,
    borderRadius: wp(`${BORDER_RADUIS_SEXE}%`),
    width: wp('35%'),
    height: wp('35%'),
    justifyContent: 'center',
    alignItems : 'center',
  },

  FemaleLogo: { // image sexe femme 
    width: wp('15%'),
    height: wp('19.8%'),   
  },

  selectedGender: {
    borderColor: "rgba(255,184,0,1)",
    backgroundColor: "rgba(255,184,0,0.2)",
  },
  
  LocalisationBox: { // cadre prise localisation
    borderWidth: wp(`${BORDER_WIDTH}%`),
    borderColor: BORDER_COLOR,
    borderRadius: wp(`${BORDER_RADUIS}%`),
    marginTop: hp(`${MARGIN_TOP_SPACE}%`),
    width: wp('80%'),
    height: hp('6%'),  
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
    marginTop: hp('6%'),
  },

  TextButton: { // text du button suivant
    fontSize: 20,
    color: "rgba(65,64,64,100)",
    fontWeight : 'bold',
  },

});

export default Register;