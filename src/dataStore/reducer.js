import { AsyncStorage } from "react-native";
import aType from "../ActionTypes";

/**
 * Reducer
 */
const userReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case aType.LOGIN:
      saveToken(action.payload);
      return { ...state, token: action.payload };
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
      };     
    case aType.EmailFinder:
        return {
          ...state, 
          finder: action.payload,
        };  
    case aType.PasswordFinder:
        return {
          ...state,
          passfinder: action.payload, 
        };   
    default:
      return state;
  }
};

const saveToken = async (token) => {
  await AsyncStorage.setItem("token", `Bearer ${token}`);
};

const clearStorage = async () => {
  await AsyncStorage.clear();
};

export default userReducer;
