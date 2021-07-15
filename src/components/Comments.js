
import React, { useEffect } from "react";
import { navigate } from '../NavigationRef';
import { connect } from 'react-redux'
import { fetchComments, testing } from '../redux/temptest/action'
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
    console.log('!@@@@       '+props.items.length+'           ~~~~')
    if(props.items.length <1){
        useEffect(() =>{
            props.fetchComments()
        },[])
    }
    //const commnetsItems = landing ? <View>로딩중</View> :

    return (
        //props.loading ? <View><Text>kjidfng</Text></View> :
        <View style={styles.flex}>
          <ScrollView style={StyleSheet.flex} >
              <View style={styles.container}>
                  <View style={styles.headerTitle}>
                  <TouchableOpacity onPress={() => props.testing()}><Text>!@#!@#</Text></TouchableOpacity>
                      <Text style ={{fontSize : 20 ,color : '#333'}}>All Orders</Text>
                  </View>
                  {
                      
                      props.items.map((order,i) => {
                       //props.dataCart.map((order,i) => {
                          return(
                            
                              <TouchableOpacity key={i}>
                                  <View style={styles.singleOrder}>
                                       <View>
                                        <Text style ={{fontSize : 13 ,color : '#333'}}>{ order.email}</Text>   
                                        </View>
                                       <View>
                                          <View>
                                              <Text style ={{fontSize : 19 ,color : '#333'}}>{order.name}</Text>
                                          </View>
                                          <View>
                                              <Text style ={{fontSize : 13 ,color : '#333'}}>Order No: #{order.password}</Text>
                                          </View>
                                          <View style={styles.orderPrice}>
                                              <Text style ={{fontSize : 13 ,color : '#333'}}>금액 : {order.phone}원</Text>
                                          </View>
                                      </View>
                                      <View style={styles.viewOrderBtn}>
                                          <Icon name="eye"  color="#fff" />
                                      </View>
                                  </View>
                              </TouchableOpacity>
                          )
                      })
                  }
              </View>
          </ScrollView>
        </View>
      );
}


const mapStateToProps = (state) => {
    console.log(state.commnetsReducer,'@@@@@@@@@@@')
    return {
       items: state.commnetsReducer.items,
       loading : state.commnetsReducer.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    //console.log(dispatch,'dispatch')
    return {
        fetchComments:() => dispatch(fetchComments()),
        testing:() => dispatch(testing()),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Comments)



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

