import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import { navigate } from '../NavigationRef';
import { connect } from 'react-redux'
import { fetchStores, testing, getdist } from '../redux/storeRedux/action'
import MapView from 'react-native-maps';
import styled from "styled-components/native";
import { FlatList } from "react-native";
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
} from "react-native";
import { Icon } from "native-base";
import { sqrt } from "react-native-reanimated";
import haversine from 'haversine'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { width, height } = Dimensions.get("window");




const HomeComponent = (props) => {
    /* 홈에서 처음 현재위치를 설정해준다. 만약 거절할시 현재위치를 기본값으로 세팅한다. */
    const [location, setLocation] = useState(
        {
            coords: {
                latitude: 37.532600, //기본값 서울 중앙
                longitude: -127.024612
            }
        }
    );
    /*  */
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                //스토어정보 갖고오기
                await props.fetchStores();
                console.log("승인거부할때 나타나는곳" + JSON.stringify(location));
                await props.getdist(location);
                return;
            }
            else {
                let locationtt = await Location.getCurrentPositionAsync({});
                setLocation(locationtt);

                await props.fetchStores();

                //    console.log("홈화면 인포전시"+ JSON.stringify(props.storeinfo));
                //    console.log("홈화면 셋로케이션 전시"+ JSON.stringify(location));
                //    console.log("홈화면 셋로케이션tt 전시"+ JSON.stringify(locationtt));

                await props.getdist(locationtt);
                await props.testing(locationtt);

                //  console.log("홈화면 디스턴스 전시"+ JSON.stringify(props.storedist));
            }

        })();
    }, []);






    return (

        <View style={styles.container}>
            <View style={styles.container}>
                <Text>홈 페이지 입니다.</Text>
            </View>

            <View style={styles.allover}>
                <TouchableOpacity onPress={() => navigate("CartScreen")} >
                    <Icon name='ios-cart-outline' style={{ paddingRight: 1 }} />
                </TouchableOpacity>
            </View>

            <View style={styles.alloverblue}>
                <TouchableOpacity onPress={() => navigate("CartScreen")} >
                    <Text>1</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.alloverall}>
                <TouchableOpacity onPress={() => navigate("CartScreen")} >
                    <Text>2</Text>
                </TouchableOpacity>
            </View>

        </View>
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
        storedist: state.storeReducer.storedist,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStores: () => dispatch(fetchStores()),
        testing: (loca) => dispatch(testing(loca)),
        getdist: (dist) => dispatch(getdist(dist)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp('5%'),
        backgroundColor: 'white',
    },
    wrapContent: {
        width: wp('90%'),
        height: wp('30%'),
        paddingBottom: wp('5%'),

    },
    content: {
        width: "100%",
        height: "100%",
        backgroundColor: "#888",
    },
    allover: {
        position: 'absolute',
        top: '90%',

        //bottom:50,

        left: '80%',

        //right:50

    },
    alloverblue: {
        position: 'absolute',
        top: '88.3%',

        //bottom:50,

        left: '85.5%',

        //right:50

    },
    alloverall: {
        position: 'absolute',
        top: '0.3%',

        //bottom:50,

        left: '93.5%',

        //right:50

    },
})