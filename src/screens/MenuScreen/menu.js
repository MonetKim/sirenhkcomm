import React, { Component } from "react";


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
import FlatText from '../../components/FlatText'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Icon } from "native-base";
const { width, height } = Dimensions.get("window");


export default class MenuScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        //dataFood: [],
        dataFood: [
          {
            id: 0,
            title: 'aaaa',
            price: 7000,
            preview : 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'
          },
          {
            id: 1,
            title: 'bbbb',
            price: 5000,
            preview : 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png'
          }
        ],
        name: "",
        delivery_time: 0,
        ratting: 0,
        reviews: [],
        avg_ratting: 0,
        preview: "",
        dataCart: [],
        latitude: 0,
        longitude: 0,
        menus: [],
        selectMenu: 0,
        id: null,
        shopday: [],
        about: [],
        slug: "",
        error: false,
        refreshing: false,
    }
}




  // _logout() {
  //   const resetAction = StackActions.reset({
  //     index: 0,
  //     key: null,
  //     actions: [NavigationActions.navigate({ routeName: "LoginScreen" })],
  //     actions: [NavigationActions.navigate({ routeName: 'SomethingScreen' })],
  //   });
  //   this.props.navigation.dispatch(resetAction);
  // }


  //데이터 넣기 필요
  // componentDidMount() {

  //   this.setState({ dataFood : })

  // }




  render() {
    return (
      

        
        <View style={styles.flex}>
          

          <ScrollView >
            <View style={styles.foodList}>
              <FlatList
                data={this.state.dataFood}
                numColumns={2}
                renderItem={({ item }) => this._renderItemFood(item)}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </ScrollView>

         
        </View>
        
    );
  }


  _renderItemFood(item) {

      return (
          <View style={styles.singleFood}>
              <TouchableOpacity onPress={() => this.onClickAddCart(item)}>
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

