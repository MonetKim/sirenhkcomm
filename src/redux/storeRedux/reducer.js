import { FETCH_STORES,FETCH_STORES_REQUEST, FETCH_STORES_SUCCESS,FETCH_STORES_FAILURE ,TESTING} from './type'

const initialState = {
    items: [],
    loading: false,
    temp: 'fuasd',
    err: null,
    storeinfo:[],
    start_lat: 37.532600,
    start_lon: 127.024612,
}

const storeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STORES_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_STORES_SUCCESS:
            return {
                ...state,
                storeinfo: action.payload,
                loading: false,
            }
        case FETCH_STORES_FAILURE:
            return {
                ...state,
                err: action.payload,
                loading: false,
            }
        case TESTING:
            return {
                ...state,
               // start_lat: action.payload_lat,
              //  start_lon: action.payload_lon,
            }
        default: return state;
    }

}
export default storeReducer