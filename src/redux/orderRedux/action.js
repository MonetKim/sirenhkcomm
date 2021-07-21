import {ADD_ORDERLIST, REMOVE_ORDERLIST , FETCH_ORDER_REQUEST,FETCH_ORDER_SUCCESS ,FETCH_ORDER_FAILURE 
        ,FETCH_ORDERDETAIL_REQUEST, FETCH_ORDERDETAIL_SUCCESS,FETCH_ORDERDETAIL_FAILURE,RESETEVERY
        ,GET_ORDERRESULT_REQUEST,GET_ORDERRESULT_SUCCESS,GET_ORDERRESULT_FAILURE 
        ,GET_ORDERRESULTDETAIL_REQUEST, GET_ORDERRESULTDETAIL_SUCCESS, GET_ORDERRESULTDETAIL_FAILURE} from './type'
import API from "../../API/WebService";


export const addDataorder =() =>{
    return {
        type: ADD_ORDERLIST
    }
}
export  const removeDataorder  =() =>{
    return {
        type: REMOVE_ORDERLIST
    }
}
export  const resetevery  =() =>{
    return {
        type: RESETEVERY,
    }
}
//----------------------오더화면 저장하기
export  const fetchOrderRequest  =() =>{
    return {
        type: FETCH_ORDER_REQUEST
    }
}
export  const fetchOrderSuccess  =(item) =>{
    return {
        type: FETCH_ORDER_SUCCESS,
        payload :item
    }
}
export  const fetchOrderFailure  =() =>{
    return {
        type: FETCH_ORDERDETAIL_FAILURE
    }
}

//-------------------오더상세화면 저장하기
export  const fetchOrderDetailRequest  =() =>{
    return {
        type: FETCH_ORDERDETAIL_REQUEST
    }
}
export  const fetchOrderDetailSuccess  =(item) =>{
    return {
        type: FETCH_ORDERDETAIL_SUCCESS,
        payload :item
    }
}
export  const fetchOrderDetailFailure  =() =>{
    return {
        type: FETCH_ORDER_FAILURE
    }
}
//-------------------주문확정 오더아이디갖고오기화면
export  const fetchOrderResultRequest  =() =>{
    return {
        type: GET_ORDERRESULT_REQUEST
    }
}
export  const fetchOrderResultSuccess  =(item) =>{
    return {
        type: GET_ORDERRESULT_SUCCESS,
        payload :item
    }
}
export  const fetchOrderResultFailure  =() =>{
    return {
        type: GET_ORDERRESULT_FAILURE
    }
}
//---------주문내역 상세항목--------------------
export  const fetchOrderResultDetailRequest  =() =>{
    return {
        type: GET_ORDERRESULTDETAIL_REQUEST
    }
}
export  const fetchOrderResultDetailSuccess  =(item) =>{
    return {
        type: GET_ORDERRESULTDETAIL_SUCCESS,
        payload :item
    }
}
export  const fetchOrderResultDetailFailure  =() =>{
    return {
        type: GET_ORDERRESULTDETAIL_FAILURE
    }
}
//-------------------주문입력
export const pushOrders =(user_id,
    store_id,
    totalprice,
    ischeck,  ) =>{
    return (dispatch) =>{
        // dispatch(fetchCommentRequest())
        
        // fetch("http://jsonplaceholder.typicode.com/comments")
        dispatch(fetchOrderRequest())
        API.post("user/order", {    
            user_id, 
            store_id, 
            totalprice,
            ischeck,
          })
        //.then(response => response.json())
        .then((response) => {
            configureAPI({ token: `Bearer ${response.data}` });
            dispatch(fetchOrderSuccess(response.data))
<<<<<<< HEAD
            //dispatch(pushOrderDetails(response.data[0].order_id,1,50000,30 ))
=======
>>>>>>> bc32b9bb020c66c481272dd3291e1b519df749b3
        })
        
        .catch(error=> dispatch(fetchOrderFailure(error)))
    }
}
//--------------주문 상세입력
export const pushOrderDetails =(
    user_id,
    menu_id,
    menu_price,
    quantity  ) =>{
    return (dispatch) =>{
<<<<<<< HEAD

=======
>>>>>>> bc32b9bb020c66c481272dd3291e1b519df749b3
        // dispatch(fetchCommentRequest())
        // fetch("http://jsonplaceholder.typicode.com/comments")
        dispatch(fetchOrderDetailRequest())
        API.post("user/orderdetail", {    
           
            user_id, 
            menu_id,
            menu_price,
            quantity
          })
        //.then(response => response.json())
        .then((response) => {
            configureAPI({ token: `Bearer ${response.data}` });
            dispatch(fetchOrderDetailSuccess(response.data))
        })
        
        .catch(error=> dispatch(fetchOrderDetailFailure(error)))
    }
}
//-------------------주문아이디갖고오기
export const getOrderresults =(user_id  ) =>{
    return (dispatch) =>{
        dispatch(fetchOrderResultRequest())
        API.post("/user/orderresult", {    
            user_id, 
          })
        .then((response) => {
            configureAPI({ token: `Bearer ${response.data}` });
            dispatch(fetchOrderResultSuccess(response.data))
        })
        
        .catch(error=> dispatch(fetchOrderResultFailure(error)))
    }
}

//-------------------주문아이디별 상세메뉴명 갖고오기
export const getOrderresultsDetail =(user_id ) =>{
    return (dispatch) =>{
        
    console.log('시작하고잇는거맞냐 ㅅㅂ   ')
        dispatch(fetchOrderResultDetailRequest())
        API.post("/user/orderresultdetail", {    
            user_id, 
          })
        .then((response) => {
            configureAPI({ token: `Bearer ${response.data}` });
            dispatch(fetchOrderResultDetailSuccess(response.data))
            console.log('아무것도s   '+JSON.stringify(token))
            console.log('안나오는건데   ')
        })
        
        .catch(error=> dispatch(fetchOrderResultDetailFailure(error)))
    }
}



const configureAPI = ({ token }) => {
    API.defaults.headers.common["Authorization"] = token;
  };