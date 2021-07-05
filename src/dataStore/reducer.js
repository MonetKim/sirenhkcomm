//import { AsyncStorage } from "react-native";
import { useReducer, useEffect, useCallback } from "react";
import aType from "../ActionTypes";
 
/**
 * Reducer
 */
function userReducer(state, action){
  console.log(action);
  switch (action.type) {
      case 'LOADING':
        return{
          loading:true,
          data:null,
          error:null
        };
      case 'SUCCESS':
        return{
          loading:true,
          data:action.data,
          error:null
        };
      case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
        default:
        throw new Error(`처리 불가능 타입 :'${action.type}`);
  }
};

export default userReducer;
