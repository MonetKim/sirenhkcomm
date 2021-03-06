import {
    ADD_MENUTOCART, REMOVE_MENUTOCART, INC_CARTQUANT, DEC_CARTQUANT, SHOW_MENUDETAIL, INSERT_CART, FETCH_OPTION_REQUEST, FETCH_OPTION_SUCCESS, FETCH_OPTION_FAILURE,
    FETCH_MENULIST, FETCH_MENULIST_REQUEST, FETCH_MENULIST_SUCCESS, FETCH_MENULIST_FAILURE, CHANGE_CATEGORY, REMOVE_ALL_CART, CHANGE_CART_NUM, SET_DATACART,
    FETCH_ROASTING_REQUEST, FETCH_ROASTING_SUCCESS, FETCH_ROASTING_FAILURE,
} from './type'
import API from "../../API/WebService";

export const changeCategory = (item) => {
    return {
        type: CHANGE_CATEGORY,
        payload: item
    }
}
export const addMenuToCart = (item) => {
    return {
        type: ADD_MENUTOCART,
        payload: item
    }
}
export const removeMenuToCart = (item) => {
    return {
        type: REMOVE_MENUTOCART,
        payload: item
    }
}
export const incCartQuant = (item, menu_option_insert, taste_option_insert, add_option_insert) => {
    return {
        type: INC_CARTQUANT,
        payload: item,
        paymenu: menu_option_insert,
        paytaste: taste_option_insert,
        payadd: add_option_insert,
    }
}
export const decCartQuant = (item, menu_option_insert, taste_option_insert, add_option_insert) => {
    return {
        type: DEC_CARTQUANT,
        payload: item,
        paymenu: menu_option_insert,
        paytaste: taste_option_insert,
        payadd: add_option_insert,
    }
}
export const showMenuDetail = (item) => {
    return {
        type: SHOW_MENUDETAIL,
        payload: item
    }
}
export const insertCart = (item) => {
    return {
        type: INSERT_CART,
        payload: item
    }
}

export const removeAllCart = () => {
    return {
        type: REMOVE_ALL_CART,
    }
}

export const changeCartNum = (item, num) => {
    return {
        type: CHANGE_CART_NUM,
        payload: item,
        num: num,
    }
}

//--------------------메뉴 데이터갖고오기 DB
export const fetchMenulistSuccess = (comments) => {
    return {
        type: FETCH_MENULIST_SUCCESS,
        payload: comments
    }
}
export const fetchMenulistRequest = () => {
    return {
        type: FETCH_MENULIST_REQUEST,

    }
}
export const fetchMenulistFailure = (error) => {
    return {
        type: FETCH_MENULIST_FAILURE,
        payload: error
    }
}
//---------------------------------데이터카트 저장하기

export const setDataCart = (item, kind) => {
    return {
        type: SET_DATACART,
        payload: item,
        kind: kind,
    }
}
//--------------------옵션 데이터갖고오기 DB
export const fetchOptionSuccess = (comments) => {
    return {
        type: FETCH_OPTION_SUCCESS,
        payload: comments
    }
}
export const fetchOptionRequest = () => {
    return {
        type: FETCH_OPTION_REQUEST,

    }
}
export const fetchOptionFailure = (error) => {
    return {
        type: FETCH_OPTION_FAILURE,
        payload: error
    }
}
//--------------------로스팅 데이터갖고오기 DB
export const fetchRoastingSuccess = (comments) => {
    return {
        type: FETCH_ROASTING_SUCCESS,
        payload: comments
    }
}
export const fetchRoastingRequest = () => {
    return {
        type: FETCH_ROASTING_REQUEST,

    }
}
export const fetchRoastingFailure = (error) => {
    return {
        type: FETCH_ROASTING_FAILURE,
        payload: error
    }
}

//------------------------------------
//메뉴 갖고오기

export const fetchGetmenus = () => {
    return (dispatch) => {
        // dispatch(fetchCommentRequest())
        // fetch("http://jsonplaceholder.typicode.com/comments")
        dispatch(fetchMenulistRequest())
        API.post("user/menu",)
            //.then(response => response.json())
            .then((response) => {
                configureAPI({ token: `Bearer ${response.data}` });
                dispatch(fetchMenulistSuccess(response.data));
            })

            .catch(error => dispatch(fetchMenulistFailure(error)))
    }
}
//옵션 갖고오기
export const fetchGetOption = () => {
    return (dispatch) => {
        // dispatch(fetchCommentRequest())
        // fetch("http://jsonplaceholder.typicode.com/comments")
        dispatch(fetchOptionRequest())
        API.post("user/option",)
            //.then(response => response.json())
            .then((response) => {
                configureAPI({ token: `Bearer ${response.data}` });
                dispatch(fetchOptionSuccess(response.data));
            })
            .catch(error => dispatch(fetchOptionFailure(error)))
    }
}
//로스팅 갖고오기
export const fetchGetRoasting = (store_id, menu_id) => {
    return (dispatch) => {
        // dispatch(fetchCommentRequest())
        // fetch("http://jsonplaceholder.typicode.com/comments")
        dispatch(fetchRoastingRequest())
        API.post("user/roasting", {    
            store_id, 
            menu_id,
          })
            //.then(response => response.json())
            .then((response) => {
                configureAPI({ token: `Bearer ${response.data}` });
                dispatch(fetchRoastingSuccess(response.data));
            })
            .catch(error => dispatch(fetchRoastingFailure(error)))
    }
}


const configureAPI = ({ token }) => {
    API.defaults.headers.common["Authorization"] = token;
};