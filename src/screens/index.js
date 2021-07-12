import React from "react";
import { Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator, createMaterialTopTabNavigator, createTabNavigator } from "react-navigation-tabs";
import { Icon } from 'native-base';
import { Provider as UserProvider } from '../dataStore/userAccessContext';
//import { Context as UserContext } from '../../dataStore/userAccessContext';
import LoginScreen from "./LoginScreen/login.js";
import HomeScreen from "./HomeScreen/home.js"; 
import SettingScreen from "./SettingScreen/setting.js";
import SomethingScreen from "./SomethingScreen/extra.js";
import MenuScreen from "./MenuScreen/menu.js";
import SignupScreen from "./SignupScreen/signup.js";
import CartScreen from "./CartScreen/cart.js";
import emailScreen from "./LoginScreen/emailfinder.js";
import OrderScreen from "./OrderScreen/order.js";
import { setNavigator } from "../NavigationRef";

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
      title: <Text>파란만잔</Text> ,
      headerRight: <Icon name='ios-cart-outline' style={{paddingRight:10}} onPress={() => navigation.navigate('CartScreen')} />,
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
      title: "Menu",
      headerRight: <Icon name='ios-cart-outline' style={{paddingRight:10}} onPress={() => navigation.navigate('CartScreen')} />,  
    }),
    initialRouteName: "MenuScreen",
  }
);
const OrderStack = createStackNavigator(
  {
    OrderScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: "주문내역"
    }),
    initialRouteName: "OrderScreen",
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

const emailFindersStack = createStackNavigator(
  { 
    emailScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: "emailfinder",
    }),
    initialRouteName: "emailfinder",
  }
);


const TabNavigator = createBottomTabNavigator(
  {
    홈: HomeStack,
    메뉴: MenuStack,
    퀵오더: MenuStack,
    주문내역: OrderStack,
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
  CartScreen: CartScreen, 
  emailScreen: emailScreen,  
  SignupScreen: SignupScreen,
  TabNavigator: { 
    screen: TabNavigator,
    navigationOptions: ({ navigation }) => ({
      header: false,
    }),
  },


}); 

const App = createAppContainer(AppStack);

export default () => {
  return(
    <UserProvider>
      <App ref={(navigator) =>{
        setNavigator(navigator);
      }}>
      </App>
    </UserProvider>

  )
}

