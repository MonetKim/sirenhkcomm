import { combineReducers } from 'redux'
import subscriberReducer from './subscribers/reducera'
import menuReducer from './menuRedux/reducer'


 const rootReducer = combineReducers({
    subscriberReducer: subscriberReducer,
    menuReducer : menuReducer,
})

export default rootReducer