
import React, { Component, useContext } from "react";

import { connect } from 'react-redux'
import { removeMenuToCart ,addMenuToCart} from '../redux/menuRedux/action'
import { StackActions, NavigationActions } from "react-navigation";
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




const MenuComponent = (props) => {

    

    return (
      
        <View style={styles.flex}>                     
             <TouchableOpacity onPress={() => props.removeMenuToCart()}><Text>!@#!@#  {props.count}</Text></TouchableOpacity>
            <View style={styles.foodList}>
              <FlatList
                data={props.dataFood}
                numColumns={2}
                renderItem={({ item }) => _renderItemFood(item ,props)}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>         
        </View>
        
    );
    function _renderItemFood(item) {

        return (
            <View style={styles.singleFood}>
                <TouchableOpacity onPress={() => props.addMenuToCart(item.id)}>
                    <View>
                        <Image style={styles.foodImage} source={{ uri:  item.preview }} />
                        <View style={styles.foodTitle}>
                        <Text> {item.title}</Text>
                        </View>
                        <View style={styles.foodPrice}>
                            <View>
                              <Text> {item.price}</Text>
                            </View>
                            <View>
                                <Icon name="add" size={30} color="#ff3252" />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    
    }
    
}



function   onClickAddCart(data) {
    //console.log(state,'state')

    
}


const mapStateToProps = (state) =>{
    //console.log(state,'state')
    return {
        dataFood: state.menuReducer.dataFood,
        temp: state.menuReducer.temp,
        count: state.menuReducer.count,
    }
}

const mapDispatchToProps = (dispatch) =>{
    //console.log(dispatch,'dispatch')
    return{
        addMenuToCart:(item) => dispatch(addMenuToCart(item)),
        removeMenuToCart:() => dispatch(removeMenuToCart())
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


});
