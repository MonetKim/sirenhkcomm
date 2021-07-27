import { FETCH_STORES,FETCH_STORES_REQUEST, FETCH_STORES_SUCCESS,FETCH_STORES_FAILURE ,TESTING} from './type'
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
export const testing = (lat,lon) =>{
    return {
        type: TESTING,
        payload_lat: lat,
        payload_lon: lon,
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