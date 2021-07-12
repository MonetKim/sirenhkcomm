
import { View,StyleSheet,Image,Dimensions,RefreshControl , Text} from 'react-native';
import { connect } from 'react-redux'

import React, { Component } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
//import FlatText from '../components/FlatText';
import { Entypo,MaterialCommunityIcons } from '@expo/vector-icons';
import { Icon } from 'native-base';
//import AsyncStorage from '@react-native-community/async-storage';
//import { ActivityIndicator } from 'react-native-paper';
//import config from '../../config/config.json';
const { width } = Dimensions.get('window');
const Subscribers = (props) => {

    

    return (
        <View style={styles.flex}>
          <ScrollView style={StyleSheet.flex} >
              <View style={styles.container}>
                  <View style={styles.headerTitle}>
                      <Text style ={{fontSize : 20 ,color : '#333'}}>All Orders{props.temp}</Text>
                  </View>
                  {
                      props.dataOrder.map((order,i) => {
                       //props.dataCart.map((order,i) => {
                          return(
                            
                              <TouchableOpacity key={i}>
                                  <View style={styles.singleOrder}>
                                       <View>
                                        <Text style ={{fontSize : 13 ,color : '#333'}}>{ makeDateString(order.orderDate)}</Text>   
                                        <Image style={styles.StoreImage} source={{ uri: order.preview }} />
                                        </View>
                                       <View>
                                          <View>
                                              <Text style ={{fontSize : 19 ,color : '#333'}}>{order.storename}</Text>
                                          </View>
                                          <View>
                                              <Text style ={{fontSize : 13 ,color : '#333'}}>Order No: #{order.orderid}</Text>
                                          </View>
                                          <View style={styles.orderPrice}>
                                              <Text style ={{fontSize : 13 ,color : '#333'}}>금액 : {order.totalprice}원</Text>
                                          </View>
                                      </View>
                                      <View style={styles.viewOrderBtn}>
                                          <Icon name="eye"  color="#fff" />
                                      </View>
                                  </View>
                              </TouchableOpacity>
                          )
                      })
                  }
              </View>
          </ScrollView>
        </View>
      );
}

function makeDateString(temp) {
    return temp.getFullYear() + '년 ' + (temp.getMonth()+1) + '월 ' +temp.getDate() + '일';
  }


const mapStateToProps = (state) =>{
    console.log(state,'state')
    return {
        dataOrder: state.subscriberReducer.dataOrder,
        count: state.menuReducer.count,
        temp: state.menuReducer.temp,
        dataCart: state.menuReducer.dataCart,
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 0
    },
    headerTitle: {
        marginBottom: 20
    },
    singleOrderItem: {
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
    StoreImage: {
        width: 80,
        height: 80,
        borderRadius: 50
    },
    singleOrder: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    flexDirection: {
        flexDirection: 'row',
        marginBottom: 5
    },
    orderPrice: {
        marginTop: 7
    },
    viewOrderBtn: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
    },
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
});



export default connect(mapStateToProps)(Subscribers)