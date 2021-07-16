import React, { useState } from "react";
import { View, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard} from "react-native";
import { Input,Button } from "react-native-elements";
import AppButton from "../components/AppButton";
import { navigate } from "../NavigationRef";
import DatePicker from '@dietime/react-native-date-picker';
import {useForm, FormProvider} from "react-hook-form";
import { isEmail } from "../utils";
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
 
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");   

      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
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
            placeholder="비밀번호"
            secureTextEntry
          //autoCapitalize={false}
          //autoCorrect={false}
            onChangeText={setPassword}
          />
          </Spacer> 
          <AppButton
            height={50}
            title={title}
            onTap={() => onSubmit({ email, password})}
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
    } 


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
    fontWeight: "bold",
    color: "black",
  },
  BouncyCheckbox:{
    height: 40, 
    width:40
  },
});

export default UserLogin;
