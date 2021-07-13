import React, {useContext, useState, useEffect} from 'react';
import { View,Text,StyleSheet} from 'react-native';
import { Context as UserContext } from '../../dataStore/userAccessContext';
import { SafeAreaView } from 'react-navigation';
import UserLogin from '../../components/UserLogin';
import Overlay from '../../components/Overlay'; 
import { ScrollView } from 'react-native-gesture-handler';

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
  
  const { msg } = state;

  useEffect(() => {
    setIsLoading(false);
  }, [msg]);

  return (
    <SafeAreaView style={styles.contentView} forceInset={{ top: 'always' }}>
      <ScrollView style={styles.flex}>
      <Overlay isShow={isLoading} />      
      <View style={styles.listView}>
        <UserLogin 
          isSignup={true}
          onSubmit={({ email, password, name, Phonenum,birth,pi_agreement }) => {
            setIsLoading(true);
            onSignup({ email, password, name, Phonenum,birth,pi_agreement });
          }} 
          route="LoginScreen" 
          linkText="이미 계정이 있으신가요? 로그인하기"
          title="회원가입"
        />
      </View>
      <View style={styles.bottomView}>
        <Text style={{ color: '#A7A6A6' }}>Copyright@ 한경기획 2021 </Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  flex:{
    flex:1
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
});

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default SignupScreen;