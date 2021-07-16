import React, {useContext, useState, useEffect} from 'react';
import {  TextInput ,View,Text,StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Input, Button } from "react-native-elements";
import { Context as UserContext } from '../../dataStore/userAccessContext';
import { SafeAreaView } from 'react-navigation';
import { isEmail,isName, PhoneField, isPassword } from "../../utils";
import Overlay from '../../components/Overlay'; 
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
const Spacer = ({ children }) => {
  return <View style={styles.spacer}>{children}</View>;
};

Date.prototype.format = function(f) {
  if (!this.valueOf()) return " ";

  var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  var d = this;
   
  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
      switch ($1) {
          case "yyyy": return d.getFullYear();
          case "yy": return (d.getFullYear() % 1000).zf(2); 
          case "MM": return (d.getMonth() + 1).zf(2);
          case "dd": return d.getDate().zf(2);
          case "E": return weekName[d.getDay()];
          case "HH": return d.getHours().zf(2);
          case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
          case "mm": return d.getMinutes().zf(2);
          case "ss": return d.getSeconds().zf(2);
          case "a/p": return d.getHours() < 12 ? "오전" : "오후";
          default: return $1;
      }
  });
};

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

const SignupScreen = () => {


  const { state, onSignup } = useContext(UserContext);
  
  //유효성 검사
  const [isLoading, setIsLoading] = useState(false);
  const [nameValid, setnameValid] = useState(true);
  const [passValid, setpassValid] = useState(true);
  const [passCheckValid, setpassCheckValid] = useState(true);
  const [phoneValid, setphoneValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [birthValid, setBirthValid] = useState(true);
  const [confirmValid, setconfirmValid] = useState(false);
  
  
  
  
  //받아오는 변수
  const [password, setPassword] = useState("");
  const [passwordCheck, setpasswordCheck] = useState("");
  const [name, setname] = useState("");
  const [Phonenum, setPhonenum] = useState("");
  const [birth, setbirth] = useState("");
  const [pi_agreement, setpi_agreement] = useState("");
  const [email, setEmail] = useState("");   
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  
  const { msg } = state;
  
  useEffect(() => {
    setIsLoading(false);    
  }, [msg]);
  
  //날짜 표시하기
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  }

  //날짜 감추기
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
 
  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    if(birth === null){
      setBirthValid(false);
    }  else {
      setBirthValid(true);
    } 
    hideDatePicker(); 
    setbirth(date.format("yyyy-MM-dd"));
  };
  
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
 
  //pass Handler
  const passChangeHandler =(text) =>{
      if(!isPassword(text)){
        setpassValid(false);
      } else {
        setpassValid(true);
      }
    setPassword(text);
  }
  
  //pass CheckHandler 비밀번호 비교 
  const passCheckHandler = (text) => {
    if(text !== password){ 
        console.log('패스워드'+password);
          console.log('패스워드체크'+text); 
         setpassCheckValid(false); 
      } else {
        setpassCheckValid(true); 
      }
      setpasswordCheck(text);
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
  // const [password, setPassword] = useState("");
  // const [passwordCheck, setpasswordCheck] = useState("");
  // const [name, setname] = useState("");
  // const [Phonenum, setPhonenum] = useState("");
  // const [birth, setbirth] = useState("");
  // const [pi_agreement, setpi_agreement] = useState("");
  // const [email, setEmail] = useState("");   
  const onPressCheck = () => {
    if(setname !=null && setPhonenum != null && setbirth != null && setpi_agreement !=null && setEmail !=null) {
      console.log(Phonenum);
      onSignup({email, password, name, Phonenum, birth,pi_agreement}); 
      setIsLoading(true);  
      console.log('여기까지와진다'); 
    } else {
      alert('정확히 입력해 주세요');
    }
  }

  
  return ( 
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>      
    <SafeAreaView style={styles.contentView} forceInset={{ top: 'always' }}>
      <ScrollView style={styles.scrollView}>  
      <View style={styles.containerViews}>
          <Text style={styles.titleView}>회원가입 정보입력</Text>
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
          placeholder="휴대폰번호"          
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
      <TouchableOpacity onPress={showDatePicker}>                
          <Input 
            leftIcon={<FontAwesome name="birthday-cake" size={24} color="black" />}
            placeholder="생년월일을 골라주세요"
            label="Birth"
            labelStyle={{marginLeft:0}}
            inputContainerStyle={{marginRight:15}}
            containerStyle={{marginTop:5}}
            value={birth}    
            editable={false}              
          />                        
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"             
            onConfirm={(date) => handleConfirm(date)}
            onCancel={hideDatePicker}
          /> 
          {!birthValid&& <Text style={styles.innerText}>생년월일을 입력하세요</Text>}
            
    </TouchableOpacity>              
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

            {!nameValid && <Text style={styles.innerText}>올바른 이름 입력해 주세요.</Text>} 

      <Input
            leftIcon={<MaterialCommunityIcons name="form-textbox-password" size={24} color="black" />}
            placeholder="비밀번호(8자 이상 영문, 숫자 조합)"
            label="Password"
            labelStyle={{marginLeft:0}}
            inputContainerStyle={{marginRight:15}}
            containerStyle={{marginTop:5}} 
            secureTextEntry
          //autoCapitalize={false}
          //autoCorrect={false} 
            onChangeText={(text)=> passChangeHandler(text)}
            value={password} 
      />     
      <Input
            label="PasswordCheck"
            labelStyle={{marginLeft:0}}
            inputContainerStyle={{marginRight:15}}
            containerStyle={{marginTop:5}} 
            placeholder="비밀번호 확인"
            secureTextEntry
          //autoCapitalize={false}
          //autoCorrect={false}
            //value={setpasswordCheck}
            onChangeText={(text) => passCheckHandler(text)}
            value={passwordCheck}  
          />           
          {!passCheckValid && <Text style={styles.innerText}>패스워드가 일치하지 않습니다.</Text>}
     
      <BouncyCheckbox
          label="개인정보 수집 및 이용 동의"
          labelStyle={{marginLeft:0}}
          inputContainerStyle={{marginRight:15}}
          containerStyle={{marginTop:5}} 
          size={20} 
          text="개인정보동의요구서"          
          fillColor="#46c3ad"  
          iconStyle={{ borderColor: "#46c3ad" }}
          //autoCapitalize={false} 
          //autoCorrect={false}
          onPress ={setpi_agreement}      
          />  
   
      <Spacer></Spacer>

      <Button title="회원가입" buttonStyle={styles.button} onPress={()=> onPressCheck()}/>  
           
      </View> 
      <Spacer></Spacer>
      <View style={styles.bottomView}>
        <Text style={{ color: '#A7A6A6' }}>Copyright@ 한경기획 2021 </Text>
      </View>
      </ScrollView>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  ); 
};



 
const styles = StyleSheet.create({
  innerText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 12, 
    alignItems: 'center'
  },
  scrollView:{
    marginHorizontal: 15
  },  

  flex:{
    flex:1
  },
  txtInputView: {
    marginTop: 10,
    marginBottom: 10,
  },
  contentView: {
    marginTop: 5,
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  titleView: {
    marginTop:35,
    marginBottom: 35,    
    fontSize: 30,
    color  : "black",
  },
  listView: {
    paddingTop: 20,
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
  button: {
    width: 200,
    height: 40,
    backgroundColor: '#46c3ad',    
    alignSelf: "center", 
    borderRadius: 30 
  },
});

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default SignupScreen;