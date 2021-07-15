import { Icon } from 'native-base';
const { width } = Dimensions.get('window');

import { incCartQuant ,decCartQuant , removeMenuToCart, addMenuToCart} from '../redux/menuRedux/action'
import React, { Component, useContext } from "react";

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


const CartComponent = (props) => {

    
    return (
        <View style={styles.flex}>
            <View><Text>&^&^&^{props.count}</Text></View>
            <TouchableOpacity onPress={() => props.removeMenuToCart()}><Text>!@#!@#  {props.count}</Text></TouchableOpacity>
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
            <TouchableOpacity style={styles.bottomButton} onPress={() => this.props.navigation.navigate('Checkout')}>
            <Text style ={{fontSize : 20 ,color : '#333'}}>주문하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      );    

      function total() {
        var total = 0;
        const cart = props.dataFood;
        console.log('123123');
        for (var i = 0; i < cart.length; i++) {
          if(cart[i].iscart){
            total = total + (cart[i].price * cart[i].quantity)
            console.log('price'+cart[i].price +'    i = ' +i +'quan =  ' +cart[i].quantity );
          }
        }
        var total_price = total;
        return total_price;
      }
}

 


const mapStateToProps = (state) =>{
    console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
    console.log(state,'state')
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
    return {
        dataFood: state.menuReducer.dataFood,
        dataCart: state.menuReducer.dataCart,
        temp: state.menuReducer.temp,
        count: state.menuReducer.count,
        
    }
}

const mapDispatchToProps = (dispatch) =>{
    //console.log(dispatch,'dispatch')
    return{
        incCartQuant:(item) => dispatch(incCartQuant(item)),
        decCartQuant:(item) => dispatch(decCartQuant(item)),
        addMenuToCart:(item) => dispatch(addMenuToCart(item)),
        removeMenuToCart:() => dispatch(removeMenuToCart())
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