import React, {useContext, useState ,Component, useEffect} from 'react';
import {
    View,
    Button,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,    
    StyleSheet,
    Platform
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from '@dietime/react-native-date-picker';
import BouncyCheckbox from "react-native-bouncy-checkbox"; 
import { StackActions, NavigationActions } from 'react-navigation';
import { validateEmail, removeWhitespace } from '../../utils';
import axios from 'axios';
//import { response } from 'express';

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
          birth : new Date(),//입력하고
          pi_agreement: '',//입력하고
         // index_id: '', 
          error: false
        };
          
      }     

      //user signup special index
      // handleRegisterIndexId = (text) => {
      //   this.setState({index_id: removeWhitespace(text)});
      // };
 

      //user signup Birth

      componentDidMount(){
        const sites = this.state;
        console.log(JSON.stringify(sites));
        axios.post('https://hkclient.herokuapp.com/user/signup', sites).then(response => console.log('완료'));                
      };

      onChange  = (date) => {
          if(date!=null ){ 
            this.setState({birth: date});     
          }
      };      
    
      // handleRegisterBirth = () => {             
      //   const todayDate = new Date();
      //   todayDate.toISOString();
      //   console.log(todayDate+'시발 왜');
      //   return todayDate;
      // }; 

      // 개인정보 동의 이용서
      handleRegisterCerti = (checkbox) => {
        this.setState({pi_agreement: checkbox});      
      };
 
      handleRegisterName = (text) => {
        this.setState({name: text });
      };
      handleRegisterEmail = (text) => {
          this.setState({ email: text });
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
        headerShown: false,
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
    };
    
      SignupScreens() {       
      console.log('usercontext1');
      const {state, onSignup} = useContext(UserContext);   
      onSignup({name : this.state.name, email: this.state.email, password: this.state.password});  
      console.log('usercontext마지막');
    };    

    register()
    {      
      this.setState({btnText: '회원가입'});       
      this.componentDidMount();
      Alert.alert(
        "회원가입 완료",
        "회원가입을 축하드립니다",        
        [
            {text: '확인', onPress: this._logout.bind(this)},         
        ],
        console.log(this.state.birth+'최종'),        
        //console.log(this.state.birth +'타3'),
        //console.log(this.state.pi_agreement+'타2?')          
      );
    }; 

    

    render(){
        return (
            <View style={styles.flex}>
         
          <ScrollView style={styles.flex}>
            <View>
              <View style={styles.mainContainer}>
                  <View style={styles.title}>
                      <Text style={{ fontSize: 25 }} >회원가입</Text>                          
                  </View>                  

                  <View style={styles.title}>
                      <Text style={{ fontSize: 25 }} ></Text>                          
                  </View>                                                                                

                  <View style={styles.formGroup}>
                      <Text style={{ fontSize: 17 }} >Email</Text>
                      <TextInput style={styles.textInput} placeholder="Email을 입력하세요" onChangeText={(text) => this.handleRegisterEmail(text)} />                                          
                  </View>
                  <View style={styles.formGroup}>
                      <Text style={{ fontSize: 17 }} >이름</Text>                       
                      <TextInput style={styles.textInput} placeholder="이름을 입력하세요" onChangeText={(text) => this.handleRegisterName(text)} />                      
                  </View> 
                  <View style={styles.formGroup}>
                      <Text  style={{ fontSize: 17 }} >생년월일 : {this.state.birth ? this.state.birth.toDateString():"선택 날짜"}</Text>                            
                      <DatePicker mode="date"   format={"yyyy-mm-dd"} fadeColor={"#ddd"} width={"100%"} markColor={"#26a4b5"} height={130} onChange={(value) => this.onChange(value)} value={this.state.birth} />                     
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
                      <TextInput style={styles.textInput} placeholder="핸드폰번호를 입력하세요"  onChangeText={(text) => this.handleRegisterPhonenum(text)}/>
                  </View>
   
                  <View style={styles.checkboxContainer}>
                      <Text  style={{ fontSize: 17 }} >개인정보동의요구서</Text>
                      <BouncyCheckbox style={styles.checkbox} onPress = {(checkbox) => this.handleRegisterCerti(checkbox)}/>
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
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {

  },

  mainContainer: {
      paddingHorizontal: 20,
      paddingVertical: 40,      
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
      flex: 1     
  }
});