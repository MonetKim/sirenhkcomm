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
const { width, height } = Dimensions.get("window");


    

const NearStoreComponent = (props) => { //여기 한번만 로그인시키고 이후로는 안하도록 해야함 if문써서 만약 데이터카트가 존재하면 그만하도록~
    //if (props.storeinfo.length < 1) {
 //로딩을 줘서 무조건 스테이트가 즉각반영하게해야해!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   
        const [location, setLocation] = useState(
            {
                coords: {
                    latitude: 37.532600, //기본값 서울 중앙
                    longitude: 127.024612
                }
            }
        );
        const [errorMsg, setErrorMsg] = useState(null);
        const [tempAddress, setTempAddress] = useState([]);
      
        useEffect(() => {
          (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              //네비게이트통해서 다른지도화면으로 가주자
            //   await props.fetchStores();
            //    console.log("승인거부할때 나타나는곳"+ JSON.stringify(location));
            //    await props.getdist(location);
            navigate("MenuDetailScreen");
              return;
            }
             let locationtt = await Location.getCurrentPositionAsync({});
               setLocation(locationtt);
               
               await props.fetchStores();
               console.log("승인했을때 나오는곳"+ JSON.stringify(location));
               await props.getdist(location);
               await props.testing(locationtt);

               console.log("승인햇읗ㄹ때 거리전시"+ JSON.stringify(props.storedist));
          })();
        }, []);
   


   
    
    
    return (
        <View style={styles.flex}>
                <View style={styles.container}>
                    <View style={styles.headerTitle}>
                        <Text style={{ fontSize: 20, color: '#333' }}>가까운 상점전시{JSON.stringify(location)}</Text>
                    </View>
                    <FlatList
                        //data={props.storeinfo}
                        data={props.storedist.sort((a, b) => (a.store_dist).localeCompare(b.store_dist))}
                        numColumns={1}
                        renderItem={({ item }) => _renderItemOrder(item, props)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <TouchableOpacity onPress={() => navigate("MapStoreScreen")} >
                <Text style={{ fontSize: 20, color: '#333' }}>                         지도에서 찾기</Text>
                    </TouchableOpacity>
        </View>
       
    );

}

function _renderItemOrder(store) {
    if(store.store_dist >=0){
    return (
        <View style={styles.singleFood}>
                <TouchableOpacity >
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
                        <Text style={{ fontSize: 13, color: '#333' }}>거리 {store.store_dist}KM</Text>
                        </View>

                    </View>
                </TouchableOpacity>
            </View>
    );
    }

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

