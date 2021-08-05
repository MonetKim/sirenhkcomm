//import { AsyncStorage } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import aType from "../ActionTypes";
 
/**
 * Reducer
 */
const userReducer = (state, action) => {
  
  switch (action.type) {
    case aType.LOGIN:
      saveToken(action.payload);
      
      return { ...state, msg:action.payload, token: action.payload };
    case aType.LOGOUT: 
      clearStorage();
      return { token: null, msg: null, state };         
    case aType.ERROR:
      return { 
        ...state,
        msg: action.payload,
      };
    case aType.DISSMISS:
      return {
        ...state,
        msg: null,
        token: null,
      };     
    case aType.EmailFinder:          
        return { ...state, msg: action.payload, token: action.payload};  
    
    case aType.PasswordFinder:           
        return { ...state, msg: action.payload, token: action.payload};  
                  
    case aType.EmailCheck: 
        return {
          ...state,
          msg: action.payload,
          token: action.payload, 
        };   
    default:
      return state;
  }
};

const saveToken = async (token) => {
  console.log(token+'토큰이니');  
  await AsyncStorage.setItem("token", `Bearer ${token}`);
};
 
const clearStorage = async () => {
  await AsyncStorage.clear();
};

export default userReducer;
