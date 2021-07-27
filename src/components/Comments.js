import * as Location from "expo-location";
import React, {useState,  useEffect } from "react";
import { navigate } from '../NavigationRef';
import { connect } from 'react-redux'
import { fetchStores, testing } from '../redux/storeRedux/action'

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
const { width, height } = Dimensions.get("window");


    

const Comments = (props) => { //여기 한번만 로그인시키고 이후로는 안하도록 해야함 if문써서 만약 데이터카트가 존재하면 그만하도록~
    //if (props.storeinfo.length < 1) {
    useEffect(() => {
        props.fetchStores()
    }, [])


    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        console.log(props.start_lat+"코드가 어케실행되는거야"+props.temp)
        const {coords : {latitude, longitude}}  = await Location.getCurrentPositionAsync();
            console.log(latitude, longitude);
            props.testing(latitude, longitude);
            console.log(props.start_lat+"실행후야"+props.temp)
            // let location = await Location.getCurrentPositionAsync({});
           // setLocation(location);
      })();
    }, []);
  
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }

 
    

   
    console.log(props.start_lat+"행복하지마요 행복하려면"+props.temp)
    console.log("더이상 아무것도 하기싫어"+JSON.stringify(location))

    //}
    //const commnetsItems = landing ? <View>로딩중</View> :
    return (
        //props.loading ? <View><Text>kjidfng</Text></View> :
        // <View style={styles.flex}>
        //   <ScrollView style={StyleSheet.flex} >
        //       <View style={styles.container}>
        //           <View style={styles.headerTitle}>
        //           <TouchableOpacity onPress={() => props.testing()}><Text>!@#!@#</Text></TouchableOpacity>
        //               <Text style ={{fontSize : 20 ,color : '#333'}}>All Ordersassd</Text>
        //           </View>
        //           {

        //               props.items.map((order,i) => {
        //                //props.dataCart.map((order,i) => {
        //                   return(

        //                       <TouchableOpacity key={i}>
        //                           <View style={styles.singleOrder}>
        //                                <View>
        //                                 <Text style ={{fontSize : 13 ,color : '#333'}}>{ order.email}</Text>   
        //                                 </View>
        //                                <View>
        //                                   <View>
        //                                       <Text style ={{fontSize : 19 ,color : '#333'}}>{order.name}</Text>
        //                                   </View>
        //                                   <View>
        //                                       <Text style ={{fontSize : 13 ,color : '#333'}}>Order No: #{order.password}</Text>
        //                                   </View>
        //                                   <View style={styles.orderPrice}>
        //                                       <Text style ={{fontSize : 13 ,color : '#333'}}>금액 : {order.phone}원</Text>
        //                                   </View>
        //                               </View>
        //                               <View style={styles.viewOrderBtn}>
        //                                   <Icon name="eye"  color="#fff" />
        //                               </View>
        //                           </View>
        //                       </TouchableOpacity>
        //                   )
        //               })
        //           }
        //       </View>
        //   </ScrollView>
        // </View>

        <MapView
            style={{ flex: 1 }}
            initialRegion={{

                //허용안하면  전시 기본값으로 설정해야함.
                //허용시일때만임  0726 퇴근기준 location.coords.latitude
               
                latitude: (location != null ? location.coords.latitude : 37.532600),
                longitude: (location != null ? location.coords.longitude : 127.024612),
                //latitude: location.coords.latitude,
                //longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }}
        >
            {
                props.storeinfo.map((maploca, i) => {
                    return (
                        <MapView.Marker key={i}
                                
                            coordinate={{
                                latitude: Number(maploca.store_lat),
                                longitude: Number(maploca.store_lon),
                                //latitude: 37.532600,
                                //longitude: 127.024612,
                            }}
                            title={maploca.store_name}
                            //title ={props.start_lat}
                            description={maploca.store_state}
                        />
                    )
                })
            }
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
        temp:  state.storeReducer.temp,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStores: () => dispatch(fetchStores()),
        testing: () => dispatch(testing()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comments)



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

