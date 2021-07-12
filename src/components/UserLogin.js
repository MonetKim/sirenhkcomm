import React, { useState } from "react";
import { View,Text, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard} from "react-native";
import { Input,Button } from "react-native-elements";
import AppButton from "../components/AppButton";
import { navigate } from "../NavigationRef";
import DatePicker from '@dietime/react-native-date-picker';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const Spacer = ({ children }) => {
  return <View style={styles.spacer}>{children}</View>;
};
   
/*
name: '',
email: '',
password: '',
confirm_pass: '',
Phonenum:'',
birth : new Date(),//입력하고
pi_agreement: '',//입력하고
*/
const UserLogin = ({ onSubmit, route, linkText, title, isSignup = false }) => {
  console.log(route+'라우팅');
  const [email, setEmail] = useState("");
  const [id,setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setpasswordCheck] = useState("");
  const [name, setname] = useState("");
  const [Phonenum, setPhonenum] = useState("");
  const [birth, setbirth] = useState("");
  const [pi_agreement, setpi_agreement] = useState("");
  

 
  const addSignUpFields = () => {
    if (isSignup) {
      return ( 
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>             
            {/* <Spacer>
            <Input
              placeholder="아이디(5자 이상, 영문, 숫자 포함)"
              //autoCapitalize={false}
              //autoCorrect={false}
              onChangeText={setId}
            />
          </Spacer> */}
          <Spacer> 
        <Input
          placeholder="이메일"
          //autoCapitalize={false}
          //autoCorrect={false}
          onChangeText={setEmail}
        />
      </Spacer>
      <Spacer> 
        <Input
          placeholder="휴대폰번호"
          secureTextEntry
          //autoCapitalize={false}
          //autoCorrect={false}
          onChangeText={setPhonenum}
        />
      </Spacer>
         <Spacer>
            <Input
              placeholder="이름"
              //autoCapitalize={false}
              //autoCorrect={false}
              onChangeText={setname}
            />
          </Spacer>
          <Spacer>
            <Input
            placeholder="비밀번호(8자 이상)"
            secureTextEntry
          //autoCapitalize={false}
          //autoCorrect={false}
            onChangeText={setPassword}
          />
        </Spacer>
        <Spacer>
            <Input
            placeholder="비밀번호 확인"
            secureTextEntry
          //autoCapitalize={false}
          //autoCorrect={false}
            onChangeText={setpasswordCheck}
          />
        </Spacer>      

      {/* <Spacer>
        <DatePicker 
          mode="date"
          format={"yyyy-mm-dd"}
          placeholder="생년월일"
          secureTextEntry
          autoCapitalize={false}
          autoCorrect={false}
          onChange={setbirth}
        />
      </Spacer> */}

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
        </View>        
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
               <Spacer>
              <Input
              placeholder="이메일"
              //autoCapitalize={false}
              //autoCorrect={false}
              onChangeText={setId}
              />
            </Spacer>
            <Spacer>
            <Input
            placeholder="비밀번호"
            secureTextEntry
          //autoCapitalize={false}
          //autoCorrect={false}
            onChangeText={setPassword}
          />
        </Spacer>    
          </View>
          </TouchableWithoutFeedback>
      );
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View>                        
      {addSignUpFields()}
      <Spacer />
      <AppButton
        height={50}
        title={title}
        onTap={() => onSubmit({ email, id ,password, name, birth, Phonenum, pi_agreement})}
      />
      <Spacer> 
        <Button
          titleStyle={styles.titleStyle}
          type="clear"
          title={linkText}
          onPress={() => navigate(route)} 
        />
      </Spacer>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  txtInputView: {
    marginTop: 10,
    marginBottom: 10,
  },
  spacer: {
    margin: 10,
    marginTop: 20,
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
});

export default UserLogin;
