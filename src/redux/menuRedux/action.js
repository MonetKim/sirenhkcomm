import { ADD_MENUTOCART, REMOVE_MENUTOCART, INC_CARTQUANT, DEC_CARTQUANT, SHOW_MENUDETAIL ,
    FETCH_MENULIST,FETCH_MENULIST_REQUEST,FETCH_MENULIST_SUCCESS,FETCH_MENULIST_FAILURE} from './type'
    import API from "../../API/WebService";

export const addMenuToCart = (item) => {
    return {
        type: ADD_MENUTOCART,
        payload: item
    }
}
export const removeMenuToCart = () => {
    return {
        type: REMOVE_MENUTOCART
    }
}
export const incCartQuant = (item) => {
    return {
        type: INC_CARTQUANT,
        payload: item
    }
}
export const decCartQuant = (item) => {
    return {
        type: DEC_CARTQUANT,
        payload: item
    }
}
export const showMenuDetail = (item) => {
    return {
        type: SHOW_MENUDETAIL,
        payload: item
    }
}

//--------------------데이터갖고오기 DB
export const fetchMenulistSuccess = (comments) =>{
    return {
        type: FETCH_MENULIST_SUCCESS,
        payload: comments
    }
}
export const fetchMenulistRequest = () =>{
    return {
        type: FETCH_MENULIST_REQUEST,

    }
}
export const fetchMenulistFailure = (error) =>{
    return {
        type: FETCH_MENULIST_FAILURE,
        payload: error
    }
}
//------------------------------------


export const fetchGetmenus =() =>{
    return (dispatch) =>{
        console.log('@^^^^^^^^^^^^^^^^')
        // dispatch(fetchCommentRequest())
        // fetch("http://jsonplaceholder.typicode.com/comments")
        dispatch(fetchMenulistRequest())
        API.post("user/menu", )
        //.then(response => response.json())
        .then((response) => {
            configureAPI({ token: `Bearer ${response.data}` });
            dispatch(fetchMenulistSuccess(response.data))
        })
        
        .catch(error=> dispatch(fetchMenulistFailure(error)))
    }
}

const configureAPI = ({ token }) => {
    API.defaults.headers.common["Authorization"] = token;
  };