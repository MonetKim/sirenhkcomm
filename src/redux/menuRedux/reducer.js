import {
  ADD_MENUTOCART, REMOVE_MENUTOCART, INC_CARTQUANT, DEC_CARTQUANT, SHOW_MENUDETAIL,INSERT_CART,
  FETCH_MENULIST, FETCH_MENULIST_REQUEST, FETCH_MENULIST_SUCCESS, FETCH_MENULIST_FAILURE, CHANGE_CATEGORY
} from './type'

const initialstate = {

  dataFood: [],
  datacart: [], // 카트목록 새로 만들기(옵션기능 추가하기위해) 0820
  count: 100,
  dataMenudetail: [],
  temp: '   @@Testa@@2',
  category: 1,
}

const menuReducer = (state = initialstate, action) => {
  switch (action.type) {
  
    case ADD_MENUTOCART: //카트수량증가
      const index = state.dataFood.findIndex(dataFood => dataFood.menu_id == action.payload); //인덱스찾기..
      const newArray = [...state.dataFood]; //making a new array
      newArray[index].iscart = true;//changing value in the new array
      newArray[index].quantity = newArray[index].quantity + 1;  //수량증가
      return {
        ...state,
        dataFood: newArray,    //state.dataCart.push(action.payload) // 카트로 값 넘겨주기
      }
    case REMOVE_MENUTOCART: //테스트
      return {
        ...state,
        count: state.count - 1
      }
      case INSERT_CART: //테스트
      return {
        ...state,
        datacart: [...state.datacart, action.payload]
      }
    case INC_CARTQUANT:   //수량추가
      const indexinc = state.dataFood.findIndex(dataFood => dataFood.menu_id == action.payload); //인덱스찾기..
      const newArrayinc = [...state.dataFood]; //making a new array
      newArrayinc[indexinc].quantity = newArrayinc[indexinc].quantity + 1;//changing value in the new array

      return {
        ...state,
        dataFood: newArrayinc,    //state.dataCart.push(action.payload) // 카트로 값 넘겨주기
      }
    case DEC_CARTQUANT: //수량 감소 및 삭제
      const indexdec = state.dataFood.findIndex(dataFood => dataFood.menu_id == action.payload); //인덱스찾기..
      const newArraydec = [...state.dataFood]; //making a new array
      newArraydec[indexdec].quantity = newArraydec[indexdec].quantity - 1;//changing value in the new array

      if (newArraydec[indexdec].quantity == 0) {
        newArraydec[indexdec].iscart = false;
      }

      return {
        ...state,
        dataFood: newArraydec,    //state.dataCart.push(action.payload) // 카트로 값 넘겨주기
      }
    case SHOW_MENUDETAIL:   //상세메뉴보여주기
      const indexshow = state.dataFood.findIndex(dataFood => dataFood.menu_id == action.payload); //인덱스찾기..
      const newArrayshow = [...state.dataFood]; //making a new array

      return {
        ...state,
        dataMenudetail: newArrayshow[indexshow],    //state.dataCart.push(action.payload) // 카트로 값 넘겨주기
      }
    //-----------------데이터갖고오기 DB
    case FETCH_MENULIST_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_MENULIST_SUCCESS:
      return {
        ...state,
        dataFood: action.payload,
        loading: false,
      }
    case FETCH_MENULIST_FAILURE:
      return {
        ...state,
        err: action.payload,
        loading: false,
      }
      case CHANGE_CATEGORY: 
        let newCategory = state.category; //making a new array
        newCategory= action.payload;//changing value in the new array
        console.log(action.payload+"확인하자"+newCategory)
        return {
          ...state,
          category: Number(newCategory),    //state.dataCart.push(action.payload) // 카트로 값 넘겨주기
        }
    

//-----------------------------------------

    default: return state
  }

}
export default menuReducer;