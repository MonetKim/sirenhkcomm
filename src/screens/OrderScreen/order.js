import React, { Component } from 'react';
import { View,StyleSheet,Image,Dimensions,RefreshControl , Text} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
//import FlatText from '../components/FlatText';
import { Entypo,MaterialCommunityIcons } from '@expo/vector-icons';
import { Icon } from 'native-base';
//import AsyncStorage from '@react-native-community/async-storage';
//import { ActivityIndicator } from 'react-native-paper';
//import config from '../../config/config.json';
const { width } = Dimensions.get('window');

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isCheck: true,
      userid: "", //아이디갖고옴
      dataOrder: [
        {
            orderid: 714546,
            storename:'파란만잔 강남점',
            title: 'aaaa',
            totalprice: 27000,
            preview : 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
            quantity : 1,
            orderDate : new Date(),
          },
          {
            orderid: 512151,
            storename:'파란만잔 상암점',
            title: 'bbbb',
            totalprice: 15000,
            preview : 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
            quantity : 1,
            orderDate : new Date(),
          },
      ], //디비에서 아이디맞쳐서갖고옴 ..
      error: false,
      refreshing: false,
    };
  }
  makeDateString(temp) {
    return temp.getFullYear() + '년 ' + (temp.getMonth()+1) + '월 ' +temp.getDate() + '일';
  }



  // onPress={() => this.props.navigation.navigate('Orderview',{orderid:order.id})}
  render() {

    if(this.state.isCheck == true){
        return (
            <View style={styles.flex}>
              <ScrollView style={StyleSheet.flex} >
                  <View style={styles.container}>
                      <View style={styles.headerTitle}>
                          <Text style ={{fontSize : 20 ,color : '#333'}}>All Orders</Text>
                      </View>
                      {
                          this.state.dataOrder.map((order,i) => {
                              return(
                                
                                  <TouchableOpacity key={i}>
                                      <View style={styles.singleOrder}>
                                           <View>
                                            <Text style ={{fontSize : 13 ,color : '#333'}}>{ this.makeDateString(order.orderDate)}</Text>   
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
        else{
          return(
            <View style={styles.flex}>
              <View style={styles.mainContainer}>
                <Text style ={{fontSize : 22 ,color : '#333'}}>주문목록이 텅텅</Text>
                
              </View>
            </View>
          );
        }
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