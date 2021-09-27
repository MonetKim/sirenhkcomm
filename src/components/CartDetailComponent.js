
import { getOrderresults, getOrderresultsDetail } from '../redux/orderRedux/action'
import React, { useEffect, useContext, useState } from "react";
import { Context as UserContext } from '../dataStore/userAccessContext';
import { removeAllCart } from '../redux/menuRedux/action'
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
    console.log(JSON.stringify(msg) + "       ASDASDAS")
    return (
        <View style={styles.flex}>
            <ScrollView style={styles.scrollHeight} >
                <View><Text>주문 정보 확인</Text></View>
                <View><Text>주문 하신 매장은 {getstoreinfo(props.current_store_info)} 입니다.</Text></View>
                <View><Text>주문자 {msg[0].name}(글자색, 백그라운드설정)</Text></View>
                <View><Text>주문자 전화번호 {msg[0].phone}(글자색, 백그라운드설정)</Text></View>
                {
                    props.datacart.map((item, i) => {
                        return (
                            <View style={styles.singleCartItem} key={i}>
                                <Image style={styles.cartItemImage} source={{ uri: item.imageview }} />
                                <View style={styles.widthSection}>
                                    
                                    <View style={styles.cartRightSection}>
                                    <Text style={{ fontSize: 16, color: '#333' }}> {item.title}</Text>
                                            <Text style={{ fontSize: 16, color: '#333' }}>{(
                                            item.price +
                                            findOptionPrice(item.menu_option_insert) +
                                            findOptionPrice(item.taste_option_insert) +
                                            findOptionPrice(item.add_option_insert)
                                        )
                                        }</Text>
                                    </View>
                                    {
                                        findOptionName(item.menu_option_insert) == 0 ? <View></View> :
                                            <Text > {findOptionName(item.menu_option_insert)}</Text>
                                    }
                                    {
                                        findOptionName(item.taste_option_insert) == 0 ? <View></View> :
                                            <Text> {findOptionName(item.taste_option_insert)}</Text>
                                    }
                                    {
                                        findOptionName(item.add_option_insert) == 0 ? <View></View> :
                                            <Text> {findOptionName(item.add_option_insert)}</Text>
                                    }
                                    <View style={styles.cartRightSection}>
                                        <Text> 수량 </Text>
                                            <Text>{item.quantity} </Text>
                                    </View>
                                    <View style={styles.cartRightSection}>
                                       <Text style={{ fontSize: 16, color: '#333' }}> 합계 </Text>
                                        <Text style={{ fontSize: 16, color: '#333' }}> {(
                                            item.price +
                                            findOptionPrice(item.menu_option_insert) +
                                            findOptionPrice(item.taste_option_insert) +
                                            findOptionPrice(item.add_option_insert)
                                        )*item.quantity
                                        }</Text>
                                    </View>
                                </View>
                            </View>

                        )
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
    function handleConfirm(time) {
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
    function total() { //데이터카트에 닮긴 옵션가격도 추가해주자.
        var total = 0;
        const cart = props.datacart;
        for (var i = 0; i < cart.length; i++) {
            total = total + ((cart[i].price
                + findOptionPrice(cart[i].menu_option_insert)
                + findOptionPrice(cart[i].taste_option_insert)
                + findOptionPrice(cart[i].add_option_insert)         // 체크박스로 변경될시 여러개들어올것 체크 가격부분 저장 콤마로 나누기등등 다 고려해야함
            )
                * cart[i].quantity);
        }
        var total_price = total;
        return total_price;
    }

    //옵션 이름찾기
    function findOptionName(option_num) {
        if (option_num === null) {
            return 0;
        }
        for (var i = 0; i < props.option.length; i++) {
            if (props.option[i].option_id == option_num)
                return props.option[i].option_name;
        }
    }
    //옵션 가격찾기
    function findOptionPrice(option_num) {
        if (option_num === null) {
            return 0;
        }
        for (var i = 0; i < props.option.length; i++) {
            if (props.option[i].option_id == option_num)
                return props.option[i].option_price;
        }
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
                for (var i = 0; i < props.datacart.length; i++) {
                    let imageview = props.datacart[i].imageview;
                    let menu_id = props.datacart[i].menu_id;
                    let menu_price = props.datacart[i].price;
                    let quantity = props.datacart[i].quantity;
                    let store_id = props.current_store_info;
                    let title = props.datacart[i].title;
                    let store_name = getstoreinfo(props.current_store_info);
                    let menu_option = props.datacart[i].menu_option_insert;
                    let taste_option = props.datacart[i].taste_option_insert;
                    let add_option = props.datacart[i].add_option_insert;
                    console.log("적당히해    " + JSON.stringify(props.datacart[i]));
                    await API.post("user/orderdetail", {
                        imageview,
                        user_id,
                        menu_id,
                        store_id,
                        menu_price,
                        quantity,
                        title,
                        store_name,
                        menu_option,
                        taste_option,
                        add_option
                    })
                }
            }
            else {

            }
        }
        catch {
            //오류구성해주자...
        }
        finally {
            if (total() != 0) { //이부분 반드시수정하자 0901  김태현 금액말고 전시되는것이없는경우로하자
                props.removeAllCart();
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
        datacart: state.menuReducer.datacart,
        current_store_info: state.storeReducer.current_store_info,
        storeinfo: state.storeReducer.storeinfo,
        option: state.menuReducer.option,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeMenuToCart: () => dispatch(removeMenuToCart()),
        getOrderresults: (item) => dispatch(getOrderresults(item)),
        getOrderresultsDetail: (item) => dispatch(getOrderresultsDetail(item)),
        removeAllCart: () => dispatch(removeAllCart()),
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
        marginTop: 3,
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