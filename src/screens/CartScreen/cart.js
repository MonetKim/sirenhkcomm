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

export default class cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataCart: props.navigation.getParam('dataCart'),
      isCheck: props.navigation.getParam('isCheck'),
      error: false,
      refreshing: false,
    };
  }


  onChangeQual(i,type)
  {
    const dataCar = this.state.dataCart
    let cantd = dataCar[i].quantity;

    if (type) {
     cantd = cantd + 1
     dataCar[i].quantity = cantd
     this.setState({dataCart:dataCar})
     //AsyncStorage.setItem('cart',JSON.stringify(dataCar));
    }
    else if (type==false&&cantd>=2){
     cantd = cantd - 1
     dataCar[i].quantity = cantd
     this.setState({dataCart:dataCar})
     //AsyncStorage.setItem('cart',JSON.stringify(dataCar));
    }
    else if (type==false&&cantd==1){
     dataCar.splice(i,1)
     this.setState({dataCart:dataCar})
     //AsyncStorage.setItem('cart',JSON.stringify(dataCar));
    } 
  }
 
  total() {
    var total = 0;
    const cart = this.state.dataCart;
    console.log('123123');
    for (var i = 0; i < cart.length; i++) {
      total = total + (cart[i].price * cart[i].quantity)
      console.log('price'+cart[i].price +'    i = ' +i +'quan =  ' +cart[i].quantity );
    }
    console.log('@@s    '+ this.state.isCheck);
    var total_price = total;
    return total_price;
  }



  render() {

    if(this.state.isCheck == true){
          return (
            <View style={styles.flex}>
              <ScrollView style={ styles.scrollHeight } >
                {
                  this.state.dataCart.map((item,i) => {
                    return(
                      <View style={styles.singleCartItem} key={i}>
                        <Image style={styles.cartItemImage} source={{ uri: item.food.preview }} />
                        <View style={styles.widthSection}>
                            <Text> {item.food.title}</Text>
                            <View style={styles.cartRightSection}>
                                <Text> {item.food.price*item.quantity}</Text>
                                <View style={styles.qualityCart}>
                                    <TouchableOpacity onPress={() => this.onChangeQual(i,true)}>
                                      <Icon name="add-circle-outline" size={28} color="#C01C27" />
                                    </TouchableOpacity>
                                    <Text style ={{fontSize : 20 ,color : '#333'}}> {item.quantity} </Text>
                                    {item.quantity == 1 ? 
                                      <TouchableOpacity onPress={() => this.onChangeQual(i,false)}>
                                        <Icon name="trash" size={28} color="#C01C27" />
                                      </TouchableOpacity>
                                      : <TouchableOpacity onPress={() => this.onChangeQual(i,false)}>
                                        <Icon name="remove-circle-outline"  size={28} color="#C01C27" />
                                      </TouchableOpacity>
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                    )
                  })
                }
              </ScrollView>
              <View style={styles.cartItem}>
                    <View>
                      <Text style ={{fontSize : 20 ,color : '#333'}} >총금액</Text>
                    </View>
                    <View>
                    <Text style ={{fontSize : 20 ,color : '#333'}} > {this.total()}원</Text>
                    </View>
                  </View>
              <View>
                <TouchableOpacity style={styles.bottomButton} onPress={() => this.props.navigation.navigate('Checkout')}>
                <Text style ={{fontSize : 20 ,color : '#333'}}>주문하기</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }
        else{
          return(
            <View style={styles.flex}>
              <View style={styles.mainContainer}>
                <Text style ={{fontSize : 22 ,color : '#333'}}>장바구니가 텅텅</Text>
                
              </View>
            </View>
          );
        }
      }    
}

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