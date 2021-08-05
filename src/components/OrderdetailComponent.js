
import { View, StyleSheet, Image, Dimensions, RefreshControl, Text } from 'react-native';
import { connect } from 'react-redux'

import React, { Component } from 'react';
import { FlatList } from "react-native";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'native-base';
import { navigate } from '../NavigationRef';
const { width, height } = Dimensions.get('window');
const Orderdetail = (props) => {



    return (

        <View style={styles.flex}>
            <ScrollView style={StyleSheet.flex} >
                <View style={styles.container}>
                    <View style={styles.headerTitle}>
                        <Text style={{ fontSize: 20, color: '#333' }}>스토어디테일화면</Text>
                    </View>

                    <View >
                        <View style={styles.singleOrder}>
                            <View>
                                <Text style={{ fontSize: 13, color: '#333' }}>{props.datastoredetail.store_name}</Text>
                                <Image style={styles.StoreImage} source={require('../../assets/image/coffee/espresso.jpg')} />
                            </View>
                            <View>
                                <View>
                                    <Text style={{ fontSize: 19, color: '#333' }}></Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 13, color: '#333' }}>위치 : {props.datastoredetail.store_address}</Text>
                                    <Text style={{ fontSize: 13, color: '#333' }}>전화번호 : ~~~</Text>
                                </View>
                                <View style={styles.flexDirection}>
                                    <TouchableOpacity onPress={() => navigate('MenuScreen')}>
                                        <Text style={{ fontSize: 13, color: '#333' }}>추가항목</Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 13, color: '#333' }}>          </Text>
                                    <TouchableOpacity onPress={() => props.addMenuToCart(props.dataMenudetail.menu_id)}>
                                        <Text style={{ fontSize: 13, color: '#333' }}>추가항목{props.save_orderid}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* <FlatList
                                data={props.orderresult}
                                numColumns={1}
                                renderItem={({ item }) => _renderItemOrder(item, props)}
                                keyExtractor={(item, index) => index.toString()}
                            /> */}
                            {
                                props.orderresult.map((item, i) => {
                                    if (item.order_id === props.save_orderid) {
                                        return (
                                            <View style={styles.singleFood}>
                                                <View>
                                                    <Image style={styles.StoreImage} source={require('../../assets/image/coffee/espresso.jpg')} />

                                                    <View style={styles.foodTitle}>
                                                        <Text>메뉴이름 : {item.menu_title}</Text>
                                                    </View>
                                                    <View style={styles.foodPrice}>
                                                        <View>
                                                            <Text>메뉴 가격 {item.menu_price}</Text>
                                                        </View>
                                                        <View>
                                                            <Text>메뉴 수량 {item.quantity}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        );
                                    }
                                })
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );//총금액과 주문시간 결제방법정도? 네비게이터 뒤로가기만들기 
    function _renderItemOrder(item) {
        if (item.order_id === props.save_orderid) {
            return (
                <View style={styles.singleFood}>
                    <View>
                        <Image style={styles.StoreImage} source={require('../../assets/image/coffee/espresso.jpg')} />

                        <View style={styles.foodTitle}>
                            <Text>메뉴이름 : {item.menu_title}</Text>
                        </View>
                        <View style={styles.foodPrice}>
                            <View>
                                <Text>메뉴 가격 {item.menu_price}</Text>
                            </View>
                            <View>
                                <Text>메뉴 수량 {item.quantity}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
    }


}

function makeDateString(temp) {
    return temp.getFullYear() + '년 ' + (temp.getMonth() + 1) + '월 ' + temp.getDate() + '일';
}



const mapStateToProps = (state) => {
    console.log('오더스토어디테일 넌 스트링 ?' + JSON.stringify(state.storeReducer.datastoredetail));
    return {
        datastoredetail: state.storeReducer.datastoredetail,
        save_orderid: state.orderReducer.save_orderid,
        orderresult: state.orderReducer.orderresult,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orderdetail)

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

