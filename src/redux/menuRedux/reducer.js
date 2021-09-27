import {
  ADD_MENUTOCART, REMOVE_MENUTOCART, INC_CARTQUANT, DEC_CARTQUANT, SHOW_MENUDETAIL, INSERT_CART, FETCH_OPTION_REQUEST, FETCH_OPTION_SUCCESS, FETCH_OPTION_FAILURE,
  FETCH_MENULIST, FETCH_MENULIST_REQUEST, FETCH_MENULIST_SUCCESS, FETCH_MENULIST_FAILURE, CHANGE_CATEGORY, REMOVE_ALL_CART, CHANGE_CART_NUM, SET_DATACART,
  FETCH_ROASTING_REQUEST, FETCH_ROASTING_SUCCESS, FETCH_ROASTING_FAILURE,
} from './type'

const initialstate = {

  dataFood: [],
  datacart: [], // 카트목록 새로 만들기(옵션기능 추가하기위해) 0820
  count: 100,
  dataMenudetail: [],
  temp: '   @@Testa@@2',
  category: 1,
  option: [],//2021 0825 옵션 데이터 생성 미들웨어작업
  roasting: [], // 로스팅 정보
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
    //-----------------------------------------------------
    case INSERT_CART: //데이터카트 장바구니 요소 추가
      return {
        ...state,
        datacart: [...state.datacart, action.payload]
      }

    case REMOVE_ALL_CART: //데이터카트 장바구니 모두 비우기
      const newArraycart = [];
      return {
        ...state,
        datacart: newArraycart,
      }

    case CHANGE_CART_NUM:   //수량추가
      const newArrayCartNum = [...state.datacart]; //making a new array
      newArrayCartNum[action.payload].quantity = newArrayCartNum[action.payload].quantity + action.num;//changing value in the new array

      return {
        ...state,
        datacart: newArrayCartNum,    //state.dataCart.push(action.payload) // 카트로 값 넘겨주기
      }
    //-----------------------------------------------------------------
    case INC_CARTQUANT:   //수량추가
      const indexinc = state.datacart.findIndex(datacart => (datacart.menu_id == action.payload) && (datacart.menu_option_insert == action.paymenu) &&
        (datacart.taste_option_insert == action.paytaste) && (datacart.add_option_insert == action.payadd)); //인덱스찾기..
      const newArrayinc = [...state.datacart]; //making a new array
      newArrayinc[indexinc].quantity = newArrayinc[indexinc].quantity + 1;//changing value in the new array

      return {
        ...state,
        datacart: newArrayinc,    //state.dataCart.push(action.payload) // 카트로 값 넘겨주기
      }
    case DEC_CARTQUANT: //수량 감소 및 삭제
      const indexdec = state.datacart.findIndex(datacart => (datacart.menu_id == action.payload) && (datacart.menu_option_insert == action.paymenu) &&
        (datacart.taste_option_insert == action.paytaste) && (datacart.add_option_insert == action.payadd)); //인덱스찾기..
      const newArraydec = [...state.datacart]; //making a new array
      newArraydec[indexdec].quantity = newArraydec[indexdec].quantity - 1;//changing value in the new array

      if (newArraydec[indexdec].quantity == 0) {
        newArraydec.splice(indexdec, 1);
        //console.log(" 삭제 0일때 " + JSON.stringify(newArraydec.splice(indexdec)) )
      }

      return {
        ...state,
        datacart: newArraydec,    //state.dataCart.push(action.payload) // 카트로 값 넘겨주기
      }
    case SHOW_MENUDETAIL:   //상세메뉴보여주기
      const indexshow = state.dataFood.findIndex(dataFood => dataFood.menu_id == action.payload); //인덱스찾기..
      const newArrayshow = [...state.dataFood]; //making a new array

      return {
        ...state,
        dataMenudetail: newArrayshow[indexshow],    //state.dataCart.push(action.payload) // 카트로 값 넘겨주기
      }
    //-----------------메뉴 데이터갖고오기 DB
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
    //-----------------옵션 데이터갖고오기 DB
    case FETCH_OPTION_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_OPTION_SUCCESS:
      return {
        ...state,
        option: action.payload,
        loading: false,
      }
    case FETCH_OPTION_FAILURE:
      return {
        ...state,
        err: action.payload,
        loading: false,
      }
    //-----------------로스팅 데이터갖고오기 DB
    case FETCH_ROASTING_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_ROASTING_SUCCESS:
      return {
        ...state,
        roasting: action.payload,
        loading: false,
      }
    case FETCH_ROASTING_FAILURE:
      return {
        ...state,
        err: action.payload,
        loading: false,
      }
    //---------------------------------
    case CHANGE_CATEGORY:
      let newCategory = state.category; //making a new array
      newCategory = action.payload;//changing value in the new array
      console.log(action.payload + "확인하자" + newCategory)
      return {
        ...state,
        category: Number(newCategory),    //state.dataCart.push(action.payload) // 카트로 값 넘겨주기
      }
    //----------------------------------------------
    case SET_DATACART:   //상세메뉴보여주기
      //console.log("모가 어케 돌아가는거니1    " + JSON.stringify(state.dataMenudetail.quantity) );
      //const indexDataCart = state.dataMenudetail.findIndex(dataMenudetail => dataMenudetail.menu_id == action.find_menu); //인덱스찾기..
      //const newArrayDataCart = [state.dataMenudetail]; 왜 이건안돼고 밑에것만되는거지?!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      const newArrayDataCart = JSON.parse(JSON.stringify(state.dataMenudetail)); //making a new array
      if (action.kind == 1) {
        newArrayDataCart.quantity = action.payload;
      }
      else if (action.kind == 2) {
        newArrayDataCart.menu_option_insert = action.payload;
      }
      else if (action.kind == 3) {
        newArrayDataCart.taste_option_insert = action.payload;
      }
      else if (action.kind == 4) {
        newArrayDataCart.add_option_insert = action.payload;
      }

      return {
        ...state,
        dataMenudetail: newArrayDataCart,    //state.dataCart.push(action.payload) // 카트로 값 넘겨주기
      }

    //-----------------------------------------

    default: return state
  }

}
export default menuReducer;