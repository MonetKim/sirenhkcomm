import {ADD_ORDERLIST, REMOVE_ORDERLIST , FETCH_ORDER_REQUEST,FETCH_ORDER_SUCCESS ,FETCH_ORDER_FAILURE 
        ,FETCH_ORDERDETAIL_REQUEST, FETCH_ORDERDETAIL_SUCCESS,FETCH_ORDERDETAIL_FAILURE,RESETEVERY
        ,GET_ORDERRESULT_REQUEST,GET_ORDERRESULT_SUCCESS,GET_ORDERRESULT_FAILURE } from './type'
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
//----------------------오더화면
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

//-------------------오더상세화면
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



export const pushOrders =(user_id,
    store_id,
    totalprice,
    ischeck,  ) =>{
    return (dispatch) =>{
        console.log('잘가세요 와~~~      '+user_id)
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
            console.log('여러분의 화려했던   '+response.data[0].order_id)
            dispatch(fetchOrderSuccess(response.data))
            console.log(response.data[0].order_id+ '          꺵꺵꺵꺠꺵꺵꺵꺠꺵꺵꺵꺠꺵꺵꺵꺠꺵꺵꺵꺠   '+JSON.stringify(response.data))
            //dispatch(pushOrderDetails(response.data[0].order_id,1,50000,30 ))
        })
        
        .catch(error=> dispatch(fetchOrderFailure(error)))
    }
}
export const pushOrderDetails =(order_id,
    user_id,
    menu_id,
    menu_price,
    quantity  ) =>{
    return (dispatch) =>{
        console.log(menu_price+'  뚜뚜뚜뚜뚜뚜ㅜ뚜뚜뚜뚜뚜뚜뚜뚜뚜뚜      '+order_id)
        // dispatch(fetchCommentRequest())
        // fetch("http://jsonplaceholder.typicode.com/comments")
        dispatch(fetchOrderDetailRequest())
        API.post("user/orderdetail", {    
            order_id, 
            user_id, 
            menu_id,
            menu_price,
            quantity
          })
        //.then(response => response.json())
        .then((response) => {
            configureAPI({ token: `Bearer ${response.data}` });
            dispatch(fetchOrderDetailSuccess(response.data))
            console.log('미쳤다!미쳤다!미쳤다!미쳤다!미쳤다!미쳤다!미쳤다!미쳤다!미쳤다!미쳤다!미쳤다!      '+response.data)
        })
        
        .catch(error=> dispatch(fetchOrderDetailFailure(error)))
    }
}

export const getOrderresults =(user_id  ) =>{
    return (dispatch) =>{
        dispatch(fetchOrderResultRequest())
        API.post("/user/orderresult", {    
            user_id, 
          })
        .then((response) => {
            configureAPI({ token: `Bearer ${response.data}` });
            dispatch(fetchOrderResultSuccess(response.data))
            console.log('뎃이즈   '+JSON.stringify(response.data))
        })
        
        .catch(error=> dispatch(fetchOrderResultFailure(error)))
    }
}






const configureAPI = ({ token }) => {
    API.defaults.headers.common["Authorization"] = token;
  };