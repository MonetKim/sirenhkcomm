
import { View, StyleSheet, Image, Dimensions, RefreshControl, Text } from 'react-native';
import { connect } from 'react-redux'

import React, { Component } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
//import FlatText from '../components/FlatText';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { Icon } from 'native-base';
//import AsyncStorage from '@react-native-community/async-storage';
//import { ActivityIndicator } from 'react-native-paper';
//import config from '../../config/config.json';
const { width, height } = Dimensions.get('window');
const Menudetail = (props) => {



    return (
        <View style={styles.flex}>
            <ScrollView style={StyleSheet.flex} >
                <View style={styles.container}>
                    <View style={styles.headerTitle}>
                        <Text style={{ fontSize: 20, color: '#333' }}>메뉴디테일화면</Text>
                    </View>

                    <View >
                        <View style={styles.singleOrder}>
                            <View>
                                <Text style={{ fontSize: 13, color: '#333' }}>{props.dataMenudetail.title}</Text>
                                <Image style={styles.StoreImage} source={{ uri: props.dataMenudetail.preview }} />
                            </View>
                            <View>
                                <View>
                                    <Text style={{ fontSize: 19, color: '#333' }}>{props.dataMenudetail.storename}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 13, color: '#333' }}>Order No: #{props.dataMenudetail.id}</Text>
                                </View>

                                <View style={styles.flexDirection}>
                                    <Text style={{ fontSize: 13, color: '#333' }}>주문하기</Text>
                                </View>
                                <View style={styles.qualityCart}>
                                    <TouchableOpacity onPress={() => props.incCartQuant(item.id)}>
                                        <Icon name="add-circle-outline" size={28} color="#C01C27" />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 20, color: '#333' }}> {item.quantity} </Text>
                                    {item.quantity == 1 ?
                                        <TouchableOpacity onPress={() => props.decCartQuant(item.id)}>
                                            <Icon name="trash" size={28} color="#C01C27" />
                                        </TouchableOpacity>
                                        : <TouchableOpacity onPress={() => props.decCartQuant(item.id)}>
                                            <Icon name="remove-circle-outline" size={28} color="#C01C27" />
                                        </TouchableOpacity>
                                    }
                                </View>

                                <View style={styles.orderPrice}>
                                    <Text style={{ fontSize: 13, color: '#333' }}>금액 : {props.dataMenudetail.price}원</Text>
                                </View>

                            </View>

                        </View>
                    </View>


                </View>
            </ScrollView>
        </View>
    );
}

function makeDateString(temp) {
    return temp.getFullYear() + '년 ' + (temp.getMonth() + 1) + '월 ' + temp.getDate() + '일';
}



const mapStateToProps = (state) => {
    //console.log(state,'state')
    return {
        dataMenudetail: state.menuReducer.dataMenudetail,
        temp: state.menuReducer.temp,
        count: state.menuReducer.count,
    }
}

const mapDispatchToProps = (dispatch) => {
    //console.log(dispatch,'dispatch')
    return {
        addMenuToCart: (item) => dispatch(addMenuToCart(item)),
        removeMenuToCart: () => dispatch(removeMenuToCart()),
        showMenuDetail: (item) => dispatch(showMenuDetail(item)),
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
        width: width - 50,
        height: height - 350,
        //borderRadius: 50
    },
    singleOrder: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 10,
        //flexDirection: 'row',
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
    qualityCart: {
        flexDirection: 'row',
        alignItems: 'center'
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

export default connect(mapStateToProps, mapDispatchToProps)(Menudetail)