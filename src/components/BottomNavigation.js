//NavigationContainer 추가
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useState, useEffect } from 'react'
import { Text, View } from 'react-native';
//Stack에서 작동하는 Navigator와 Screen을 추가
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//네비게이션에서 사용할 화면 가져오기
//여기서 화면은 우리가 흔히 볼 수 있는 컴포넌트 이다.
import LoginScreen from '../screens/LoginScreen/login';
import { navigate } from '../NavigationRef';

//Stack Navigation만들기






const BottomNavigation = ({}) => {
    return(
        <View>
            <Text>하이</Text>
            <Text>하이2</Text>
        </View>    
  );
}

export default BottomNavigation;