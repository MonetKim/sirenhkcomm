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
    id,
    name,
    password,
    Phonenum,
    birth, 
    pi_agreement,
    email, 
}) => {
  API.post("user/signup", {
    id,
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
      navigate("homeStack");
    })
    .catch((err) => {
      dispatch({
        type: aType.ERROR,
        payload: "잘못된 비밀번호 입니다",
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
      configureAPI({ token: `Bearer ${response.data}` });
      dispatch({ type: aType.LOGIN, payload: response.data });
      navigate("homeStack"); 
    })
    .catch((err) => {
      dispatch({
        type: aType.ERROR,
        payload: "잘못된 비밀번호 혹은 존재하지 않은 ID입니다",
      });
      navigate("HomeScreen"); 
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
      configureAPI({ token: `Bearer ${response.data}` });
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

const configureAPI = ({ token }) => {
  API.defaults.headers.common["Authorization"] = token;
};

const onCheckLogin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: aType.LOGIN, payload: token });
    navigate("homeStack");
    configureAPI({ token });
  } else {
    navigate("loginStack");
  }
};

const onLogout = (dispatch) => () => {
  navigate("loginStack");
  dispatch({ type: aType.LOGOUT });
}; 
const onDissmiss = (dispatch) => () => {
  dispatch({ type: aType.DISSMISS });
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
