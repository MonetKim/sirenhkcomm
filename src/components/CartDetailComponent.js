import { Col, Icon } from 'native-base';
import { pushOrders, pushOrderDetails, resetevery } from '../redux/orderRedux/action'
import { incCartQuant, decCartQuant, removeMenuToCart, addMenuToCart, fetchGetmenus } from '../redux/menuRedux/action'
import { getOrderresults, getOrderresultsDetail } from '../redux/orderRedux/action'
import React, { useEffect, useContext, useState } from "react";
import { Context as UserContext } from '../dataStore/userAccessContext';
import { navigate } from '../NavigationRef';
import { Input, Button } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
    Image,
    View,
    Text,
    Alert,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
} from "react-native";
import { connect } from 'react-redux'
import API from "../API/WebService";
const { width } = Dimensions.get('window');


const CartDetailComponent = (props) => {
    const { state } = useContext(UserContext);
    const { msg } = state;
    const [disabled, setDisabled] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [searchstore, setSearchstore] = useState("");
    console.log(JSON.stringify(msg)+"       ASDASDAS")
    return (
        <View style={styles.flex}>
            <ScrollView style={styles.scrollHeight} >
                <View><Text>주문 정보 확인</Text></View>
                <View><Text>주문 하신 매장은 {getstoreinfo(props.current_store_info)} 입니다.</Text></View>
                <View><Text>주문자 {msg[0].name}(글자색, 백그라운드설정)</Text></View>
                <View><Text>주문자 전화번호 {msg[0].phone}(글자색, 백그라운드설정)</Text></View>
                {
                    props.dataFood.map((item, i) => {
                        if (item.iscart) {
                            return (
                                <View style={styles.singleCartItem} key={i}>
                                    <Image style={styles.cartItemImage} source={{ uri: item.imageview }} />
                                    <View style={styles.widthSection}>
                                        <Text> {item.title}</Text>
                                        <View style={styles.cartRightSection}>
                                            <Text> {item.price * item.quantity}</Text>
                                            <View style={styles.qualityCart}>
                                                <Text>수량 : {item.quantity} </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                            )
                        }
                    })
                }
                <View style={styles.cartItem}>
                    <View>
                        <Text style={{ fontSize: 20, color: '#333' }} >총금액</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 20, color: '#333' }} >{total()} 원</Text>
                    </View>
                </View>
                <View style={styles.cartItem}>
                    <Text style={{ fontSize: 20, color: '#333' }} >예상소요시간</Text>
                    <Text style={{ fontSize: 20, color: '#333' }} >30 분</Text>
                </View>
                <View >
                    <Text style={{ fontSize: 20, color: '#333' }} >픽업예약시간</Text>
                    <TouchableOpacity onPress={() => ShowTimePicker()} >
                        <Input
                            
                            placeholder="픽업시간을 정해주세요"
                            value={startDate}
                            editable={false}
                        />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="time"
                            onConfirm={(startDate) => handleConfirm(startDate)}
                            onCancel={hideDatePicker}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View>
                <TouchableOpacity style={styles.bottomButton} disabled={disabled} onPress={() => setOrder(msg[0].index_id, props.current_store_info, total(), true)}>
                    <Text style={{ fontSize: 20, color: '#333' }}>주문하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    /* 시간선택  */
    function ShowTimePicker() {
        setDatePickerVisibility(true);
    }
    function hideDatePicker() {
        setDatePickerVisibility(false);
    }
    function handleConfirm(time){
        console.log("A date has been picked: ", time);
        hideDatePicker(); 
        setStartDate(String(time.format("hh-mm")));
        console.log("저장시간은: ", time);
      };
     
/*
192.168.0.99
250 50 300 

90 65 35 30 50 260 
560 520 
*/

    /*카트에 담긴 총 가격 계산 */
    function total() {
        var total = 0;
        const cart = props.dataFood;
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].iscart) {
                total = total + (cart[i].price * cart[i].quantity)
            }
        }
        var total_price = total;
        return total_price;
    }

    /*매장 아이디로 매장 이름 찾아오기 */
    function getstoreinfo(matchstoreid) {
        for (var i = 0; i < props.storeinfo.length; i++) {
            if (props.storeinfo[i].store_id == matchstoreid)
                return props.storeinfo[i].store_name
        }
    }

    /* DB에 주문리스트 저장하기 */
    async function setOrder(user_id, store_id, totalprice, ischeck) {
        try {
            setDisabled(true);
            if (total() != 0) { /* 장바구니에 담겨져있을때만 가능하도록*/
                let store_name = getstoreinfo(props.current_store_info);
                await API.post("user/order", {       /* db order 에 저장*/
                    user_id,
                    store_id,
                    totalprice,
                    ischeck,
                    store_name,
                });
                /* DB  ordermenu 테이블에 저장 */
                for (var i = 0; i < props.dataFood.length; i++) {
                    if (props.dataFood[i].quantity > 0) {

                        let menu_id = props.dataFood[i].menu_id;
                        let menu_price = props.dataFood[i].price;
                        let quantity = props.dataFood[i].quantity;
                        let store_id = props.current_store_info;
                        let title = props.dataFood[i].title;
                        let store_name = getstoreinfo(props.current_store_info);
                        await API.post("user/orderdetail", {
                            user_id,
                            menu_id,
                            store_id,
                            menu_price,
                            quantity,
                            title,
                            store_name,
                        })
                    }
                }
            }
            else {

            }
        }
        catch {
            //오류구성해주자...
        }
        finally {
            if (total() != 0) {
                props.removeMenuToCart();
                props.getOrderresults(msg[0].index_id);
                props.getOrderresultsDetail(msg[0].index_id);
                saveOrder();
            }
            else {
                rejectOrder();
            }
        }
    }

    function saveOrder() {  /* 주문성공시  */
        Alert.alert(
            "주문이 완료되었습니다.",
            navigate("OrderScreen")

        )
    }
    function rejectOrder() { /* 주문실패시  */
        Alert.alert(
            "장바구니가 비워있습니다.",

        )
    }

}




const mapStateToProps = (state) => {
    return {
        dataFood: state.menuReducer.dataFood,
        dataCart: state.menuReducer.dataCart,
        temp: state.menuReducer.temp,
        count: state.menuReducer.count,
        orderid: state.orderReducer.orderid,
        current_store_info: state.storeReducer.current_store_info,
        storeinfo: state.storeReducer.storeinfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        incCartQuant: (item) => dispatch(incCartQuant(item)),
        decCartQuant: (item) => dispatch(decCartQuant(item)),
        addMenuToCart: (item) => dispatch(addMenuToCart(item)),
        removeMenuToCart: () => dispatch(removeMenuToCart()),
        resetevery: () => dispatch(resetevery()),
        pushOrders: (user_id, store_id, totalprice, ischeck) => dispatch(pushOrders(user_id, store_id, totalprice, ischeck)),
        pushOrderDetails: (order_id, user_id, menu_id, menu_price, quantity) => dispatch(pushOrderDetails(order_id, user_id, menu_id, menu_price, quantity)),
        getOrderresults: (item) => dispatch(getOrderresults(item)),
        getOrderresultsDetail: (item) => dispatch(getOrderresultsDetail(item)),
        fetchGetmenus: () => dispatch(fetchGetmenus()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CartDetailComponent)



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
    cartRightSection: {
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