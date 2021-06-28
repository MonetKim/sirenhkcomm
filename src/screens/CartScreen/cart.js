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

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataCart: [
        {
          id: 0,
          title: 'aaaa',
          price: 7000,
          preview : 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          quantity : 1
        },
        {
          id: 1,
          title: 'bbbb',
          price: 5000,
          preview : 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
          quantity : 1
        },
       
        {
          id: 1,
          title: 'bbbb',
          price: 5000,
          preview : 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
          quantity : 2
        },
      ],
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



  render() {

    
          return (
            <View style={styles.flex}>
              <ScrollView style={ styles.scrollHeight } >
                {
                  this.state.dataCart.map((item,i) => {
                    return(
                      <View style={styles.singleCartItem} key={i}>
                        <Image style={styles.cartItemImage} source={{ uri: item.preview }} />
                        <View style={styles.widthSection}>
                            <Text> {item.title}</Text>
                            <View style={styles.cartRightSection}>
                                <Text> {item.price*item.quantity}</Text>
                                <View style={styles.qualityCart}>
                                    {item.quantity == 1 ? 
                                      <TouchableOpacity onPress={() => this.onChangeQual(i,false)}>
                                        <Icon name="trash" size={28} color="#C01C27" />
                                      </TouchableOpacity>
                                      : <TouchableOpacity onPress={() => this.onChangeQual(i,false)}>
                                        <Icon name="remove-circle" size={28} color="#C01C27" />
                                      </TouchableOpacity>
                                    }
                                    <Text> {item.quantity}</Text>
                                    <TouchableOpacity onPress={() => this.onChangeQual(i,true)}>
                                      <Icon name="add-circle" size={28} color="#C01C27" />
                                    </TouchableOpacity>
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
                      <FlatText text="Total" font="q_bold" color="#333" size={17} />
                    </View>
                    <View>
                      <FlatText text={config.CURRENCY_CODE + ' ' + this.NumberFormat(this.total())} font="q_bold" color="#333" size={17} />
                    </View>
                  </View>
              <View>
                <TouchableOpacity style={styles.bottomButton} onPress={() => this.props.navigation.navigate('Checkout')}>
                <Text>Checkout</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
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
      paddingVertical: 20
    },
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
      },
    scrollHeight: {
      flex: 1
    }
    
});