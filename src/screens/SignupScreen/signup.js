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
//import DateTimePicker from '@react-native-community/datetimepicker';
//import DateTimePickerModal from 'react-native-modal-datetime-picker';
//import DatePicker from 'react-native-date-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import BouncyCheckbox from "react-native-bouncy-checkbox"; 
//import Toast from 'react-native-simple-toast';
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
          birth: '',//입력하고
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

      onChange  = (event, selectedDate) => {
          const currentDate = selectedDate

          if(currentDate!=null){ 
            this.setState({birth: currentDate.toDateString()}); 
            console.log(this.state.birth+'함수1데이트');
          }
      }; 
      
      handleRegisterBirth = () => {             
        const date = useState(new Date());
        this.setState.birth = date;        
      }; 

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
  }

  // 깃허브테스트 1
    // 레지스터에 진짜 아이디 비번 이름을 추가할 디비에 연동이 구현되어야함
    // btnText: 'Register',
    // name: '',
    // email: '',
    // password: '',
    // confirm_pass: '',
    // Phonenum:'',
    // birth: '',
    // pi_agreement: '',
    // index_id: '',
    // error: false
    register()
    {
      this.setState({btnText: '회원가입'});

      // if(this.state.name.trim() == '' || this.state.name.trim() == null)
      // {
      //   Alert.alert(
      //     "이름을 입력하세요"
      //   );
      //   return true;
      // }

      // if(this.state.pi_agreement == '')
      // {
      //   Alert.alert(
      //     "개인정보동의서를 입력해주세요"
      //   );
      //   return true;
      // }
      
      // if(this.state.birth == '')
      // {
      //   Alert.alert(
      //     "생일을 입력해주세요"
      //   );
      //   return true;
      // }
      // if(this.state.index_id =='' || this.state.index_id == null){
        
      // }
  
      // if(this.state.email.trim() == '' || this.state.email.trim() == null)
      //   {
      //   Alert.alert(
      //     "이메일을 입력하세요"
      //   );
      //   if(!validateEmail(this.state.email)){
      //     Alert.alert(
      //       "이메일형식을 확인하세요"
      //     );
      //     return true;
      //   }
       
      // }
        
      // if(this.state.password.length > 10 && (this.state.password.trim() == '' || this.state.password.trim() == null))
      // {
      //   Alert.alert(
      //     "비밀번호는 8자리 이상 입력하세요"
      //   );
      //   return true;
      // }
  
      // if(this.state.password.length > 10 &&  (this.state.confirm_pass.trim() == '' || this.state.confirm_pass.trim()==null))
      // {
      //   Alert.alert(
      //     "비밀번호 확인을 입력해주세요"
      //   ); 
      //   return true;
      // }

      // if(this.state.password != this.state.confirm_pass)
      // {
      //   Alert.alert(
      //     "비밀번호와 비밀번호 확인이 일치하지 않습니다",
      //   );
      //   return true;
      // }
      
      Alert.alert(
        "회원가입 완료",
        "회원가입을 축하드립니다",        
        [
            {text: '확인', onPress: this._logout.bind(this)},
        ],
        //console.log(this.state.name +'타?'),
        //console.log(this.state.birth +'타3'),
        //console.log(this.state.pi_agreement+'타2?') 
      )
    
    }
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
                      <Text  style={{ fontSize: 17 }} >생년월일</Text>                      
                      <TouchableOpacity>
                      <DateTimePicker locale="ko-ko" mode="date" onChange={this.onChange} value={this.handleRegisterBirth}/>                     
                      </TouchableOpacity> 
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