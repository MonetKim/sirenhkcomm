import { FETCH_STORES,FETCH_STORES_REQUEST, FETCH_STORES_SUCCESS,FETCH_STORES_FAILURE ,TESTING,GET_DIST} from './type'
import haversine from 'haversine'

const initialState = {
    items: [],
    loading: false,
    temp: 'fuasd',
    err: null,
    storeinfo:[],
    storedist:[],
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
            var curlat = Number(action.payload.coords.latitude);
            var curlon = Number(action.payload.coords.longitude);
            console.log("저기압주의보 모두조심");

            
            return {
                ...state,
                start_lat: curlat,
                start_lon: curlon,
            }
        case GET_DIST:
            //const index = state.dataFood.findIndex(dataFood => dataFood.menu_id == action.payload); //인덱스찾기..
            const newArray = [...state.storeinfo]; //making a new array
            //newArray[index].iscart = true;//changing value in the new array
            //newArray[index].quantity = newArray[index].quantity + 1;  //수량증가
            for (var i = 0; i < newArray.length; i++) {
                

                let a = { latitude: Number(newArray[i].store_lat), longitude: Number(newArray[i].store_lon) }
                let b = { latitude: Number(action.payload.coords.latitude), longitude: Number(action.payload.coords.longitude) }
                
                console.log("오늘은 또 무슨일인거니" + haversine(a, b));


                newArray[i].store_dist = haversine(a, b).toFixed(2);
                //newArray[i].store_dist = action.payload.coords.latitude;

            }

            return {
              ...state,
              storedist: newArray,    //state.dataCart.push(action.payload) // 카트로 값 넘겨주기
            }
        default: return state;
    }

}
export default storeReducer