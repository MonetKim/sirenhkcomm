import * as Location from "expo-location";
import React, {useState,  useEffect } from "react";
import { navigate } from '../NavigationRef';
import { connect } from 'react-redux'
import { fetchStores, testing,getdist } from '../redux/storeRedux/action'
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

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const { width, height } = Dimensions.get("window");


    

const HomeComponent = (props) => { //여기 한번만 로그인시키고 이후로는 안하도록 해야함 if문써서 만약 데이터카트가 존재하면 그만하도록~
    //if (props.storeinfo.length < 1) {
 //로딩을 줘서 무조건 스테이트가 즉각반영하게해야해!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   
        const [location, setLocation] = useState(
            {
                coords: {
                    latitude: 37.532600, //기본값 서울 중앙
                    longitude: -127.024612
                }
            }
        );
        const [loading, setLoading] = useState(true);
        const [tempAddress, setTempAddress] = useState([]);
      
        useEffect(() => {
          (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              //네비게이트통해서 다른지도화면으로 가주자
               await props.fetchStores();
                console.log("승인거부할때 나타나는곳"+ JSON.stringify(location));
                await props.getdist(location);
            //navigate("MenuDetailScreen");
              return;
            }
            else{
                let locationtt = await Location.getCurrentPositionAsync({});
               setLocation(locationtt);
               
               await props.fetchStores();

            //    console.log("홈화면 인포전시"+ JSON.stringify(props.storeinfo));
            //    console.log("홈화면 셋로케이션 전시"+ JSON.stringify(location));
            //    console.log("홈화면 셋로케이션tt 전시"+ JSON.stringify(locationtt));

               await props.getdist(locationtt);
               await props.testing(locationtt);
               setLoading(false);

             //  console.log("홈화면 디스턴스 전시"+ JSON.stringify(props.storedist));
            }
             
          })();
        }, []);
   


   
    
    
    return (
        
        <View style={styles.container}>     
        <View style={styles.wrapContent}>
            <View style={styles.content} ></View>
        </View>
        <View style={styles.wrapContent}>
            <View style={styles.content}></View>
        </View>
        <View style={styles.wrapContent}>
            <View style={styles.content}></View>
        </View>
        <View style={styles.wrapContent}>
            <View style={styles.content}></View>
        </View>
        <View style={styles.wrapContent}>
            <View style={styles.content}></View>
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
        temp:  state.storeReducer.temp,
        storedist:  state.storeReducer.storedist,
        
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
    }
})