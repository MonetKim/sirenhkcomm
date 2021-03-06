import { Col, Icon } from 'native-base';
import { incCartQuant, decCartQuant, removeAllCart } from '../redux/menuRedux/action'
import { getOrderresults, getOrderresultsDetail } from '../redux/orderRedux/action'
import React, { useEffect, useContext, useState } from "react";
import { Context as UserContext } from '../dataStore/userAccessContext';
import { navigate } from '../NavigationRef';
import {
  Image,
  View,
  Text,
  Alert,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { connect } from 'react-redux'
import API from "../API/WebService";
const { width } = Dimensions.get('window');


const CartComponent = (props) => {
  const { state } = useContext(UserContext);
  const { msg } = state;
  const [disabled, setDisabled] = useState(false);


  /* 모든 장바구니 비우기 */
  function _cleanCart() {
    Alert.alert(
      "정말로 장바구니를 비우시겠습니까?",
      ` `,
      [

        { text: "확인", onPress: () => props.removeAllCart() },
        { text: '취소', onPress: () => null },
      ],
      { cancelable: false }
    );
  }

  if (!emtycheck()) {
    return (
      <View style={styles.mainContainer}>
        <Text style={{ fontSize: 20, color: '#333' }}>장바구니가 텅텅</Text>
      </View>
    );
  }
  else {
    return (
      <View style={styles.flex}>
        <View><Text>{getstoreinfo(props.current_store_info)}</Text></View>
        <View style={styles.cartRightSection}>
          <Text > 장바구니 모두 비우기</Text>
          <TouchableOpacity onPress={() => _cleanCart()}>
            <Icon name="trash" size={28} color="#C01C27" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollHeight} >
          {
            props.datacart.map((item, i) => {

              return (
                <View style={styles.singleCartItem} key={i}>
                  <Image style={styles.cartItemImage} source={{ uri: item.imageview }} />
                  <View style={styles.widthSection}>
                    <Text> {item.title} </Text>
                    <View style={styles.cartRightSection}>
                      <Text> {item.price}</Text>
                      <View style={styles.qualityCart}>
                        <TouchableOpacity onPress={() => props.incCartQuant(item.menu_id,item.menu_option_insert,item.taste_option_insert,item.add_option_insert)}>
                          <Icon name="add-circle-outline" size={28} color="#C01C27" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, color: '#333' }}> {item.quantity} </Text>
                        {item.quantity == 1 ?
                          <TouchableOpacity onPress={() => props.decCartQuant(item.menu_id,item.menu_option_insert,item.taste_option_insert,item.add_option_insert)}>
                            <Icon name="trash" size={28} color="#C01C27" />
                          </TouchableOpacity>
                          : <TouchableOpacity onPress={() => props.decCartQuant(item.menu_id,item.menu_option_insert,item.taste_option_insert,item.add_option_insert)}>
                            <Icon name="remove-circle-outline" size={28} color="#C01C27" />
                          </TouchableOpacity>
                        }
                      </View>
                    </View>
                    <View style={styles.cartRightSection}>
                      {
                        findOptionName(item.menu_option_insert) == 0 ? <View></View> :
                          <Text> {findOptionName(item.menu_option_insert)}</Text>
                      }
                      {
                        findOptionPrice(item.menu_option_insert) == 0 ? <View></View> :
                          <Text> {findOptionPrice(item.menu_option_insert)}</Text>
                      }
                    </View>
                    <View style={styles.cartRightSection}>
                      {
                        findOptionName(item.taste_option_insert) == 0 ? <View></View> :
                          <Text> {findOptionName(item.taste_option_insert)}</Text>
                      }
                      {
                        findOptionPrice(item.taste_option_insert) == 0 ? <View></View> :
                          <Text> {findOptionPrice(item.taste_option_insert)}</Text>
                      }
                    </View>
                    <View style={styles.cartRightSection}>
                      {
                        findOptionName(item.add_option_insert) == 0 ? <View></View> :
                          <Text> {findOptionName(item.add_option_insert)}</Text>
                      }
                      {
                        findOptionPrice(item.add_option_insert) == 0 ? <View></View> :
                          <Text> {findOptionPrice(item.add_option_insert)}</Text>
                      }
                    </View>
                  </View>
                </View>
              )
            })
          }

        </ScrollView>
        <View style={styles.cartItem}>
          <View>
            <Text style={{ fontSize: 20, color: '#333' }} >총금액</Text>
          </View>
          <View>
            <Text style={{ fontSize: 20, color: '#333' }} >{total()} 원</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.bottomButton} disabled={disabled} onPress={() => navigate("CartDetailScreen")}>
            <Text style={{ fontSize: 20, color: '#333' }}>주문하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  /*카트에 담긴 총 가격 계산 */
  function total() { //데이터카트에 닮긴 옵션가격도 추가해주자.
    var total = 0;
    const cart = props.datacart;
    for (var i = 0; i < cart.length; i++) {
      total = total + ((cart[i].price
        + findOptionPrice(cart[i].menu_option_insert)
        + findOptionPrice(cart[i].taste_option_insert)
        + findOptionPrice(cart[i].add_option_insert)         // 체크박스로 변경될시 여러개들어올것 체크 가격부분 저장 콤마로 나누기등등 다 고려해야함
      )
        * cart[i].quantity);
    }
    var total_price = total;
    return total_price;
  }

  //옵션 이름찾기
  function findOptionName(option_num) {
    if (option_num === null) {
      return 0;
    }
    for (var i = 0; i < props.option.length; i++) {
      if (props.option[i].option_id == option_num)
        return props.option[i].option_name;
    }
  }
  //옵션 가격찾기
  function findOptionPrice(option_num) {
    if (option_num === null) {
      return 0;
    }
    for (var i = 0; i < props.option.length; i++) {
      if (props.option[i].option_id == option_num)
        return props.option[i].option_price;
    }
  }


  /*매장 아이디로 매장 이름 찾아오기 */
  function getstoreinfo(matchstoreid) {
    for (var i = 0; i < props.storeinfo.length; i++) {
      if (props.storeinfo[i].store_id == matchstoreid)
        return props.storeinfo[i].store_name
    }
  }

  /* 장바구니 갯수 체크 */
  function emtycheck() {
    var ischeck = false;
    const numOfcart = props.datacart;
    if (numOfcart.length) {
      ischeck = true;
    }
    return ischeck;
  }

  /* DB에 주문리스트 저장하기 */
  async function setOrder(user_id, store_id, totalprice, ischeck) {
    try {
      setDisabled(true);
      if (total() != 0) { /* 장바구니에 담겨져있을때만 가능하도록*/
        let store_name = getstoreinfo(props.current_store_info);
        await API.post("user/order", {       /* db order 에 저장*/
          user_id,
          store_id,
          totalprice,
          ischeck,
          store_name,
        });
        /* DB  ordermenu 테이블에 저장 */
        for (var i = 0; i < props.dataFood.length; i++) {
          if (props.dataFood[i].quantity > 0) {

            let menu_id = props.dataFood[i].menu_id;
            let menu_price = props.dataFood[i].price;
            let quantity = props.dataFood[i].quantity;
            let store_id = props.current_store_info;
            let title = props.dataFood[i].title;
            let store_name = getstoreinfo(props.current_store_info);
            await API.post("user/orderdetail", {
              user_id,
              menu_id,
              store_id,
              menu_price,
              quantity,
              title,
              store_name,
            })
          }
        }
      }
      else {

      }
    }
    catch {
      //오류구성해주자...
    }
    finally {
      if (total() != 0) {
        props.getOrderresults(msg[0].index_id);
        props.getOrderresultsDetail(msg[0].index_id);
        saveOrder();
      }
      else {
        rejectOrder();
      }
    }
  }

  function saveOrder() {  /* 주문성공시  */
    Alert.alert(
      "주문이 완료되었습니다.",
      navigate("OrderScreen")

    )
  }
  function rejectOrder() { /* 주문실패시  */
    Alert.alert(
      "장바구니가 비워있습니다.",

    )
  }

}




const mapStateToProps = (state) => {
  return {
    dataFood: state.menuReducer.dataFood,
    datacart: state.menuReducer.datacart,
    current_store_info: state.storeReducer.current_store_info,
    storeinfo: state.storeReducer.storeinfo,
    option: state.menuReducer.option,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    incCartQuant: (item,menu_option_insert,taste_option_insert,add_option_insert) => dispatch(incCartQuant(item,menu_option_insert,taste_option_insert,add_option_insert)),
    decCartQuant: (item,menu_option_insert,taste_option_insert,add_option_insert) => dispatch(decCartQuant(item,menu_option_insert,taste_option_insert,add_option_insert)),
    getOrderresults: (item) => dispatch(getOrderresults(item)),
    getOrderresultsDetail: (item) => dispatch(getOrderresultsDetail(item)),
    removeAllCart: () => dispatch(removeAllCart()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CartComponent)



const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  cartItemImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  singleCartItem: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderBottomWidth: 1,
    paddingBottom: 20,
    borderBottomColor: '#ddd',
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  cartRightSection: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between'
  },
  widthSection: {
    width: width - 140,
    paddingLeft: 10
  },
  qualityCart: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bottomButton: {
    alignItems: 'center',
    backgroundColor: '#C01C27',
    paddingVertical: 13
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25
  },
  scrollHeight: {
    flex: 1
  }

});