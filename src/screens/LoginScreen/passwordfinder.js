import React,  { useContext, useState, useEffect }  from "react";
import { View,Text, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard} from "react-native";
import { Input,Button } from "react-native-elements";
import Overlay from '../../components/Overlay';
import { Context as UserContext } from '../../dataStore/userAccessContext';
import { navigate } from '../../NavigationRef';
import { isEmail,isName, PhoneField, isPassword } from "../../utils";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import NavigationBar from 'react-native-navbar';




const Spacer = ({ children }) => {
  return <View style={styles.spacer}>{children}</View>;
};


const rightButtonConfig = {
  title :'<',
  tintColor : 'black', 
  handler: () => navigate('LoginScreen'),
};

const titleConfig = {
  title: '비밀번호 찾기',
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
 


const passScreen = () => {
    
    const { state, PasswordFinder, onDissmiss} = useContext(UserContext);
    const { msg } = state;
    const [isLoading, setIsLoading] = useState(false);    
    const [name, setname] = useState("");
    const [nameValid, setnameValid] = useState(true);
    const [phoneValid, setphoneValid] = useState(true);
  
    const [email,setemail] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [Phonenum, setPhonenum] = useState("");
    //const [birth, setbirth] = useState(""); 
    
    const phoneChangeHandler =(text) => {
      let StringCheck = /[0-9]/;
      let changePhone;     
      if (text.trim().length === 11 && text !== StringCheck){
        changePhone = text.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3");
        setphoneValid(true);
        //return changePhone;         
      } else {      
        setphoneValid(false); 
    
      }               
      setPhonenum(changePhone); 
    }
    
    const emailChangeHandler = (text) => {
      if(!isEmail(text)){  
        setEmailValid(false);     
      } else { 
        setEmailValid(true);
      } 
      setemail(text);
    }

    const nameChangeHandler = (text) =>{     
      if(!isName(text)){  
        setnameValid(false);  
      } else { 
        setnameValid(true);
      }
      setname(text);
    }


    const onPressCheck = () => {
      console.log(nameValid+'네임' + phoneValid + '폰' + emailValid +'이메일');
      console.log(name+"이름" + email+'이메일' +Phonenum+'폰');
      if(name !=null && name!='' && nameValid==true && phoneValid==true && Phonenum != null && Phonenum !='' && email != '' && emailValid == true) {
        PasswordFinder({name, Phonenum, email});    
        setIsLoading(true);  
  
        Alert.alert('안내','회원가입하신 이메일로 비밀번호가 전송되었습니다'); 
      } else {   
        Alert.alert('안내','정확히 입력해주세요');         
        return;
      }

    }
 
    useEffect(() => {
        setIsLoading(false);
        //showAlert();
      }, [msg]);

    //생년월일 및 광고 배너 등록 예정
    return (
        
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>      
        <View style={styles.container}>
          <Mover/>
          <Overlay isShow={isLoading} />


            <Input
          //autoComplete="off"
          label="Email"
          leftIcon={<MaterialCommunityIcons name="email-outline" size={24} color="black" />}
          labelStyle={{marginLeft:0}}
          inputContainerStyle={{marginRight:15}}
          containerStyle={{marginTop:5}} 
          placeholder="이메일"
          //autoCapitalize={false}
          //autoCorrect={false}     
          //value={setEmail} 
          type='text' 
          //value={email}  
          onChangeText={(text) => emailChangeHandler(text)}
          value={email}  
        /> 
         {!emailValid && <Text style={styles.innerText}>이메일을 다시 입력해 주세요.</Text>}
            <Input
              placeholder="이름"
              leftIcon={<MaterialCommunityIcons name="rename-box" size={24} color="black" />}
              //autoCapitalize={false} 
              //autoCorrect={false}
              //value={setname}    
              label="Name"
              labelStyle={{marginLeft:0}}
              inputContainerStyle={{marginRight:15}}
              containerStyle={{marginTop:5}} 
              type='text' 
              onChangeText={ (text) => nameChangeHandler(text)} 
              value={name}    
            />            
            {!nameValid && <Text style={styles.innerText}>올바른 이름을 입력해 주세요.</Text>} 

        <Input
          placeholder="'-' 없이 숫자만 입력"          
          label="Mobile" 
          leftIcon={<Ionicons name="phone-portrait-outline" size={24} color="black"/>}
          labelStyle={{marginLeft:0}}
          inputContainerStyle={{marginRight:15}}
          containerStyle={{marginTop:5}} 
          type='text'               
          onChangeText = {(text)=> phoneChangeHandler (text)}
          value={Phonenum} 
      />
            {!phoneValid&& <Text style={styles.innerText}>정확한 핸드폰 번호를 입력해주세요.</Text>}

 
        <View style={styles.flex_container}>
        <Button buttonStyle={styles.button} title={"비밀번호 초기화"}
          onPress={() => onPressCheck()}           
        />

        <Button
          buttonStyle={styles.button} 
          title={"이메일찾기"}
          onPress={() => navigate("emailScreen")} 
          />     
        </View>

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
        width: 150,
        backgroundColor: '#46c3ad',    
        alignSelf: "center", 
        borderRadius: 30 
      },
    flex_container:{
        flexDirection: "row",
        justifyContent:'space-between',
        marginRight: 40,
        marginLeft: 40
    }  
  });
  passScreen.navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

export default passScreen;
   