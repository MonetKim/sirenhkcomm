import { ADD_MENUTOCART, REMOVE_MENUTOCART ,INC_CARTQUANT ,DEC_CARTQUANT, SHOW_MENUDETAIL} from './type'

const initialstate = {

  dataFood: [
    {
      id: 1,
      title: 'aaaa',
      price: 7000,
      preview: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
      quantity: 0,
      iscart: false
    },
    {
      id: 2,
      title: 'bbbb',
      price: 5000,
      preview: 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
      quantity: 0,
      iscart: false
    },
    {
      id: 3,
      title: 'aaaa',
      price: 7000,
      preview: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
      quantity: 0,
      iscart: false
    },
    {
      id: 4,
      title: 'bbbb',
      price: 5000,
      preview: 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
      quantity: 0,
      iscart: false
    },
    {
      id: 5,
      title: 'aaaa',
      price: 7000,
      preview: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
      quantity: 0,
      iscart: false

    },
    {
      id: 6,
      title: 'bbbb',
      price: 5000,
      preview: 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
      quantity: 0
    },
    {
      id: 7,
      title: 'aaaa',
      price: 7000,
      preview: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
      quantity: 0,
      iscart: false
    },
    {
      id: 8,
      title: 'bbbb',
      price: 5000,
      preview: 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
      quantity: 0,
      iscart: false
    },

  ],
  count: 100,
  dataMenudetail: [],
  temp: '   @@Test@@',
}

const menuReducer = (state = initialstate, action) => {
  switch (action.type) {
    case ADD_MENUTOCART:
       const index = state.dataFood.findIndex(dataFood => dataFood.id == action.payload); //인덱스찾기..
       const newArray = [...state.dataFood]; //making a new array
      newArray[index].iscart = true;//changing value in the new array
      newArray[index].quantity = newArray[index].quantity +1;  //수량증가

      return {
        ...state,
        dataFood: newArray,    //state.dataCart.push(action.payload) // 카트로 값 넘겨주기
      }
    case REMOVE_MENUTOCART:
      return {
        ...state,
        count: state.count - 1
      }
    case INC_CARTQUANT:   //수량추가
       const indexinc = state.dataFood.findIndex(dataFood => dataFood.id == action.payload); //인덱스찾기..
       const newArrayinc = [...state.dataFood]; //making a new array
       newArrayinc[indexinc].quantity = newArrayinc[indexinc].quantity + 1;//changing value in the new array

      return {
        ...state,
        dataFood: newArrayinc,    //state.dataCart.push(action.payload) // 카트로 값 넘겨주기
      }
    case DEC_CARTQUANT: //수량 감소 및 삭제
       const indexdec = state.dataFood.findIndex(dataFood => dataFood.id == action.payload); //인덱스찾기..
       const newArraydec = [...state.dataFood]; //making a new array
       newArraydec[indexdec].quantity = newArraydec[indexdec].quantity - 1;//changing value in the new array

      if(newArraydec[indexdec].quantity == 0){
        newArraydec[indexdec].iscart = false;
      }
      
      return {
        ...state,
        dataFood: newArraydec,    //state.dataCart.push(action.payload) // 카트로 값 넘겨주기
      }
    case SHOW_MENUDETAIL:   //상세메뉴보여주기
       const indexshow = state.dataFood.findIndex(dataFood => dataFood.id == action.payload); //인덱스찾기..
       const newArrayshow = [...state.dataFood]; //making a new array

      return {
        ...state,
        dataMenudetail: newArrayshow[indexshow],    //state.dataCart.push(action.payload) // 카트로 값 넘겨주기
      }
    default: return state
  }

}
export default menuReducer;