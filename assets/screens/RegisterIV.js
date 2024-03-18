import React from 'react';
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
  Button,
 } from 'react-native';


 
const RegisterIV = ({ navigation }) => {


  return (
        <View style={styles.container}>
            <ImageBackground //Fond d'écran
            source={require("../images/InscriptionChek.png")}
            resizeMode="cover"
            style={styles.backGroud}
            imageStyle={styles.backGroud_imageStyle}>
            
            <Text style={styles.LigneI}></Text>
            <Text style={styles.LigneII}></Text>
            <Text style={styles.LigneIII}></Text>


            
            
            
            
            </ImageBackground> 
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
        //opacity: 0.06
    },  
    
    LigneI: {

    },

    LigneII: {

    },

    LigneIII: {

    },

});

export default RegisterIV;