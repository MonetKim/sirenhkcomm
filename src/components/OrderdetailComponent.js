
import { View, StyleSheet, Image, Dimensions, RefreshControl, Text } from 'react-native';
import { connect } from 'react-redux'

import React, { Component } from 'react';
import { FlatList } from "react-native";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'native-base';
import { navigate } from '../NavigationRef';
const { width, height } = Dimensions.get('window');
const Orderdetail = (props) => {

    function findOptionName(option_num) {
        for (var i = 0; i < props.option.length; i++) {
            if (props.option[i].option_id == option_num)
                return props.option[i].option_name;
        }
    }
    //옵션 가격찾기
    function findOptionPrice(option_num) {
        for (var i = 0; i < props.option.length; i++) {
            if (props.option[i].option_id == option_num)
                return props.option[i].option_price;
        }
    }

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
                                    <Text style={{ fontSize: 13, color: '#333' }}>전화번호 : {props.datastoredetail.store_tel}</Text>
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
                                <View style={styles.flexstart} >
                                    <Text style={{ fontSize: 20, color: '#333' }}>
                                        주문 메뉴
                                    </Text>
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
                                            <View style={styles.singleFood} key={i}>
                                                <View style={styles.multiMenu}>
                                                    <View style={styles.imageviewst}>
                                                        <Image style={styles.OrderImages} source={{ uri: item.imageview }} />
                                                    </View>
                                                    <View>
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
                                                            <View style={styles.cartRightSection}>
                                                                {
                                                                    findOptionName(item.menu_option) == 0 ? <View></View> :
                                                                        <Text> {findOptionName(item.menu_option)}</Text>
                                                                }
                                                                {
                                                                    findOptionPrice(item.menu_option) == 0 ? <View></View> :
                                                                        <Text> {findOptionPrice(item.menu_option)}</Text>
                                                                }
                                                            </View>
                                                            <View style={styles.cartRightSection}>
                                                                {
                                                                    findOptionName(item.taste_option) == 0 ? <View></View> :
                                                                        <Text> {findOptionName(item.taste_option)}</Text>
                                                                }
                                                                {
                                                                    findOptionPrice(item.taste_option) == 0 ? <View></View> :
                                                                        <Text> {findOptionPrice(item.taste_option)}</Text>
                                                                }
                                                            </View>
                                                            <View style={styles.cartRightSection}>
                                                                {
                                                                    findOptionName(item.add_option_insert) == 0 ? <View></View> :
                                                                        <Text> {findOptionName(item.add_option)}</Text>
                                                                }
                                                                {
                                                                    findOptionPrice(item.add_option_insert) == 0 ? <View></View> :
                                                                        <Text> {findOptionPrice(item.add_option)}</Text>
                                                                }
                                                            </View>
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
    );//총금액과 주문시간 테이크아웃시간? 네비게이터 뒤로가기만들기 
    function _renderItemOrder(item) {
        if (item.order_id === props.save_orderid) {
            return (
                <View style={styles.singleFood}>
                    <View>
                        <Image style={styles.OrderImages} source={{ uri: item.imageview }} />
                        <View style={styles.foodTitle}>
                            <Text>메뉴이름 : {item.menu_title}</Text>
                        </View>
                        <View style={styles.mainContainer}>
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
    return {
        datastoredetail: state.storeReducer.datastoredetail,
        save_orderid: state.orderReducer.save_orderid,
        orderresult: state.orderReducer.orderresult,
        option: state.menuReducer.option,
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
    OrderImages: {
        width: 80,
        height: 80,
        borderRadius: 50,
        justifyContent: 'flex-start',
    },
    flexstart: {
        justifyContent: 'flex-start',
    },
    singleOrder: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 10,
        //flexDirection: 'row',
        justifyContent: 'space-between',
        //alignItems: 'center'
    },
    multiMenu: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    flexDirection: {
        flexDirection: 'row',
        marginBottom: 5
    },
    orderPrice: {
        marginTop: 7
    },
    imageviewst: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartRightSection: {
        flexDirection: 'row',
        marginTop: 3,
        justifyContent: 'space-between'
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
        justifyContent: 'flex-end',
    }
});

