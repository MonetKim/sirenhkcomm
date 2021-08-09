import React, { useEffect, useContext, useState } from "react";
import { navigate } from '../NavigationRef';
import { connect } from 'react-redux'
import { removeMenuToCart, addMenuToCart, showMenuDetail, fetchGetmenus,changeCategory } from '../redux/menuRedux/action'
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
} from "react-native";
import { Icon } from "native-base";
const { width, height } = Dimensions.get("window");





const MenuComponent = (props) => {

  const { state } = useContext(UserContext);
  const { msg } = state;
  if (props.dataFood.length < 1) {
    useEffect(() => {
      props.fetchGetmenus();
    }, [msg])
  }


  function _gostore() {
    Alert.alert(
      "매장이 선택되어있지 않습니다",
      `매장을 먼전 선택하세요`,  
      [
        
        { text: "확인",  onPress:() => navigate("SomethingScreen") }
      ],
      { cancelable: false }
    );
    // Alert.alert(
    //   "매장이 선택되어있지 않습니다. 매장을 먼전 선택하세요",
    //   [
    //     { text: '확인', onPress:() => navigate("SomethingScreen") },
    //   ],
    //   { cancelable: false }
    // )
    //navigate("SomethingScreen");
  }
  if (props.current_store_info === null) {
    return (
      <View >
        <TouchableOpacity onPress={() => _gostore()}>
          <Text > {props.current_store_info} 매장을 먼저 선택해 주세요~~</Text>
        </TouchableOpacity>
      </View>
    );
  }

  //onpress 해서 잘나오면 
  else {
    return (

      <View style={styles.flex}>
        <TouchableOpacity onPress={() => props.removeMenuToCart()}><Text > {msg[0].email} 제목 : {props.category}</Text></TouchableOpacity>
        <View style={styles.menucategory}>
          <TouchableOpacity onPress={() => props.changeCategory(0)}>
            <Text>전체보기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.changeCategory(1)}>
            <Text>음료</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.changeCategory(2)}>
            <Text>빵</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.foodList}>
          <FlatList
            data={props.dataFood}
            numColumns={2}
            renderItem={({ item }) => _renderItemFood(item, props)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>

    );
  }
  function _renderItemFood(item) {
    if (props.category === 1) {
      if (item.category == 1) {
        return (
          <View style={styles.singleFood}>
            <TouchableOpacity onPress={() => onClickShowMenu(item.menu_id)}>
              <View>
                <Image style={styles.foodImage} source={{ uri: item.imageview }}  />

                <View style={styles.foodTitle}>
                  <Text> {item.title}</Text>
                </View>
                <View style={styles.foodPrice}>
                  <View>
                    <Text> {item.price}</Text>
                  </View>
                  <TouchableOpacity onPress={() => props.addMenuToCart(item.menu_id)}>
                    <Icon name="add" size={30} color="#ff3252" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
    }
    else if (props.category === 2) {
      if (item.category == 2) {
        return (
          <View style={styles.singleFood}>
            <TouchableOpacity onPress={() => onClickShowMenu(item.menu_id)}>
              <View>
                <Image style={styles.foodImage} source={{ uri: item.imageview }}  />
                <View style={styles.foodTitle}>
                  <Text> {item.title}</Text>
                </View>
                <View style={styles.foodPrice}>
                  <View>
                    <Text> {item.price}</Text>
                  </View>
                  <TouchableOpacity onPress={() => props.addMenuToCart(item.menu_id)}>
                    <Icon name="add" size={30} color="#ff3252" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
    }
    else {
    return (
      <View style={styles.singleFood}>
        <TouchableOpacity onPress={() => onClickShowMenu(item.menu_id)}>
          <View>

            <Image style={styles.foodImage} source={{ uri: item.imageview }} />
            <View style={styles.foodTitle}>
              <Text> {item.title}</Text>
            </View>
            <View style={styles.foodPrice}>
              <View>
                <Text> {item.price}</Text>
              </View>
              <TouchableOpacity onPress={() => props.addMenuToCart(item.menu_id)}>
                <Icon name="add" size={30} color="#ff3252" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
    }
  }

  function onClickShowMenu(data) {
    props.showMenuDetail(data);
    navigate("MenuDetailScreen");
    //navigate("TestScreen");
  }
}





const mapStateToProps = (state) => {
  return {
    dataFood: state.menuReducer.dataFood,
    temp: state.menuReducer.temp,
    count: state.menuReducer.count,
    current_store_info: state.storeReducer.current_store_info,
    category: state.menuReducer.category,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMenuToCart: (item) => dispatch(addMenuToCart(item)),
    removeMenuToCart: () => dispatch(removeMenuToCart()),
    showMenuDetail: (item) => dispatch(showMenuDetail(item)),
    fetchGetmenus: () => dispatch(fetchGetmenus()),
    changeCategory: (item) => dispatch(changeCategory(item)),
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

  flex: {
    flex: 1
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
    marginTop: 5,
    marginBottom: 5
  },
  menucategory: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

});
