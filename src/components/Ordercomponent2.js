import { connect } from 'react-redux'
import { navigate } from '../NavigationRef';
import React, { useEffect,useContext } from 'react';
import { getOrderresults, getOrderresultsDetail,showOrderbystoreDetail } from '../redux/orderRedux/action'
import { showStoreDetail } from '../redux/storeRedux/action'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { Context as UserContext } from '../dataStore/userAccessContext';
import { Icon } from 'native-base';
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
} from "react-native";
import { FlatList } from "react-native";
const { width } = Dimensions.get('window');
const Ordercomponent2 = (props) => {

    const {state} = useContext(UserContext);
    const {msg} = state;

    useEffect(() => {
        props.getOrderresults(msg[0].index_id)
    }, [])
    useEffect(() => {
        props.getOrderresultsDetail(msg[0].index_id)
    }, [])
    
    /* 주문에서 주문번호에 따른 메뉴 리스트 요약본만들기 */
    function showorderdetail(temp) {

        var sum = '';
        sum = '';
        var count = 0;
        
        for (var i = 0; i < props.orderresult.length; i++) {
            if(props.orderresult[i].order_id == temp){
                if(count === 0){
                    sum = sum +props.orderresult[i].menu_title ;
                }
                count++;
            }
            //sum = 'tt';
        }
        if(count >1){
            count--;
            sum = sum+' 외 '+ count+'개';
        }
        return sum
    }
    console.log("시간 나오는곳 "+JSON.stringify(props.dataOrder))

    return (
        <View style={styles.flex}>
                <View style={styles.container}>
                    <View style={styles.headerTitle}>
                        <Text style={{ fontSize: 20, color: '#333' }}>안녕하세요 {msg[0].name}님</Text>
                    </View>
                    <FlatList
                       
                        //data={props.dataOrder} 기본데이터 
                        data={props.dataOrder.sort((a, b) => (String(b.timezone)).localeCompare(String(a.timezone)))}
                        numColumns={1}
                        renderItem={({ item }) => _renderItemOrder(item, props)}
                        keyExtractor={(item, index) => index.toString()}
                        //inverted 역순으로 전시

                    />
                </View>
        </View>
    );


    function _renderItemOrder(order) {

        return (
            <View style={styles.singleFood}>
                <TouchableOpacity >
                    <View style={styles.singleOrder}>
                        <View>
                            <Image style={styles.StoreImage} source={require('../../assets/image/coffee/espresso.jpg')} />
                        </View>
                        <View>
                            <View>
                                <Text style={{ fontSize: 13, color: '#333' }}>{(order.timezone).substr(0,10)+" " +(order.timezone).substr(11,5)}</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 13, color: '#333' }}>매장: {order.store_name}</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 13, color: '#333' }}>주문번호: #{order.order_id}</Text>
                            </View>
                            <View style={styles.orderPrice}>
                                <Text style={{ fontSize: 13, color: '#333' }}>금액 : {order.total_price}원</Text>
                            </View>
                            <View style={styles.orderPrice}>
                                <Text style={{ fontSize: 13, color: '#333' }}>{showorderdetail(order.order_id)}</Text>
                            </View>
                        </View>
                        <View style={styles.viewOrderBtn}>
                        <TouchableOpacity onPress={() => onClickOrderdetail(order.store_id,order.order_id)}>
                            <Icon name="eye" color="#fff" />
                            </TouchableOpacity >
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    function onClickOrderdetail(store_id,order_id) {
        props.showOrderbystoreDetail(order_id);
        props.showStoreDetail(store_id);
        navigate("OrderdetailScreen");
        //서버요청필요할시 이부분 리스폰스로 작성하자...
    }
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
        showStoreDetail: (store_id) => dispatch(showStoreDetail(store_id)),
        showOrderbystoreDetail: (order_id) => dispatch(showOrderbystoreDetail(order_id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ordercomponent2)

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


