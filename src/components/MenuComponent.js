import React, { useEffect, useContext, useState } from "react";
import { navigate } from '../NavigationRef';
import { connect } from 'react-redux'
import { removeMenuToCart, addMenuToCart, showMenuDetail, fetchGetmenus, fetchGetOption, changeCategory ,fetchGetRoasting} from '../redux/menuRedux/action'
import { fetchStores, testing, getdist, SetCurStoreInfo } from '../redux/storeRedux/action'
import styled from "styled-components/native";
import { FlatList } from "react-native";
import { Context as UserContext } from '../dataStore/userAccessContext';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
  ImageBackground,
} from "react-native";
import { Icon } from "native-base";
const { width, height } = Dimensions.get("window");





const MenuComponent = (props) => {

  const { state } = useContext(UserContext);
  const { msg } = state;
  if (props.dataFood.length < 1) {
    useEffect(() => {
      props.fetchGetmenus();
      props.fetchGetOption();
    }, [msg])
  }
  
  
  /*  매장이 선택되어 있지 않을 시 매장선택화면으로 이동 전 데이터설정 */
  /*  매장이 선택되어 있지 않을 시 매장선택화면으로 이동 s */
  function _gostore() {

    let location = 
      {
        coords: {
          latitude: props.start_lat, //기본값 서울 중앙
          longitude: props.start_lon
        }
      }
    
    console.log("로케이션 위치 알림 " + JSON.stringify(location));
    props.fetchStores();
    props.getdist(location);
    Alert.alert(
      "매장이 선택되어있지 않습니다",
      `매장을 먼전 선택하세요`,
      [

        { text: "확인", onPress: () => navigate("NearStoreScreen") }
      ],
      { cancelable: false }
    );
  }
  /* 스토어아이디로 스토어이름 찾기 */
  function getstoreinfo(matchstoreid) {
    for (var i = 0; i < props.storeinfo.length; i++) {
      if (props.storeinfo[i].store_id == matchstoreid)
        return props.storeinfo[i].store_name
    }
  }


  /* 현재 매장 미선택되어 있을때 전시화면;  */
  if (props.current_store_info === null) {
    return (
      <View style={styles.gostore}>
        <Text style={{ fontSize: 23, color: '#333' }}> {props.current_store_info} 매장을 먼저 선택해 주세요</Text>
        <TouchableOpacity onPress={() => _gostore()}>
          <Text style={{ fontSize: 20, color: '#333' }}> 매장 찾기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /*  매장이 선택되어 있을때 메뉴전시 */
  else {
    return (
      <View style={styles.flex}>
        <View style={styles.navs}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={() => props.changeCategory(1)} style={[styles.navs_link, props.category==1 ? styles.navs_link__active : ""]}>
            <Text style={styles.navs_link__text}>AMERICANO</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.changeCategory(2)} style={[styles.navs_link, props.category==2 ? styles.navs_link__active : ""]}>
            <Text style={styles.navs_link__text}>COFFEE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.changeCategory(3)} style={[styles.navs_link, props.category==3 ? styles.navs_link__active : ""]}>
            <Text style={styles.navs_link__text}>NON-COFFEE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.changeCategory(4)} style={[styles.navs_link, props.category==4 ? styles.navs_link__active : ""]}>
            <Text style={styles.navs_link__text}>ESPRESSO</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.changeCategory(5)} style={[styles.navs_link, props.category==5 ? styles.navs_link__active : ""]}>
            <Text style={styles.navs_link__text}>BAKERY</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.changeCategory(6)} style={[styles.navs_link, props.category==6 ? styles.navs_link__active : ""]}>
            <Text style={styles.navs_link__text}>MD</Text>
          </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.foodList}>
          <FlatList
            data={props.dataFood}
            numColumns={2}
            renderItem={({ item }) => _renderItemFood(item, props)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={styles.allstorebar}>
        </View>
        <View style={styles.allover}>
          <TouchableOpacity onPress={() => navigate("CartScreen")} >
            <Icon name='ios-cart-outline' style={{ paddingRight: 1 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.alloverblue}>
          <TouchableOpacity onPress={() => navigate("CartScreen")} >
            <Text>{getCartnum()}</Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
  function _renderItemFood(item) { /* 스위치문으로 만들지 고민 */
    if (item.category == props.category ) { /* 선택한 카테고리가 1일때  */
        return (
          <View style={styles.singleFood}>
            <TouchableOpacity onPress={() => onClickShowMenu(item.menu_id)}>
              <View>
                <Image style={styles.foodImage} source={{ uri: item.imageview }} />

                <View style={styles.foodTitle}>
                  <Text> {item.title}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
    }
    return null;
  }

  /*  카트아이콘에 숫자표시 하기위한 카트 아이템 수 구하기 */
  function getCartnum() {
    let num = props.datacart.length;
    
    return num;
  }
  /* 메뉴클릭시 상세화면으로 이동 */
  function onClickShowMenu(menu_id) {
    props.showMenuDetail(menu_id);
    props.fetchGetRoasting(props.current_store_info,menu_id);
    navigate("MenuDetailScreen");
  }
}





const mapStateToProps = (state) => {
  return {
    dataFood: state.menuReducer.dataFood,
    current_store_info: state.storeReducer.current_store_info,
    category: state.menuReducer.category,
    start_lat: state.storeReducer.start_lat,
    start_lon: state.storeReducer.start_lon,
    storeinfo: state.storeReducer.storeinfo,
    roasting: state.menuReducer.roasting,
    datacart: state.menuReducer.datacart,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMenuToCart: (item) => dispatch(addMenuToCart(item)),
    removeMenuToCart: () => dispatch(removeMenuToCart()),
    showMenuDetail: (item) => dispatch(showMenuDetail(item)),
    fetchGetmenus: () => dispatch(fetchGetmenus()),
    fetchGetOption: () => dispatch(fetchGetOption()),
    changeCategory: (item) => dispatch(changeCategory(item)),
    fetchStores: () => dispatch(fetchStores()),
    getdist: (dist) => dispatch(getdist(dist)),
    fetchGetRoasting: (store_id,menu_id) => dispatch(fetchGetRoasting(store_id,menu_id)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent)



const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  padding: 15px 20px;
`;
const ItemTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;
const ItemTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;
const ItemDesc = styled.Text`
  font-size: 16px;
  margin-top: 5px;
`;
const ItemTime = styled.Text`
  font-size: 12px;
`;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  backgroundImage: {
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0
  },
  flex: {
    flex: 1,
  },
  navs : {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navs_link : {
    backgroundColor : "#bdc3c7",
    height : 40,
    paddingHorizontal : 15,
    paddingVertical : 8,
    borderRadius : 30,
    width : 110, 
    marginRight : 5,
    justifyContent: "center",
    alignItems: "center"
  },
navs_link__active : {
    backgroundColor : "#090040",
    justifyContent: "center",
    alignItems: "center"
  },
  navs_link__text : {
    color : 'white',
    alignSelf : "center",
    fontSize : 13,
  },
  foodList: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flex: 1
  },
  singleFood: {
    width: ((width / 2) - 20) - 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginRight: 20,
    marginBottom: 20
  },
  foodImage: {
    width: '100%',
    height: 150,
    borderRadius: 5
  },
  foodPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  foodTitle: {
    marginTop: 10,
    marginBottom: 5,
    alignItems: 'center'
  },
  menucategory: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  gostore: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    left: '85.5%',
  },
  allovertop: {
    position: 'absolute',
    top: '1%',
    left: '96.5%',
  },
  allstorebar: {
    position: 'absolute',
    top: '90.7%',
    left: '10%',
  }
});
