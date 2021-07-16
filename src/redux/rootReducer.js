import { combineReducers } from 'redux'
import subscriberReducer from './subscribers/reducera'
import menuReducer from '../redux/menuRedux/reducer'
import commnetsReducer from '../redux/temptest/reducer'

 const rootReducer = combineReducers({
    subscriberReducer: subscriberReducer,
    menuReducer : menuReducer,
    commnetsReducer: commnetsReducer,
})

export default rootReducer