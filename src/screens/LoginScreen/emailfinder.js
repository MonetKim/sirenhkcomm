import React,  { useContext, useState, useEffect }  from "react";
import { View,Text, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard} from "react-native";
import { Input,Button } from "react-native-elements";
import AppButton from "../../components/AppButton";
import Overlay from '../../components/Overlay';
import { Context as UserContext } from '../../dataStore/userAccessContext';
const Spacer = ({ children }) => {
  return <View style={styles.spacer}>{children}</View>;
};
 

const emailScreen = () => {
    
    const { state, emailFinder, onDissmiss} = useContext(UserContext);
    const { msg } = state;
    const [isLoading, setIsLoading] = useState(false);    
    const [name, setname] = useState("");
    const [Phonenum, setPhonenum] = useState("");
    const [birth, setbirth] = useState(""); 
        
 
    useEffect(() => {
        setIsLoading(false);
        //showAlert();
      }, [msg]);

    //생년월일 및 광고 배너 등록 예정
    return (
        
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>                                    
            <Overlay isShow={isLoading} />   
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
          placeholder="휴대폰번호"
          //autoCapitalize={false}
          //autoCorrect={false}
          onChangeText={setPhonenum}
          />
        </Spacer>  
        <Button buttonStyle={styles.button} title={"아이디 찾기"}
          onPress={() => emailFinder({name,Phonenum}, setIsLoading(true), alert('회원가입 해주신 이메일로 아이디가 발송되었습니다.'))          
        }                
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
   