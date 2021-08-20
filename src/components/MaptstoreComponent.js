import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import { navigate } from '../NavigationRef';
import { connect } from 'react-redux'
import { fetchStores, SetCurStoreInfo } from '../redux/storeRedux/action'
import { StackActions, NavigationActions } from 'react-navigation';
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
const { width, height } = Dimensions.get("window");




const MaptstoreComponent = (props) => { //여기 한번만 로그인시키고 이후로는 안하도록 해야함 if문써서 만약 데이터카트가 존재하면 그만하도록~
    //if (props.storeinfo.length < 1) {
    //로딩을 줘서 무조건 스테이트가 즉각반영하게해야해!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    useEffect(() => {
        props.fetchStores()
    }, [])


    // function saveStore(storeid,storename) {
    //     Alert.alert(
    //         String(storename),
    //         "선택하신"+String(storename)+"맞습니까?",
    //         [
    //             { text: '확인', onPress: navigate("MenuScreen") },
    //             { text: '취소', onPress: () => null },
    //         ],
    //         { cancelable: true }  
                    // 35 45    const 80 react 90   70  240  300 640 600                
    //     )
    // }

    function saveStore(storeid, storename) {
        Alert.alert(
            String(storename),
            "선택하신 매장이 맞습니까? " + Number(storeid),
            [
                //{ text: '확인', onPress: _gomenu.bind(this) },
                { text: '확인', onPress: () => _gomenu(storeid) },
                { text: '취소', onPress: () => null },
            ],
            { cancelable: true }

        )
    }

    function _gomenu(storeid){
        // const resetAction = StackActions.reset({
        //     index: 0,
        //     key: null,
        //     actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })],
        //     //actions: [NavigationActions.navigate({ routeName: 'SomethingScreen' })],
        // });
        // navigation.dispatch(resetAction);
        
        //스토어 아이디 테이블에 저장해야함...
        props.SetCurStoreInfo(storeid);
        navigate("MenuScreen");
    }
   
    return (
        

        <MapView
            style={{ flex: 1 }}
            initialRegion={{

                //허용안하면  전시 기본값으로 설정해야함.
                //허용시일때만임  0726 퇴근기준 location.coords.latitude

                //latitude: (location != null ? location.coords.latitude : 37.532600),
                //longitude: (location != null ? location.coords.longitude : 127.024612),
                latitude: Number(props.start_lat),
                longitude: Number(props.start_lon),
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0007
            }}
        >
            {
                props.storeinfo.map((maploca, i) => {
                    return (
                        <MapView.Marker key={i}

                            coordinate={{
                                latitude: Number(maploca.store_lat),
                                longitude: Number(maploca.store_lon),
                            }}
                            title={maploca.store_name}
                            description={maploca.store_state}
                            onPress={() => saveStore(maploca.store_id,maploca.store_name)}
                            image={{uri: 'https://hkclient.herokuapp.com/images/jihokim.jpg'}}
                        />
                    )
                })
            }
            <MapView.Marker

                coordinate={{
                    latitude: Number(props.start_lat),
                    longitude: Number(props.start_lon),
                }}
                title="현재위치"
                pinColor={'green'}
            />

        </MapView>
    );

    

}


const mapStateToProps = (state) => {

    return {
        items: state.commnetsReducer.items,
        loading: state.commnetsReducer.loading,
        storeinfo: state.storeReducer.storeinfo,
        start_lat: state.storeReducer.start_lat,
        start_lon: state.storeReducer.start_lon,
        temp: state.storeReducer.temp,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStores: () => dispatch(fetchStores()),
        SetCurStoreInfo: (storeid) => dispatch(SetCurStoreInfo(storeid)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MaptstoreComponent)



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

