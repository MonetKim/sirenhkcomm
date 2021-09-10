
import { View, StyleSheet, Image, Dimensions, RefreshControl, Text, Alert } from 'react-native';
import { connect } from 'react-redux'
import { CheckBox, Icon } from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RadioButtonRN from 'radio-buttons-react-native';
import React, { useEffect, useContext, useState } from "react";
import { removeMenuToCart, addMenuToCart, showMenuDetail, insertCart, changeCartNum, setDataCart } from '../redux/menuRedux/action'
import { navigate } from '../NavigationRef';
const { width, height } = Dimensions.get('window');
const Menudetail = (props) => {


    const [ische, setIsche] = useState(0);
    const [saveoption, setSaveoption] = useState([]);
    const [menunum, setMenunum] = useState(1);
    const [disabled, setDisabled] = useState(false);
    const [ischeck, setIscheck] = useState(false);
    var cartInsert = JSON.parse(JSON.stringify(props.dataMenudetail));
    console.log(" 현재 임시 변수는  " + JSON.stringify(props.dataMenudetail))

    function testloop(option_num) {
        //setIsche(ische+1);
        var array = option_num.split("?");
        const testdis = array.map(arr =>
            <View key={arr} >
                <Text>{ische}</Text>
                {eachtest(arr)}
            </View>
        );

        //0901 데이터 선택한거 넣어야함
        console.log("어레이는   " + array.length);
        return (
            <View >
                {testdis}
            </View>
        )

    }
    //라디오버튼
    function eachtest(option_display, kind_num) {  //옵션데이터를 리덕스로 갖고오고 옵션 아이디를 arr 담고있다 ,, 찾아올땐  모두 갖고온 옵션데이터에서 배열순서로 갖고오고잇다

        var arrtes = option_display.split(",");
        var contest = [];
        var temp = [];
        temp = JSON.parse(JSON.stringify(props.dataMenudetail));
        temp.title = 'ssibal';console.log("65y56hys" + JSON.stringify(ischeck));
        for (var i = 0; i < arrtes.length; i++) {
            contest = [...contest, { label: props.option[arrtes[i] - 1].option_name+"   +"+props.option[arrtes[i] - 1].option_price, 
                        num: props.option[arrtes[i] - 1].option_id }]
            //setSaveoption(contest);;
        }
        return (
            <View>
                <RadioButtonRN
                    data={contest}
                    initial={1}
                    selectedBtn={(e) => save_option(e.num, kind_num)}
                />
            </View>
        )
    }
    //체크 박스 리스트로 구현하기~~~
    //현재 체크박스는 1개의 항목만임..
    function checkbox_add(option_display, kind_num) {  //옵션데이터를 리덕스로 갖고오고 옵션 아이디를 arr 담고있다 ,, 찾아올땐  모두 갖고온 옵션데이터에서 배열순서로 갖고오고잇다

        var arrtes = option_display.split(",");
        var contest = [];
        for (var i = 0; i < arrtes.length; i++) {
            contest = [...contest, { key: props.option[arrtes[i] - 1].option_name, id: props.option[arrtes[i] - 1].option_id }]
            //setSaveoption(contest);;
        }
        console.log("774325" + JSON.stringify(ischeck));
        return contest.map((item, id) => {
            return (
                <TouchableOpacity style={{ flexDirection: "row" }} key={id}>
                    <CheckBox value = {ischeck} onValueChange ={(newValue)=> setIscheck(newValue)}/>
                    <Text style={{ fontSize: 20, color: '#333' }}>        {item.key}{ischeck}</Text>
                </TouchableOpacity>
            )
        })
    }
    //체크박스 트루 읽기
    function find_checkbox( save_id) {
        setIscheck(!ischeck);
        if(ischeck){
            props.setDataCart(save_id, 4);
        }
        else{
            props.setDataCart('', 4);
        }
    }

    //0831 여기서 현재랑 과거 트루를 비교해서 리턴값정해주기. 
    function save_option(option_num, kind_num) {
        // 이부분 리덕스안통하고 그냥바로 메뉴디테일 값바꺼서 넣ㄱ고 해도 괜찮다고 ????????????????
        //console.log(" 라디오버튼 " + JSON.stringify(cartInsert));
        if (kind_num == 1) {
            props.setDataCart(option_num, 2);
            //cartInsert.menu_option_insert = option_num;
        }
        else if (kind_num == 2) {
            props.setDataCart(option_num, 3);
            //cartInsert.taste_option_insert = option_num;
        }
        else if (kind_num == 3) {  //@@@@@@@@ 체크박스로 교체될시   값 저장을 바꾸는게아니라 체크박스 리스트 읽고 트루인것들만 바꺼야한다
            props.setDataCart(option_num, 4);
            //cartInsert.add_option_insert = option_num;
        }
        console.log(" 저장 잘되고 잇나요? " + JSON.stringify(cartInsert));
    }

    async function save_cart() { //주문하기

        await props.setDataCart(menunum, 1);
        props.dataMenudetail.quantity = menunum;
        console.log(" 모라도 나와야지 ㅡㅡ" + JSON.stringify(props.dataMenudetail));
        if (check_cart()) {
            //중복된 카트데이터찾아서 수량만 증가시키기
        }
        else {
            cartInsert.quantity = menunum;
            props.insertCart(props.dataMenudetail);
        }
        go_cart_screen();
    }
    //알림창 이후 페이지 이동
    function go_cart_screen() {
        Alert.alert(
          "장바구니로 이동 하시겠습니까?",
          ` `,
          [
    
            { text: "네", onPress: () => navigate("CartScreen") },
            { text: '아니오', onPress: () => navigate("MenuScreen") },
          ],
          { cancelable: false }
        );
      }
    // 페이지 새로고침안하면서 옵션이 똑같아지지가않앗음 .
    function check_cart() { //기존 카트에 존재유무 중복체크
        console.log(" 데이터카트이 개수는!  " + JSON.stringify(props.datacart.length))
        var check = false;  // 근데 add_option인경우 여러개선택간으해서 소트한후 비교를해야 정확할듯
        for (var i = 0; i < props.datacart.length; i++) {
            if (props.datacart[i].menu_id == props.dataMenudetail.menu_id &&
                props.datacart[i].menu_option_insert == props.dataMenudetail.menu_option_insert &&
                props.datacart[i].taste_option_insert == props.dataMenudetail.taste_option_insert &&
                props.datacart[i].add_option_insert == props.dataMenudetail.add_option_insert) {
                check = true;
                props.changeCartNum(i, menunum);
                console.log(" 똑같은거 찾은거다@@@@@@@@@@@@@@@@  " + JSON.stringify(props.dataMenudetail))
            }
        }
        return check;
    }

    function get_price() {

        var sum = Number(props.dataMenudetail.price);
        if (props.dataMenudetail.menu_option_insert !== null) {
            sum = sum + Number(props.option[Number(props.dataMenudetail.menu_option_insert) - 1].option_price);
        }
        if (props.dataMenudetail.taste_option_insert !== null) {
            sum = sum + Number(props.option[Number(props.dataMenudetail.taste_option_insert) - 1].option_price);
        }
        if (props.dataMenudetail.add_option_insert !== null) {
            sum = sum + Number(props.option[Number(props.dataMenudetail.add_option_insert) - 1].option_price);
        }
        sum = sum *menunum;
        return sum;
    }


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
                                <Image style={styles.StoreImage} source={{ uri: props.dataMenudetail.imageview }} />

                                <View>
                                    <Text style={{ fontSize: 19, color: '#333' }}>{props.dataMenudetail.storename}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 13, color: '#333' }}>메뉴설명</Text>
                                    <Text style={{ fontSize: 13, color: '#333' }}>설명Discription : {JSON.stringify(props.dataMenudetail.title)}</Text>
                                </View>
                                <View style={styles.rowdisplay}>
                                    <Text style={{ fontSize: 13, color: '#333' }}>가격</Text>
                                    <Text style={{ fontSize: 13, color: '#333' }}>{JSON.stringify(props.dataMenudetail.price)}</Text>
                                </View>
                                <View style={styles.rowdisplay}>
                                    <Text style={{ fontSize: 13, color: '#333' }}>수량</Text>
                                    <View style={styles.qualityCart}>
                                        {menunum == 1 ?
                                            <View></View>
                                            : <TouchableOpacity onPress={() => setMenunum(menunum - 1)}>
                                                <Icon name="remove-outline" size={13} color="#C01C27" />
                                            </TouchableOpacity>
                                        }
                                        <Text style={{ fontSize: 15, color: '#333' }}> {menunum} </Text>
                                        <TouchableOpacity onPress={() => setMenunum(menunum + 1)}>
                                            <Icon name="add-outline" size={13} color="#C01C27" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {
                                    props.dataMenudetail.menu_option == null ?
                                        <View></View>
                                        : <View>
                                            <Text style={{ fontSize: 17, color: '#333' }}>메뉴선택</Text>
                                            {eachtest(props.dataMenudetail.menu_option, 1)}
                                        </View>
                                }
                                {               //탑 보더 주기
                                    props.dataMenudetail.taste_option == null ?
                                        <View></View>
                                        : <View>
                                            <Text style={{ fontSize: 17, color: '#333' }}>맛선택</Text>
                                            {eachtest(props.dataMenudetail.taste_option, 2)}
                                        </View>
                                }
                                {
                                    props.dataMenudetail.add_option == null ?
                                        <View></View>
                                        : <View>
                                            <Text style={{ fontSize: 17, color: '#333' }}>추가선택</Text>
                                            {eachtest(props.dataMenudetail.add_option, 3)}
                                        </View>
                                }
                                <View style={styles.rowdisplay}>
                                    <Text style={{ fontSize: 13, color: '#333' }}>총 금액</Text>
                                    <Text style={{ fontSize: 13, color: '#333' }}>{get_price()}</Text>
                                </View>
                                <View>
                                    <TouchableOpacity style={styles.bottomButton} disabled={disabled} onPress={() => save_cart()}>
                                        <Text style={{ fontSize: 20, color: '#333' }}>장바구니 담기</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
/*  년월일 반환해주는 함수  */
// function makeDateString(temp) {
//     return temp.getFullYear() + '년 ' + (temp.getMonth() + 1) + '월 ' + temp.getDate() + '일';
// }



const mapStateToProps = (state) => {
    return {
        dataMenudetail: state.menuReducer.dataMenudetail,
        datacart: state.menuReducer.datacart,
        temp: state.menuReducer.temp,
        count: state.menuReducer.count,
        option: state.menuReducer.option,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMenuToCart: (item) => dispatch(addMenuToCart(item)),
        removeMenuToCart: () => dispatch(removeMenuToCart()),
        showMenuDetail: (item) => dispatch(showMenuDetail(item)),
        insertCart: (item) => dispatch(insertCart(item)),
        changeCartNum: (item, num) => dispatch(changeCartNum(item, num)),
        setDataCart: (find_menu, item, kind) => dispatch(setDataCart(find_menu, item, kind)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menudetail)

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
    rowdisplay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
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

    bottomButton: {
        alignItems: 'center',
        backgroundColor: '#C01C27',
        paddingVertical: 13
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

