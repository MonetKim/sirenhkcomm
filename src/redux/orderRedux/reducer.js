import {ADD_ORDERLIST, REMOVE_ORDERLIST , FETCH_ORDER_REQUEST,FETCH_ORDER_SUCCESS ,FETCH_ORDER_FAILURE 
    ,FETCH_ORDERDETAIL_REQUEST, FETCH_ORDERDETAIL_SUCCESS,FETCH_ORDERDETAIL_FAILURE,RESETEVERY
    ,GET_ORDERRESULT_REQUEST,GET_ORDERRESULT_SUCCESS,GET_ORDERRESULT_FAILURE 
    ,GET_ORDERRESULTDETAIL_REQUEST, GET_ORDERRESULTDETAIL_SUCCESS, GET_ORDERRESULTDETAIL_FAILURE} from './type'

const initialstate = {

    count: 350,
    dataOrder: [], //디비에서 아이디맞쳐서갖고옴 ..
    orderid: [],
    orderresult:[],
}

const orderReducer = (state = initialstate, action) => {
    switch (action.type) {
        case RESETEVERY:
            return {
                ...state,
                orderid:state.orderid
            }
        case ADD_ORDERLIST:
            return {
                ...state
            }
        case REMOVE_ORDERLIST:
            return {
                ...state,
                count: state.count - 1
            }
        //-------------------------오더입력하기 및 오더번호갖고오기
        case FETCH_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_ORDER_SUCCESS:
            return {
                ...state,
                orderid: action.payload,
                loading: false,
            }
        case FETCH_ORDER_FAILURE:
            return {
                ...state,
                err: action.payload,
                loading: false,
            }
        //------------------------오더상세 설정하기
        case FETCH_ORDERDETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_ORDERDETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case FETCH_ORDERDETAIL_FAILURE:
            return {
                ...state,
                err: action.payload,
                loading: false,
            }
        //------------------------오더 갖고오기
        case GET_ORDERRESULT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_ORDERRESULT_SUCCESS:
            return {
                ...state,
                dataOrder: action.payload,
                loading: false,
            }
        case GET_ORDERRESULT_FAILURE:
            return {
                ...state,
                err: action.payload,
                loading: false,
            }
            //------------------------오더상세메뉴 갖고오기
        case GET_ORDERRESULTDETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_ORDERRESULTDETAIL_SUCCESS:
            return {
                ...state,
                orderresult: action.payload,
                loading: false,
            }
        case GET_ORDERRESULTDETAIL_FAILURE:
            return {
                ...state,
                err: action.payload,
                loading: false,
            }
        default: return state
    }

}
export default orderReducer;