import { Col, Icon } from 'native-base';
const { width } = Dimensions.get('window');

import { pushOrders, pushOrderDetails, resetevery } from '../redux/orderRedux/action'
import { incCartQuant, decCartQuant, removeMenuToCart, addMenuToCart, } from '../redux/menuRedux/action'
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


const CartComponent = (props) => {
  const { state } = useContext(UserContext);
  const { msg } = state;
  const [disabled, setDisabled] = useState(false);
  // useEffect(() =>{
  // },[msg])  
  function getstoreinfo(matchstoreid) {
    for (var i = 0; i < props.storeinfo.length; i++) {
      if (props.storeinfo[i].store_id == matchstoreid)
        return props.storeinfo[i].store_name
    }
  }


  return (
    <View style={styles.flex}>
      <View><Text>{getstoreinfo(props.current_store_info)}</Text></View>
      <TouchableOpacity onPress={() => props.removeMenuToCart()}><Text>{getstoreinfo(props.current_store_info)} </Text></TouchableOpacity>
      <ScrollView style={styles.scrollHeight} >
        {
          props.dataFood.map((item, i) => {
            if (item.iscart) {
              return (

                <View style={styles.singleCartItem} key={i}>
                  <Image style={styles.cartItemImage} source={{ uri: item.imageview }} />
                  <View style={styles.widthSection}>
                    <Text> {item.title}</Text>
                    <View style={styles.cartRightSection}>
                      <Text> {item.price * item.quantity}</Text>
                      <View style={styles.qualityCart}>
                        <TouchableOpacity onPress={() => props.incCartQuant(item.menu_id)}>
                          <Icon name="add-circle-outline" size={28} color="#C01C27" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, color: '#333' }}> {item.quantity} </Text>
                        {item.quantity == 1 ?
                          <TouchableOpacity onPress={() => props.decCartQuant(item.menu_id)}>
                            <Icon name="trash" size={28} color="#C01C27" />
                          </TouchableOpacity>
                          : <TouchableOpacity onPress={() => props.decCartQuant(item.menu_id)}>
                            <Icon name="remove-circle-outline" size={28} color="#C01C27" />
                          </TouchableOpacity>
                        }
                      </View>
                    </View>
                  </View>
                </View>

              )
            }
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
        <TouchableOpacity style={styles.bottomButton} disabled={disabled} onPress={() => setOrder(msg[0].index_id, props.current_store_info, total(), true)}>
          <Text style={{ fontSize: 20, color: '#333' }}>주문하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  function total() {
    var total = 0;
    const cart = props.dataFood;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].iscart) {
        total = total + (cart[i].price * cart[i].quantity)
      }
    }
    var total_price = total;
    return total_price;
  }

  async function setOrder(user_id, store_id, totalprice, ischeck) {
    try {
      //props.pushOrders(user_id,store_id,totalprice,ischeck);

      setDisabled(true);
      if (total() != 0) {
        let store_name = getstoreinfo(props.current_store_info);
        await API.post("user/order", {
          user_id,
          store_id,
          totalprice,
          ischeck,
          store_name,
        });

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
            //props.pushOrderDetails(  user_id,  props.dataFood[i].menu_id, props.dataFood[i].price, props.dataFood[i].quantity);
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

    }
    //alert(props.orderid[0].order_id);
    if (total() != 0) {
      props.removeMenuToCart();
      saveOrder();
    }
    else {
      rejectOrder();
    }
  }

  function saveOrder() {
    Alert.alert(
      "주문이 완료되었습니다.",
      navigate("OrderScreen")

    )
  }
  function rejectOrder() {
    Alert.alert(
      "장바구니가 비워있습니다.",

    )
  }

}




const mapStateToProps = (state) => {
  return {
    dataFood: state.menuReducer.dataFood,
    dataCart: state.menuReducer.dataCart,
    temp: state.menuReducer.temp,
    count: state.menuReducer.count,
    orderid: state.orderReducer.orderid,
    current_store_info: state.storeReducer.current_store_info,
    storeinfo: state.storeReducer.storeinfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    incCartQuant: (item) => dispatch(incCartQuant(item)),
    decCartQuant: (item) => dispatch(decCartQuant(item)),
    addMenuToCart: (item) => dispatch(addMenuToCart(item)),
    removeMenuToCart: () => dispatch(removeMenuToCart()),
    resetevery: () => dispatch(resetevery()),
    pushOrders: (user_id, store_id, totalprice, ischeck) => dispatch(pushOrders(user_id, store_id, totalprice, ischeck)),
    pushOrderDetails: (order_id, user_id, menu_id, menu_price, quantity) => dispatch(pushOrderDetails(order_id, user_id, menu_id, menu_price, quantity)),


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