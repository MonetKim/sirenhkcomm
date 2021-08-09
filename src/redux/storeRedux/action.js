import { FETCH_STORES,FETCH_STORES_REQUEST, FETCH_STORES_SUCCESS,FETCH_STORES_FAILURE ,TESTING, GET_DIST,SET_CUR_STORE_INFO,SHOW_STORE_DETAIL} from './type'
import API from "../../API/WebService";

export const fetchStoreSuccess = (stores) =>{
    return {
        type: FETCH_STORES_SUCCESS,
        payload: stores
    }
}
export const fetchStoreRequest = () =>{
    return {
        type: FETCH_STORES_REQUEST,

    }
}
export const fetchStoreFailure = (error) =>{
    return {
        type: FETCH_STORES_FAILURE,
        payload: error
    }
}
export const testing = (loca) =>{
    return {
        type: TESTING,
        payload: loca, 
    }
}
export const getdist = (dist) =>{
    return {
        type: GET_DIST,
        payload: dist,
    }
}
export const SetCurStoreInfo = (item) =>{
    return {
        type: SET_CUR_STORE_INFO,
        payload: item,
    }
}
export const showStoreDetail = (item) =>{
    return {
        type: SHOW_STORE_DETAIL,
        payload: item,
    }
}


export const fetchStores =() =>{
    return (dispatch) =>{
        
        // dispatch(fetchCommentRequest())
        // fetch("http://jsonplaceholder.typicode.com/comments")
        dispatch(fetchStoreRequest())
        API.post("/user/store", {
          })
        //.then(response => response.json())
        .then((response) => {
            configureAPI({ token: `Bearer ${response.data}` });
            dispatch(fetchStoreSuccess(response.data))
        })
        
        .catch(error=> dispatch(fetchStoreFailure(error)))
    }
}


const configureAPI = ({ token }) => {
    API.defaults.headers.common["Authorization"] = token;
  };