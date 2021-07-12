import {ADD_SUBSCRIBER, REMOVE_SUBSCRIBER} from './type'

const initialstate = {

        count : 350,
        dataOrder: [
            {
                orderid: 1,
                storename:'파란만잔 강남점',
                title: 'aaaa',
                totalprice: 27000,
                preview : 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
                quantity : 1,
                orderDate : new Date(),
              },
              {
                orderid: 2,
                storename:'파란만잔 상암점',
                title: 'bbbb',
                totalprice: 15000,
                preview : 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
                quantity : 1,
                orderDate : new Date(),
              },
          ], //디비에서 아이디맞쳐서갖고옴 ..
}

const subscriberReducer = (state = initialstate, action) => {
    switch (action.type) {
        case ADD_SUBSCRIBER:
            return {
                ...state,
                dataOrder: dataOrder
            }
        case REMOVE_SUBSCRIBER:
            return {
                ...state,
                count: state.count - 1
            }
        default: return state
    }

}
export default subscriberReducer;