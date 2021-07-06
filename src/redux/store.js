import { createStore } from 'redux'
import subscriberReducer from './subscribers/reducera'

export const store = createStore(subscriberReducer)

export default store;