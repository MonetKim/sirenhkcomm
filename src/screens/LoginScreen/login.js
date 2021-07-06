import React, { useContext, useState, useEffect } from 'react'
import {View,StyleSheet,Alert,Dimensions, Tou} from 'react-native';
import { Text } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Video} from "expo-av";
import { Context as UserContext } from '../../dataStore/userAccessContext';
import UserLogin from '../../components/UserLogin';
import Overlay from '../../components/Overlay';
   

const { width, height } = Dimensions.get("window");
const LoginScreen = () => {
    const { state, onSignin, onDissmiss } = useContext(UserContext);

    const { msg } = state;
  
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        showAlert();
        setIsLoading(false);
      }, [msg]);
      const showAlert = () => {
        if (msg !== null) {  
          Alert.alert(
            '로그인 시도 중',
            `${msg}`, 
            [{ text: 'Okay', onPress: () => onDissmiss }],
            {
              cancelable: false,
            }
          );
        }
      };        
    return (               
        <View style={styles.container}>
        <Overlay isShow={isLoading} />            
        <Video
        source={require("../../../assets//video/hksample.mp4")}
        //source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping        
        style={styles.backgroundVideo}
        />         
        <View style={styles.titleArea}>
            <Text style={styles.title}>파란만잔</Text>
        </View>
        <View style={styles.formArea}>
        <UserLogin 되는 코드 삭제 금지
         isSignup={false}
         onSubmit={({ email, password }) => {
            setIsLoading(true);
            onSignin({ email, password });
          }} 
          route="SignupScreen"
          linkText="회원 가입"
          title="로그인"
          />         
        </View>        
    </View>   
        );
};

const styles = StyleSheet.create({
    backgroundVideo: {
        height: height,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
      },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
        justifyContent: 'center',
    },
    titleArea: {
        width: '100%',
        padding: wp('10%'),
        alignItems: 'center',
    },
    titlesign: {
        width: '100%',
        padding: wp('10%'),
        alignItems: 'center',
    },
    title: {
        fontSize: wp('10%'),
    },
    sign: {
        fontSize: wp('5%'),
    },
    formArea: {
        width: '100%',
        paddingBottom: wp('10%'),
    },
    textForm: {
        borderWidth: 0.5,
        borderColor: '#888',
        width: '100%',
        height: hp('5%'),
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 5,
    },
    buttonArea: {
        width: '100%',
        height: hp('5%'),
    },
    button: {
        backgroundColor: "#46c3ad",
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        color: 'white',
    },
});
LoginScreen.navigationOptions = () => {
    return {
      headerShown: false,
    };
  };
  
  export default LoginScreen;
