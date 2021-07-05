import React, { useState } from "react";
import { View,Text, StyleSheet, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [Phonenum, setPhonenum] = useState("");
  const [birth, setbirth] = useState("");
  const [pi_agreement, setpi_agreement] = useState("");
 

  const addSignUpFields = () => {
    if (isSignup) {
      return (
        <View>  

<Spacer>
        <Text  style={{ fontSize: 17 }} >개인정보동의요구서</Text>
        <BouncyCheckbox 
          placeholder="개인정보동의요구서"
          secureTextEntry
          autoCapitalize={false}
          autoCorrect={false}
          onPress ={setpi_agreement}
        /> 
      </Spacer>          
        </View>
      );
    }
  };

  return (
    <View>
         <Spacer>
            <Input
              placeholder="이름"
              autoCapitalize={false}
              autoCorrect={false}
              onChangeText={setname}
            />
          </Spacer>

      <Spacer>
        <Input
          placeholder="이메일"
          autoCapitalize={false}
          autoCorrect={false}
          onChangeText={setEmail}
        />
      </Spacer>
      <Spacer>
        <Input
          placeholder="비밀번호"
          secureTextEntry
          autoCapitalize={false}
          autoCorrect={false}
          onChangeText={setPassword}
        />
      </Spacer>
      <Spacer> 
        <Input
          placeholder="휴대폰번호"
          secureTextEntry
          autoCapitalize={false}
          autoCorrect={false}
          onChangeText={setPhonenum}
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

      {addSignUpFields()}
      <Spacer />
      <AppButton
        height={50}
        title={title}
        onTap={() => onSubmit({ email, password, name, birth, Phonenum, pi_agreement})}
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
    fontSize: 18,
    fontWeight: "400",
    color: "#f15b5d",
  },
});

export default UserLogin;
