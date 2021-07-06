import {ADD_SUBSCRIBER, REMOVE_SUBSCRIBER} from './type'

const initialstate = {

        count : 370
}

const subscriberReducer = (state = initialstate, action) =>{
    switch(action.type){
            case ADD_SUBSCRIBER:
                return {
                    ...state,
                    count: state.count+1
                }
                case REMOVE_SUBSCRIBER:
                    return {
                        ...state,
                        count: state.count-1
                    }
                    default: return state
    }

}
export default subscriberReducer;