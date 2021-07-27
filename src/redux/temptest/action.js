import { FETCH_COMMENTS,FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS,FETCH_COMMENTS_FAILURE ,TESTING} from './type'
import API from "../../API/WebService";

export const fetchCommentSuccess = (comments) =>{
    return {
        type: FETCH_COMMENTS_SUCCESS,
        payload: comments
    }
}
export const fetchCommentRequest = () =>{
    return {
        type: FETCH_COMMENTS_REQUEST,

    }
}
export const fetchCommentFailure = (error) =>{
    return {
        type: FETCH_COMMENTS_FAILURE,
        payload: error
    }
}
export const testing = () =>{
    return {
        type: TESTING,
    }
}


export const fetchComments =() =>{
    return (dispatch) =>{
        // dispatch(fetchCommentRequest())
        // fetch("http://jsonplaceholder.typicode.com/comments")
        dispatch(fetchCommentRequest())
        API.post("user/login", {
            email:"neidmuya@naver.com",
            password:"1234",
          })
        //.then(response => response.json())
        .then((response) => {
            configureAPI({ token: `Bearer ${response.data}` });
            dispatch(fetchCommentSuccess(response.data))
        })
        
        .catch(error=> dispatch(fetchCommentFailure(error)))
    }
}




export const pushComments =(name,
    password,
    Phonenum,
    birth, 
    pi_agreement,
    email, ) =>{
    return (dispatch) =>{
        // dispatch(fetchCommentRequest())
        // fetch("http://jsonplaceholder.typicode.com/comments")
        dispatch(fetchCommentRequest())
        API.post("user/signup", {    
            name, 
            password, 
            Phonenum,
            birth,
            pi_agreement,
            email, 
          })
        //.then(response => response.json())
        .then((response) => {
            configureAPI({ token: `Bearer ${response.data}` });
            dispatch()
        })
        
        .catch(error=> dispatch(fetchCommentFailure(error)))
    }
}



const configureAPI = ({ token }) => {
    API.defaults.headers.common["Authorization"] = token;
  };