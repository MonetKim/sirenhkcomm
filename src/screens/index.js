import React from "react";
import { Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator, createMaterialTopTabNavigator, createTabNavigator } from "react-navigation-tabs";
import { Icon } from 'native-base';

import LoginScreen from "./LoginScreen/login.js";
import HomeScreen from "./HomeScreen/home.js"; 
import SettingScreen from "./SettingScreen/setting.js";
import SomethingScreen from "./SomethingScreen/extra.js";
import MenuScreen from "./MenuScreen/menu.js";
import SignupScreen from "./SignupScreen/signup.js";

//import { createDrawerNavigator } from "react-navigation-drawer";

const HomeStack = createStackNavigator(
  {
    HomeScreen,
  },
  // if you need.2222sadgfds
  // recommend custom header
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerLeft: <Icon name='menu' style={{paddingLeft:10}} onPress={() => navigation.navigate('LoginScreen')} />,
      title: <Text style={{justifyContent: 'right', alignItems: 'right',}}>파란만잔</Text> ,
      headerRight: <Icon name='ios-cart-outline' style={{paddingRight:10}} onPress={() => navigation.navigate('MenuScreen')} />,
    }),
  }
);
const SettingStack = createStackNavigator(
  {
    SettingScreen,
    SomethingScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: "Setting",
    }),
    initialRouteName: "SettingScreen",
  }
);
const MenuStack = createStackNavigator(
  {
    MenuScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: "Menus",
    }),
    initialRouteName: "MenuScreen",
  }
);
const SignupStack = createStackNavigator(
  {
    SignupScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: "Signup",
    }),
    initialRouteName: "Signup",
  }
);


// const TopTabNavigator = createMaterialTopTabNavigator(
//   {
//     Home: HomeStack,
//     Setting: SettingStack,
//     cha: HomeStack,
//     Menu: MenuStack,
//     live: HomeStack,
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused, horizontal, tintColor }) => {
//         const { routeName } = navigation.state;
//         let icon = "▲";

//         if (routeName === "Home") {
//           icon = "🌈4";
//         } else if (routeName === "Menu") {
//           icon = "메뉴🌙";
//         } else if (routeName === "Menu") {
//           icon = "퀵오더~";
//         } else if (routeName === "Menu") {
//           icon = "주문내역";
//         } else if (routeName === "Setting") {
//           icon = "마이페이지";
//         }

//         // can use react-native-vector-icons
//         // <Icon name={iconName} size={iconSize} color={iconColor} />
//         return (
//           <Text style={{ color: (focused && "#46c3ad") || "#888" }}>
//             {icon}
//           </Text>
//         );
//       },
//     }),
//     lazy: false,
//     tabBarOptions: {
//       activeTintColor: "#46c3ad",
//       inactiveTintColor: "#888",
//     },
//   }
// ); 


const TabNavigator = createBottomTabNavigator(
  {
    홈: HomeStack,
    메뉴: MenuStack,
    퀵오더: MenuStack,
    주문내역: MenuStack,
    마이페이지: SettingStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let icon = "▲";

        if (routeName === "홈") {
          icon = "home";
        } else if (routeName === "메뉴") {
          icon = "cafe";
        } else if (routeName === "퀵오더") {
          icon = "flash";
        } else if (routeName === "주문내역") {
          icon = "reader";
        } else if (routeName === "마이페이지") {
          icon = "person";
        }

        // can use react-native-vector-icons
        // <Icon name={iconName} size={iconSize} color={iconColor} />
        return (
          <Text style={{ color: (focused && "#46c3ad") || "#888" }}>
            <Icon name= {icon}   />
          </Text>
        );
      },
    }),
    lazy: false,
    tabBarOptions: {
      activeTintColor: "#46c3ad",
      inactiveTintColor: "#888",
    },
  }
);

const AppStack = createStackNavigator({
  LoginScreen: LoginScreen,
  SignupScreen: SignupScreen,
  TabNavigator: {
    screen: TabNavigator,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },


});

export default createAppContainer(AppStack);
