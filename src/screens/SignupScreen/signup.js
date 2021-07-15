import React, {useContext, useState, useEffect} from 'react';
import {  TextInput ,View,Text,StyleSheet, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Input } from "react-native-elements";
import { Context as UserContext } from '../../dataStore/userAccessContext';
import { SafeAreaView } from 'react-navigation';
import UserLogin from '../../components/UserLogin';
import { isEmail,isName, PhoneField, isPassword } from "../../utils";
import { Controller, useForm } from 'react-hook-form';
import Overlay from '../../components/Overlay'; 
import { ScrollView } from 'react-native-gesture-handler';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { onChange } from 'react-native-reanimated';

const Spacer = ({ children }) => {
  return <View style={styles.spacer}>{children}</View>;
};

//import { response } from 'express';

/*
name: '',
email: '',
password: '',
confirm_pass: '',
Phonenum:'',
birth : new Date(),//입력하고
pi_agreement: '',//입력하고
*/

const SignupScreen = () => {
  const { state, onSignup } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [nameValid, setnameValid] = useState(true);
  const [passValid, setpassValid] = useState(true);
  const [passCheckValid, setpassCheckValid] = useState(true);
  const [phoneValid, setphoneValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
 





  const [password, setPassword] = useState("");
  const [passwordCheck, setpasswordCheck] = useState("");
  const [name, setname] = useState("");
  const [Phonenum, setPhonenum] = useState("");
  const [birth, setbirth] = useState("");
  const [pi_agreement, setpi_agreement] = useState("");
  const [email, setEmail] = useState("");   
  
  const { msg } = state;
 
  useEffect(() => {
    setIsLoading(false);    
  }, [msg]);
  

  //email Handler
  const emailChangeHandler = (text) => {
    if(!isEmail(text)){  
      setEmailValid(false);     
    } else { 
      setEmailValid(true);
    } 
    setEmail(text);
  }
 
  //phone handler 
 
  const phoneChangeHandler =(text) => {
    
      if(text.trim().length === 11){   
        console.log(text+'입력된 번호222');
        let changePhone =  text.replace(/(\d{3})(\d{3})(\d{4})/,'$1-$2-$3'); 
        //setPhonenum(text.replace(/(\d{3})(\d{3})(\d{4})/,'$1-$2-$3'));
        console.log(text+'리플레이스 이후');   
        console.log(changePhone+'리플레이스 이후 222');
      } else if (text.length ===13) { 
 
        setphoneValid(true);
        setPhonenum(text.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
      } 
      setPhonenum(text); 
  }

  //pass Handler
  const passChangeHandler =(text) =>{

  }

  //pass CheckHandler

  const passCheckHandler = (text) => {

  }

  
  //이름 Handler
  const nameChangeHandler = (text) =>{     
      if(!isName(text)){  
        setnameValid(false);     
      } else { 
        setnameValid(true);
      }
      setname(text);
  } 
  



  
  return (
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.contentView} forceInset={{ top: 'always' }}>
      <ScrollView style={styles.flex}>
      <Overlay isShow={isLoading} /> 
      <View style={styles.listView}>

      <Spacer>
      <Input
          //autoComplete="off"
          placeholder="이메일"
          //autoCapitalize={false}
          //autoCorrect={false}     
          //value={setEmail} 
          type='text' 
          //value={email}  
          onChangeText={(text) => emailChangeHandler(text)}
          value={email}  
        />
        {!emailValid && <Text>이메일을 다시 입력해 주세요.</Text>}
      </Spacer>

      <Spacer> 
      <TextInput
          placeholder="휴대폰번호"          
          //autoCapitalize={false} 
          //autoCorrect={false}
          //value={setPhonenum} 
          type='text'               
          onChangeText = {(text)=> phoneChangeHandler(text)}
          value={Phonenum} 
          />
      </Spacer> 
                            
      <Spacer> 
      <Input
              placeholder="이름"
              //autoCapitalize={false} 
              //autoCorrect={false}
              //value={setname}   
              type='text' 
              onChangeText={ (text) => nameChangeHandler(text)} 
              value={name}   
            />

            {!nameValid && <Text>올바른 이름 입력해 주세요.</Text>}
      </Spacer>

      <Spacer>
      <Input
            placeholder="비밀번호(8자 이상 영문, 숫자 조합)"
            secureTextEntry
          //autoCapitalize={false}
          //autoCorrect={false} 
            onChangeText={(text)=> passChangeHandler(text)}
            value={password} 
      />

      </Spacer>

      <Spacer>
      <Input
            placeholder="비밀번호 확인"
            secureTextEntry
          //autoCapitalize={false}
          //autoCorrect={false}
            //value={setpasswordCheck}
            onChangeText={(text) => passCheckHandler(text)}
            value={passwordCheck}  
          /> 
      </Spacer>
      <Spacer> 
      <BouncyCheckbox
          size={30}
          text="개인정보동의요구서"          
          fillColor="#46c3ad"  
          iconStyle={{ borderColor: "#46c3ad" }}
          //autoCapitalize={false} 
          //autoCorrect={false}
          onPress ={setpi_agreement}      
          />  
      </Spacer>

 
      <Button title="Submit" onPress={()=> onSignup(email, password, name, Phonenum,birth,pi_agreement)}/>  
         
        {/* <UserLogin  
          onSubmit={({ email, password, name, Phonenum,birth,pi_agreement }) => {
            setIsLoading(true);
            onSignup({email, password, name, Phonenum,birth,pi_agreement});  
          }} 
          route="LoginScreen" 
          linkText="이미 계정이 있으신가요? 로그인하기"
          title="회원가입"
        /> */}
      </View>
      <View style={styles.bottomView}>
        <Text style={{ color: '#A7A6A6' }}>Copyright@ 한경기획 2021 </Text>
      </View>
      </ScrollView>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  ); 
};




const styles = StyleSheet.create({
  flex:{
    flex:1
  },
  txtInputView: {
    marginTop: 10,
    marginBottom: 10,
  },
  contentView: {
    backgroundColor: '#F2F2F2',
    flex: 1,
    justifyContent: 'space-between',
  },
  titleView: {
    flex: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },
  listView: {
    paddingTop: 50,
    flex: 6,
  },
  bottomView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  spacer: {
    margin: 10,
    marginTop: 20,
    marginBottom: 20,
  },
});

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default SignupScreen;