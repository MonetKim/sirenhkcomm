import React,  { useContext, useState, useEffect }  from "react";
import { View,Text, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from "react-native";
import { Input,Button } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { isEmail,isName, PhoneField, isPassword } from "../../utils";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Context as UserContext } from '../../dataStore/userAccessContext';
import { userReducer } from '../../dataStore/userAccessContext';
import DateTimePickerModal from "react-native-modal-datetime-picker";

 
 
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
 

const emailScreen = () => {
     
    const [birthValid, setBirthValid] = useState(true);    
    const [phoneValid, setphoneValid] = useState(true);
    const [nameValid, setnameValid] = useState(true);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const { state, emailFinder,  onDissmiss} = useContext(UserContext);   
    const [isLoading, setIsLoading] = useState(false);    
    const [name, setname] = useState("");
    const [Phonenum, setPhonenum] = useState("");
    const [birth, setbirth] = useState(""); 
    const [message, setMessage] = useState(''); 
    const {msg} = state;
 

 
  //날짜 표시하기     
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  }

  //날짜 감추기
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
   
  const handleConfirm = (date) => {
    
    if(birth === null){
      setBirthValid(false);
    }  else {
      setBirthValid(true);
    } 
    hideDatePicker(); 
    setbirth(date.format("yyyy-MM-dd"));
  };
 
  //휴대폰 검사
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
  
  //이름 Handler
  const nameChangeHandler = (text) =>{     
    if(!isName(text)){  
      setnameValid(false);     
    } else { 
      setnameValid(true);
    }
    setname(text);
  } 
  
  const onPressCheck = () => {
    if(setname !=null && setPhonenum != null && setbirth != null) {
      
      emailFinder({name, Phonenum, birth}); 
      setIsLoading(true); 
        
      alert('회원가입 해주신 이메일로 아이디가 발송되었습니다.'); 
         
      //console.log('이메일파인더'+JSON.stringify());        
    } else {   
      alert('정확히 입력해 주세요'); 
    }
  }
   
  //console.log(UserContext.emailFinder+'유저');
    
    useEffect(() => {
        setIsLoading(false);       
      }, [msg]);   
       
 

    //생년월일 및 광고 배너 등록 예정
    return (
        
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>                                               
        <Spacer>            
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
        </Spacer> 
      
        <Spacer>
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

        </Spacer>

        <Spacer>
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
        </Spacer>

        <Button buttonStyle={styles.button} title={"아이디 찾기"}
          onPress={() => onPressCheck()}                
        />

        
      </View> 
    </TouchableWithoutFeedback>

     );
};

const styles = StyleSheet.create({
    container:{
        marginTop: 50,
        flex:1,

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
        width: 300,
        height: 40,
        backgroundColor: '#46c3ad',    
        alignSelf: "center", 
        borderRadius: 30 
      },
  });
  emailScreen.navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

export default emailScreen;
   