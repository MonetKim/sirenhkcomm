
import { View, StyleSheet, Image, Dimensions, RefreshControl, Text } from 'react-native';
import { connect } from 'react-redux'
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { removeMenuToCart ,addMenuToCart,showMenuDetail ,insertCart} from '../redux/menuRedux/action'
const { width, height } = Dimensions.get('window');
const Menudetail = (props) => {

    console.log("데이터카트  "+ JSON.stringify(props.datacart))

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
                            </View>
                            <View>
                                <View>
                                    <Text style={{ fontSize: 19, color: '#333' }}>{props.dataMenudetail.storename}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 13, color: '#333' }}>메뉴설명</Text>
                                    <Text style={{ fontSize: 13, color: '#333' }}>설명Discription : {JSON.stringify(props.dataMenudetail.title)}</Text>
                                </View>
                                <View style={styles.flexDirection}>
                                    <TouchableOpacity onPress={() => props.addMenuToCart(props.dataMenudetail.menu_id)}>
                                        <Text style={{ fontSize: 13, color: '#333' }}>카트담기</Text>
                                    </TouchableOpacity>
                                        <Text style={{ fontSize: 13, color: '#333' }}>          </Text>
                                    <TouchableOpacity onPress={() => props.insertCart(props.dataMenudetail)}>
                                        <Text style={{ fontSize: 13, color: '#333' }}>주문하기</Text>
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMenuToCart: (item) => dispatch(addMenuToCart(item)),
        removeMenuToCart: () => dispatch(removeMenuToCart()),
        showMenuDetail: (item) => dispatch(showMenuDetail(item)),
        insertCart: (item) => dispatch(insertCart(item)),
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

