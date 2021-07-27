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
     
            return {
                ...state
            }
        default: return state;
    }

}
export default commnetsReducer