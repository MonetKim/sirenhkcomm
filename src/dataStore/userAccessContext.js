import { AsyncStorage } from "react-native";
import { navigate } from "../NavigationRef"; 
import createAppContext from "../dataStore/createAppContext";
import API from "../API/WebService";
import aType from "../ActionTypes";
import userReducer from "../dataStore/reducer";
 
/**
 * User Actions
 */

/*
name: '',
email: '',
password: '',
confirm_pass: '',
Phonenum:'',
birth : new Date(),//입력하고
pi_agreement: '',//입력하고
*/
const onSignup = (dispatch) => async ({  
    name,
    password,
    Phonenum,
    birth, 
    pi_agreement,
    email, 
}) => {
  API.post("user/signup", {    
    name, 
    password, 
    Phonenum,
    birth,
    pi_agreement,
    email, 
  })
    .then((response) => {
      configureAPI({ token: `Bearer ${response.data}` }); 
      dispatch({ type: aType.LOGIN, payload: response.data });
      navigate("HomeScreen"); 
    })
    .catch((err) => {
      dispatch({ 
        type: aType.ERROR,
        payload: "이미 등록된 이메일 입니다.",
      });
    });
};
//아래 에러 부분 home stack 지우기
const onSignin = (dispatch) => async ({ email, password }) => {
  API.post("user/login", {
    email,
    password,
  })
    .then((response) => {
<<<<<<< HEAD
      configureAPI({ token: `Bearer ${response.data}` }); 
      dispatch({ type: aType.LOGIN, payload: response.data });     
      navigate("HomeScreen");             
=======
      configureAPI({ token: `Bearer ${response.data}` });
      dispatch({ type: aType.LOGIN, payload: response.data });
      navigate("HomeScreen"); 
>>>>>>> 3ccd5dac99017971b55d32032b2acb6acadd9b3f
    })
    .catch((err) => {
      dispatch({
        type: aType.ERROR,
        payload: "잘못된 비밀번호 혹은 존재하지 않은 ID입니다"+err,        
      });
      alert("잘못된 비밀번호 혹은 존재하지 않은 ID입니다"); 
      navigate("LoginScreen"); 
    });
};

//비밀번호 찾기 호출 되는 곳
const PasswordFinder = (dispatch) => async({email,name,password}) => {
  alert('서버 해야해요');
}

//이메일찾기 보내는 곳
const emailFinder = (dispatch) => async (name,Phonenum) => { 
  //alert('성공일껄?');
  //navigate("loginStack");     
  API.post("user/emailfinder", {
    name,
    Phonenum,
  })
  .then((response) => {
      dispatch({ type: aType.EmailFinder });
      navigate("LoginScreen"); 
  })
  .catch((err) => {
    dispatch({
      type: aType.ERROR,
      payload: "존재하지 않은 아이디 입니다"+err,
    });
    navigate("LoginScreen");  
  });
}; 

  
const onLogout = (dispatch) => () => {
  navigate("LoginScreen");
  dispatch({ type: aType.LOGOUT });
}; 
const onDissmiss = (dispatch) => () => {
  dispatch({ type: aType.DISSMISS });
};

const configureAPI = ({ token }) => {
  API.defaults.headers.common["Authorization"] = token;
};
 
const onCheckLogin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: aType.LOGIN, payload: token });
    navigate("HomeScreen");
    configureAPI({ token });
  } else { 
    navigate("LoginScreen");
  }
};



/**
 * Export Methods with Create Context
 */
export const { Provider, Context } = createAppContext(
  userReducer,
  {
    PasswordFinder,
    emailFinder, 
    onCheckLogin,
    onSignup,
    onSignin,
    onLogout,  
    onDissmiss,
  },
  { accessToken: null, msg: null }
);
