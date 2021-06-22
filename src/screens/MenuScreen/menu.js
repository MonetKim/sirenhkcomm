import React, { Component } from "react";


import { StackActions, NavigationActions } from "react-navigation";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


export default class MenuScreen extends Component {
  _logout() {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: "LoginScreen" })],
      //actions: [NavigationActions.navigate({ routeName: 'SomethingScreen' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ItemContainer onPress={this._logout.bind(this)}>
          <ItemTextContainer>
            <ItemTitle>Sample</ItemTitle>
            <ItemDesc>this is test</ItemDesc>
          </ItemTextContainer>
        </ItemContainer>
        
      </ScrollView>
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
  container: {
    flex: 1,
    padding: wp("5%"),
    backgroundColor: "white",
  },
  wrapContent: {
    width: wp("90%"),
    height: wp("30%"),
    paddingBottom: wp("5%"),
  },
  content: {
    width: "100%",
    height: "100%",
    backgroundColor: "#46c3ad",
  },
});

