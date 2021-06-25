import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import { StackActions, NavigationActions } from 'react-navigation';
import { validateEmail, removeWhitespace } from '../../utils';



export default class SignupScreen extends Component{
    
    //--DB에 연동해줄 변수명들과 변수 설정함수
    constructor(props) {
        super(props);
        this.state = {
          btnText: 'Register',
          name: '',
          email: '',
          password: '',
          confirm_pass: '',
          Phonenum:'',
          error: false
        };
      }
    
      handleRegisterName = (text) => {
        this.setState({ name: text });
      };
    
      handleRegisterEmail = (text) => {
          this.setState({ email: removeWhitespace(text) });
      };
    
      handleRegisterPassword = (text) => {
          this.setState({ password: text });
      };
    
      handleConfirmPassword = (text) => {
          this.setState({ confirm_pass: text });
      };
     
      handleRegisterPhonenum = (text) => {
        this.setState({ Phonenum: text });
      };


      //-----------------------

    static navigationOptions = {
        header: null,
    };


    // 회원가입완료
    
    _logout(){
      const resetAction = StackActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName: 'TabNavigator' })],
          //actions: [NavigationActions.navigate({ routeName: 'SomethingScreen' })],
      });
      this.props.navigation.dispatch(resetAction);
  }


    // 레지스터에 진짜 아이디 비번 이름을 추가할 디비에 연동이 구현되어야함
    register()
    {
      this.setState({btnText: '회원가입'});

      if(this.state.name == '')
      {
        Toast.showWithGravity(
          "이름을 입력하세요",
          Toast.SHORT,
          Toast.CENTER
        );
        return true;
      }
  
      if(this.state.email == '')
      {
        Toast.showWithGravity(
          "이메일을 입력하세요",
          Toast.SHORT,
          Toast.CENTER
        );
        return true;
      }
      if (!validateEmail(this.state.email)) {
        Toast.showWithGravity(
          "이메일 형식을 확인해주세요",
          Toast.SHORT,
          Toast.CENTER
        );
        return true;
      }
  
      if(this.state.password == '')
      {
        Toast.showWithGravity(
          "비밀번호를 입력하세요",
          Toast.SHORT,
          Toast.CENTER
        );
        return true;
      }
  
      if(this.state.confirm_pass == '')
      {
        Toast.showWithGravity(
          "비밀번호 확인을 입력하세요",
          Toast.SHORT,
          Toast.CENTER
        );
        return true;
      }
  
      // if(this.state.password.length < 8)
      // {
      //   Toast.showWithGravity(
      //     "비밀번호는 8자리 이상이여야 합니다",
      //     Toast.SHORT,
      //     Toast.CENTER
      //   );
      //   return true;
      // }
  
      if(this.state.password != this.state.confirm_pass)
      {
        Toast.showWithGravity(
          "비밀번호와 비밀번호 확인이 일치하지 않습니다",
          Toast.SHORT,
          Toast.CENTER
        );
        return true;
      }
      
      Alert.alert(
        "회원가입 완료",
        "회원가입을 축하드립니다",
        [
            {text: '확인', onPress: this._logout.bind(this)},
        ],
     )
      //this.props.navigation.navigate('LoginScreen');
      // this.setState({
      //   btnText: '잠시만 기다려주세요'
      // });
    }_

    

    render(){
        return (
            <View style={styles.flex}>
         
          <ScrollView style={styles.flex}>
            <View>
              <View style={styles.mainContainer}>
                  <View style={styles.title}>
                      <Text   style={{ fontSize: 25 }} >회원가입</Text>
                  </View>
                  <View style={styles.formGroup}>
                      <Text   style={{ fontSize: 17 }} >Email</Text>
                      <TextInput style={styles.textInput} placeholder="Email을 입력하세요" onChangeText={(text) => this.handleRegisterEmail(text)} />
                  </View>
                  <View style={styles.formGroup}>
                      <Text   style={{ fontSize: 17 }} >이름</Text>
                      <TextInput style={styles.textInput} placeholder="이름을 입력하세요" onChangeText={(text) => this.handleRegisterName(text)}/>
                  </View>
                  <View style={styles.formGroup}>
                      <Text   style={{ fontSize: 17 }} >비밀번호</Text>
                      <TextInput style={styles.textInput} placeholder="비밀번호를 입력하세요" secureTextEntry={true} onChangeText={(text) => this.handleRegisterPassword(text)}/>
                  </View>
                  <View style={styles.formGroup}>
                      <Text  style={{ fontSize: 17 }} >비밀번호 확인</Text>
                      <TextInput style={styles.textInput} placeholder="비밀번호를 다시 입력하세요" secureTextEntry={true} onChangeText={(text) => this.handleConfirmPassword(text)}/>
                  </View>
                  <View style={styles.formGroup}>
                      <Text  style={{ fontSize: 17 }} >핸드폰번호</Text>
                      <TextInput style={styles.textInput} placeholder="핸드폰번호를 입력하세요" secureTextEntry={true} onChangeText={(text) => this.handleRegisterPhonenum(text)}/>
                  </View>
                  <TouchableOpacity style={styles.btn} onPress={() => this.register()}>
                      <Text style= {{ fontSize: 20 , color : '#fff'}}  >회원가입</Text>
                  </TouchableOpacity>
                  <View>
                      <TouchableOpacity style={styles.textCenter} onPress={() => this.props.navigation.navigate('LoginScreen')}>
                          <Text style={{ fontSize: 20}, {color : "#666"}}  >기존 아이디로 로그인 하시겠습니까?</Text>
                      </TouchableOpacity>
                  </View>
              </View>
            </View>
          </ScrollView>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  }, 
  mainContainer: {
      paddingHorizontal: 20,
      paddingVertical: 40
  },
  textInput: {
      borderWidth: 1,
      borderColor: '#ddd',
      paddingVertical: 20,
      borderRadius: 5,
      paddingHorizontal: 20,
      marginTop: 10
  },
  formGroup: {
      marginBottom: 20
  },
  title: {
      marginBottom: 7
  },
  btn: {
      alignItems: 'center',
      backgroundColor: '#C01C27',
      paddingVertical: 20,
      borderRadius: 5
  },
  textCenter: {
      alignItems: 'center',
      marginTop: 20
  },
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});