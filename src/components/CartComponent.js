import { Col, Icon } from 'native-base';
const { width } = Dimensions.get('window');

import { pushOrders ,pushOrderDetails ,resetevery} from '../redux/orderRedux/action'
import { incCartQuant ,decCartQuant , removeMenuToCart, addMenuToCart, } from '../redux/menuRedux/action'
import React, { useEffect  }  from "react";

import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { connect } from 'react-redux'
import { Alert } from 'react-native';
import API from "../API/WebService";


const CartComponent = (props) => {

    
    return (
        <View style={styles.flex}>
            <View><Text>&^&^&^{props.count}</Text></View>
            <TouchableOpacity onPress={() => props.removeMenuToCart()}><Text>!@#!@#  </Text></TouchableOpacity>
          <ScrollView style={ styles.scrollHeight } >
            {
              props.dataFood.map((item,i) => {
                  if(item.iscart){
                return( 
                    
                  <View style={styles.singleCartItem} key={i}>
                    <Image style={styles.cartItemImage} source={{ uri: item.imageview }} />
                    <View style={styles.widthSection}>
                        <Text> {item.title}</Text>
                        <View style={styles.cartRightSection}>
                            <Text> {item.price*item.quantity}</Text>
                            <View style={styles.qualityCart}>
                                <TouchableOpacity onPress={() => props.incCartQuant(item.menu_id)}>
                                  <Icon name="add-circle-outline" size={28} color="#C01C27" />
                                </TouchableOpacity>
                                <Text style ={{fontSize : 20 ,color : '#333'}}> {item.quantity} </Text>
                                {item.quantity == 1 ? 
                                  <TouchableOpacity onPress={() => props.decCartQuant(item.menu_id)}>
                                    <Icon name="trash" size={28} color="#C01C27" />
                                  </TouchableOpacity>
                                  : <TouchableOpacity onPress={() => props.decCartQuant(item.menu_id)}>
                                    <Icon name="remove-circle-outline"  size={28} color="#C01C27" />
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
                  <Text style ={{fontSize : 20 ,color : '#333'}} >총금액</Text>
                </View>
                <View>
                <Text style ={{fontSize : 20 ,color : '#333'}} >{total()} 원</Text>
                </View>
              </View>
          <View>
            <TouchableOpacity style={styles.bottomButton} onPress={() => setOrder('56','65','60000',true)}>
            <Text style ={{fontSize : 20 ,color : '#333'}}>주문하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      );    

      function total() {
        var total = 0;
        const cart = props.dataFood;
        for (var i = 0; i < cart.length; i++) {
          if(cart[i].iscart){
            total = total + (cart[i].price * cart[i].quantity)
          }
        }
        var total_price = total;
        return total_price;
      }

      async function setOrder(user_id,store_id,totalprice,ischeck){
        try{
          //props.pushOrders(user_id,store_id,totalprice,ischeck);
          await API.post("user/order", {    
            user_id, 
            store_id, 
            totalprice,
            ischeck,
          });
          console.log("비동기머누너무싫어");

          for(var i = 0 ; i < props.dataFood.length ; i++){
            if(props.dataFood[i].quantity >0){
             
              let menu_id=  props.dataFood[i].menu_id
              let menu_price = props.dataFood[i].price
              let quantity=  props.dataFood[i].quantity
              console.log(i+"지긋지긋해"+ menu_price)
              await API.post("user/orderdetail", {    
                user_id, 
                menu_id,
                menu_price,
                quantity
              })
               //props.pushOrderDetails(  user_id,  props.dataFood[i].menu_id, props.dataFood[i].price, props.dataFood[i].quantity);
             }
           }
        }
        catch{
            //오류구성해주자...
        }
        finally{
         
        }
        //alert(props.orderid[0].order_id);
        

        props.removeMenuToCart();

        const temptemp = props.count;
        calltest(temptemp);
      }
      function calltest(temptemp){
        alert(temptemp);
      }
}

 


const mapStateToProps = (state) =>{
    return {
        dataFood: state.menuReducer.dataFood,
        dataCart: state.menuReducer.dataCart,
        temp: state.menuReducer.temp,
        count: state.menuReducer.count,
        orderid: state.orderReducer.orderid,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        incCartQuant:(item) => dispatch(incCartQuant(item)),
        decCartQuant:(item) => dispatch(decCartQuant(item)),
        addMenuToCart:(item) => dispatch(addMenuToCart(item)),
        removeMenuToCart:() => dispatch(removeMenuToCart()),
        resetevery:() => dispatch(resetevery()),
        pushOrders :(user_id,store_id,totalprice,ischeck ) =>dispatch(pushOrders(user_id,store_id,totalprice,ischeck   )),
        pushOrderDetails :(order_id, user_id,  menu_id,  menu_price,  quantity ) =>dispatch(pushOrderDetails(order_id, user_id,  menu_id,  menu_price,  quantity    )),
        
        
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
    cartRightSection:{
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