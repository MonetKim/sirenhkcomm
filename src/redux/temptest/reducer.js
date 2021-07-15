import { fetchCommentSuccess } from './action';
import { FETCH_COMMENTS, FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAILURE, TESTING } from './type'

const initialState = {
    items: [],
    loading: false,
    temp: 'fuasd',
    err: null
}

const commnetsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COMMENTS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_COMMENTS_SUCCESS:
            return {
                ...state,
                items: action.payload,
                loading: false,
            }
        case FETCH_COMMENTS_FAILURE:
            return {
                ...state,
                err: action.payload,
                loading: false,
            }
        case TESTING:
            const newArray = [...state.items]; //making a new array
            newArray[0].name ="집갈래";  //수량증가

            return {
                ...state,
                items: newArray,    //state.dataCart.push(action.payload) // 카트로 값 넘겨주기
            }
        default: return state;
    }

}
export default commnetsReducer