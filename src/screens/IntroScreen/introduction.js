import React,  { useContext, useState, useEffect, useMemo }  from "react";
import { View,Text, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from "react-native";
import { Input,Button } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { isEmail,isName, PhoneField, isPassword } from "../../utils";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Context as UserContext } from '../../dataStore/userAccessContext';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { navigate, navigateReset } from "../../NavigationRef";
import NavigationBar from 'react-native-navbar'; 

 
const Spacer = ({ children }) => {
  return <View style={styles.spacer}>{children}</View>;
};

const rightButtonConfig = {  
  tintColor : "red",
  title:'돌아가기',
  handler: () => navigate('LoginScreen'),
};


const titleConfig = {
  title: '이메일 찾기',
  fontSize: 30,
}

const Mover = ({ children}) => {
  
  return <View> 
              <NavigationBar
                  backgroundColor 
                  title={titleConfig}                  
                  leftButton = {rightButtonConfig}                                  
              />
        </View>

}



const introductionScreen = ()  => {
      
    
  //생년월일 및 광고 배너 등록 예정
    return (        
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <Text>소개 페이지 입니다.</Text>
      </View> 
    </TouchableWithoutFeedback>

     );
};

const styles = StyleSheet.create({
    container:{
        marginTop: 30,
        flex:1,
        backgroundColor: "white",
    },

    btnmove:{
      marginTop:0,
      alignSelf: "flex-end",
    }, 
    outterButton:{
        fontSize: 20,
        width: 200,
        height: 40, 
        backgroundColor: '#46c3ad',    
        alignSelf: "center", 
        borderRadius: 30 
    },   
        
    innerText:{
      marginBottom:20,
    }, 

    txtInputView: {
      marginTop: 10,
      marginBottom: 50,
    },
    spacer: {
      margin: 10,
      marginTop: 30,
      marginBottom: 20,
    },
    titleStyle: {
      fontSize: 12,
      fontWeight: "400",
      color: "red",
    },
    BouncyCheckbox:{
      height: 40, 
      width:40
    },
    titleStyle: {
        fontSize: 22,
        fontWeight: "300",
        color: "white",
      },    
    button: {
        fontSize: 15,   
        color: '#000000',   
      },
  });
  introductionScreen.navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

export default introductionScreen;
   