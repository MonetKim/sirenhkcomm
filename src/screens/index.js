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

//import { createDrawerNavigator } from "react-navigation-drawer";

const HomeStack = createStackNavigator(
  {
    HomeScreen,
  },
  // if you need.
  // recommend custom header
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerLeft: <Icon name='ios-cart-outline' style={{paddingLeft:10}}/>,
      title: 'happynewyear',
      headerRight: <Icon name='ios-send-outline' style={{paddingRight:10}}/>,
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
    Home: HomeStack,
    Setting: SettingStack,
    cha: HomeStack,
    Menu: MenuStack,
    live: HomeStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let icon = "▲";

        if (routeName === "Home") {
          icon = "🌈1";
        } else if (routeName === "Menu") {
          icon = "메뉴🌙";
        } else if (routeName === "Menu") {
          icon = "퀵오더~";
        } else if (routeName === "Menu") {
          icon = "주문내역";
        } else if (routeName === "Setting") {
          icon = "마이페이지";
        }

        // can use react-native-vector-icons
        // <Icon name={iconName} size={iconSize} color={iconColor} />
        return (
          <Text style={{ color: (focused && "#46c3ad") || "#888" }}>
            {icon}
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
  TabNavigator: {
    screen: TabNavigator,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },


});

export default createAppContainer(AppStack);
