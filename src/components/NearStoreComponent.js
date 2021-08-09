import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import { navigate } from '../NavigationRef';
import { connect } from 'react-redux'
import { fetchStores, testing, getdist, SetCurStoreInfo } from '../redux/storeRedux/action'
import MapView from 'react-native-maps';
import styled from "styled-components/native";
import { FlatList } from "react-native";
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
import { Icon } from "native-base";
import { sqrt } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");




const NearStoreComponent = (props) => { //여기 한번만 로그인시키고 이후로는 안하도록 해야함 if문써서 만약 데이터카트가 존재하면 그만하도록~
    //if (props.storeinfo.length < 1) {
    //로딩을 줘서 무조건 스테이트가 즉각반영하게해야해!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   
    const [location, setLocation] = useState(
        {
            coords: {
                latitude: props.start_lat, //기본값 서울 중앙
                longitude: props.start_lon
            }
        }
    );
    const [errorMsg, setErrorMsg] = useState(null);
    const [tempAddress, setTempAddress] = useState([]);

    // useEffect(() => {
    //   (async () => {
    //     // let { status } = await Location.requestForegroundPermissionsAsync();
    //     // if (status !== 'granted') {
    //     //   setErrorMsg('Permission to access location was denied');
    //     //   //네비게이트통해서 다른지도화면으로 가주자
    //     // //   await props.fetchStores();
    //     // //    console.log("승인거부할때 나타나는곳"+ JSON.stringify(location));
    //     // //    await props.getdist(location);
    //     // navigate("MenuDetailScreen");
    //     //   return;
    //     // }
    //     //  let locationtt = await Location.getCurrentPositionAsync({});
    //     //    setLocation(locationtt);

    //     //   await props.fetchStores();
    //     //    console.log("승인했을때 나오는곳"+ JSON.stringify(location));
    //         await props.getdist(location);
    //     //    await props.testing(locationtt);

    //     //    console.log("승인햇읗ㄹ때 거리전시"+ JSON.stringify(props.storedist));
    //   })();
    // }, []);
    useEffect(() => {
        const ac = new AbortController();
        props.getdist(location);
    }, []);




    if (Number(props.start_lat) != 37.532600) {
        return (
            <View style={styles.flex}>
                <View style={styles.container}>
                    <View style={styles.headerTitle}>
                        <Text style={{ fontSize: 10, color: '#333' }}>가까운 상점전시</Text>
                    </View>
                    <FlatList
                        //data={props.storeinfo}
                        data={props.storedist.sort((a, b) => (String(a.store_dist)).localeCompare(String(b.store_dist)))}
                        numColumns={1}
                        renderItem={({ item }) => _renderItemLocation(item, props)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <TouchableOpacity onPress={() => navigate("MapStoreScreen")} >
                    <Text style={{ fontSize: 20, color: '#333' }}>                         지도에서 찾기</Text>
                </TouchableOpacity>
            </View>

        );
    }
    else { //위치 허락안햇을때
        return (
            <View style={styles.flex}>
                <View style={styles.container}>
                    <View style={styles.headerTitle}>
                        <Text style={{ fontSize: 10, color: '#333' }}>위치허락안햇다! 전시</Text>
                    </View>
                    <FlatList
                        //data={props.storeinfo}
                        data={props.storeinfo.sort((a, b) => (String(a.store_name)).localeCompare(String(b.store_name)))}
                        numColumns={1}
                        renderItem={({ item }) => _renderItemALL(item, props)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <TouchableOpacity onPress={() => navigate("MapStoreScreen")} >
                    <Text style={{ fontSize: 20, color: '#333' }}>                         지도에서 찾기</Text>
                </TouchableOpacity>
            </View>

        );
    }

    function _renderItemLocation(store) {
        if (store.store_dist <= 10) {
            return (
                <View style={styles.singleFood}>
                    <TouchableOpacity onPress={() => saveStore(store.store_id, store.store_name)}>
                        <View style={styles.singleOrder}>
                            <View>
                                <Text style={{ fontSize: 13, color: '#333' }}>{store.store_id}</Text>
                                <Image style={styles.StoreImage} source={{ uri: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png' }} />
                            </View>
                            <View>
                                <View>
                                    <Text style={{ fontSize: 19, color: '#333' }}>{store.store_name}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 13, color: '#333' }}>주소: #{store.store_address}</Text>
                                </View>
                                <View style={styles.orderPrice}>
                                    <Text style={{ fontSize: 13, color: '#333' }}>금액 : {store.store_dist}KM</Text>
                                </View>
                                <View style={styles.orderPrice}>
                                    <Text style={{ fontSize: 13, color: '#333' }}>{store.store_state}</Text>
                                </View>
                            </View>
                            <View style={styles.viewOrderBtn}>
                                {
                                    store.store_dist >= 1
                                        ? <Text style={{ fontSize: 13, color: '#333' }}>거리  {store.store_dist}KM</Text>
                                        : <Text style={{ fontSize: 13, color: '#333' }}>거리  {Number(store.store_dist) * 1000}M</Text>
                                }
                            </View>

                        </View>
                    </TouchableOpacity>
                </View>
            );
        }

    }

    function _renderItemALL(store) {
        return (
            <View style={styles.singleFood}>
                <TouchableOpacity onPress={() => saveStore(store.store_id, store.store_name)}>
                    <View style={styles.singleOrder}>
                        <View>
                            <Text style={{ fontSize: 13, color: '#333' }}>{store.store_id}</Text>
                            <Image style={styles.StoreImage} source={{ uri: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png' }} />
                        </View>
                        <View>
                            <View>
                                <Text style={{ fontSize: 19, color: '#333' }}>{store.store_name}</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 13, color: '#333' }}>주소: #{store.store_address}</Text>
                            </View>
                            <View style={styles.orderPrice}>
                                <Text style={{ fontSize: 13, color: '#333' }}>상태 : {store.store_state}</Text>
                            </View>
                            <View style={styles.orderPrice}>
                                <Text style={{ fontSize: 13, color: '#333' }}>{store.store_state}</Text>
                            </View>
                        </View>

                    </View>
                </TouchableOpacity>
            </View>
        );



    }



    function saveStore(storeid, storename) {
        Alert.alert(
            String(storename),
            "선택하신 매장이 맞습니까?" + Number(storeid),
            [
                //{ text: '확인', onPress: _gomenu.bind(this) },
                { text: '확인', onPress: () => _gomenu(storeid) },
                { text: '취소', onPress: () => null },
            ],
            { cancelable: true }

        )
    }

    function _gomenu(storeid) {
        props.SetCurStoreInfo(storeid);
        navigate("MenuScreen");
    }

}



const mapStateToProps = (state) => {

    return {
        items: state.commnetsReducer.items,
        loading: state.commnetsReducer.loading,
        storeinfo: state.storeReducer.storeinfo,
        start_lat: state.storeReducer.start_lat,
        start_lon: state.storeReducer.start_lon,
        temp: state.storeReducer.temp,
        storedist: state.storeReducer.storedist,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStores: () => dispatch(fetchStores()),
        testing: (loca) => dispatch(testing(loca)),
        getdist: (dist) => dispatch(getdist(dist)),
        SetCurStoreInfo: (storeid) => dispatch(SetCurStoreInfo(storeid)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NearStoreComponent)



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

