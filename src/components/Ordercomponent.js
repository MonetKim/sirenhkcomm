
import { View, StyleSheet, Image, Dimensions, RefreshControl, Text } from 'react-native';
import { connect } from 'react-redux'

import React, { useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { getOrderresults, getOrderresultsDetail } from '../redux/orderRedux/action'
//import FlatText from '../components/FlatText';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { Icon } from 'native-base';
const { width } = Dimensions.get('window');
const Ordercomponent = (props) => {

    useEffect(() => {
        props.getOrderresults(56)
    }, [])
    useEffect(() => {
        props.getOrderresultsDetail(56)
    }, [])
    function showorderdetail(temp) {

        var sum = '';
    
        //props.getOrderresultsDetail(temp);
        for (var i = 0; i < props.orderresult.length; i++) {
            sum = sum +' ' +'i'
        }
        return  <View style={styles.orderPrice}>
                 <Text style={{ fontSize: 13, color: '#333' }}>메뉴아이디 : {sum}입니다</Text>
                </View>
    }

    
    return (
        <View style={styles.flex}>
            <ScrollView style={StyleSheet.flex} >
                <View style={styles.container}>
                    <View style={styles.headerTitle}>
                        <Text style={{ fontSize: 20, color: '#333' }}>Alsl Ordesrs{props.temp}</Text>
                    </View>
                    {
                        props.dataOrder.map((order, i) => {
                            //props.dataCart.map((order,i) => {
                            return (

                                <TouchableOpacity key={i}>
                                    <View style={styles.singleOrder}>
                                        <View>
                                            <Text style={{ fontSize: 13, color: '#333' }}>{order.orderdate}</Text>
                                            <Image style={styles.StoreImage} source={{ uri: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png' }} />
                                        </View>
                                        <View>
                                            <View>
                                                <Text style={{ fontSize: 19, color: '#333' }}>{order.title}</Text>
                                            </View>
                                            <View>
                                                <Text style={{ fontSize: 13, color: '#333' }}>Order No: #{order.order_id}</Text>
                                            </View>
                                            <View style={styles.orderPrice}>
                                                <Text style={{ fontSize: 13, color: '#333' }}>금액 : {order.totalprice}원</Text>
                                            </View>
                                            
                                            {showorderdetail(order.order_id)}
                                        </View>
                                        <View style={styles.viewOrderBtn}>
                                            <Icon name="eye" color="#fff" />
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
    return temp.getFullYear() + '년 ' + (temp.getMonth() + 1) + '월 ' + temp.getDate() + '일';
}


const mapStateToProps = (state) => {
    return {
        dataOrder: state.orderReducer.dataOrder,
        orderresult: state.orderReducer.orderresult,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOrderresults: (item) => dispatch(getOrderresults(item)),
        getOrderresultsDetail: (item) => dispatch(getOrderresultsDetail(item)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ordercomponent)

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


