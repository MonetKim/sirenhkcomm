import { combineReducers } from 'redux'
import orderReducer from '../redux/orderRedux/reducer'
import menuReducer from '../redux/menuRedux/reducer'
import commnetsReducer from '../redux/temptest/reducer'

 const rootReducer = combineReducers({
    orderReducer: orderReducer,
    menuReducer : menuReducer,
    commnetsReducer: commnetsReducer,
})

export default rootReducer