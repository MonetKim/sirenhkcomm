import { createStore , applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

const middleware = [thunk]


export const store = createStore(rootReducer ,applyMiddleware(...middleware))

export default store;