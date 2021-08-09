import React from "react"; 
import { Text } from "react-native";
import { createAppContainer, createSwitchNavigator, withNavigation } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator} from "react-navigation-tabs";
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
import passScreen from "./LoginScreen/passwordfinder";
import OrderScreen from "./OrderScreen/order.js";
import { setNavigator } from "../NavigationRef";
import MenuDetailScreen from "./MenuDetailScreen/menuDetail.js"; 
//import DrawerBar from "../components/Drawer";
//import { createDrawerNavigator, DrawerActions } from "react-navigation-drawer";
import MapStoreScreen from "./MapStoreScreen/mapstore.js";
//import introductionScreen from "./IntroScreen/introduction";
import TestScreen from "./TestScreen/test.js";
 
const HomeStack = createStackNavigator(
  {
    HomeScreen,
  },
  // if you need.2222sadgfds
  // recommend custom header
  // { 
  //   defaultNavigationOptions: ({ navigation }) => ({

       
  //     //headerLeft : <Icon as={<Ionicons name="menu" style={{paddingLeft:10}}  onPress={() => navigation.toggleDrawer()} />} />,
  //     headerLeft: () => <Icon name="menu" style={{paddingLeft:10}} onPress={() => navigation.toggleDrawer()} />,
  //     title: <Text>파란만잔</Text> ,
  //     headerRight: () =>  <Icon name='ios-cart-outline' style={{paddingRight:10}} onPress={() => navigation.navigate('CartScreen')} />,
  //   }),
  // } 

    { 
    defaultNavigationOptions: ({ navigation }) => ({
      headerShown: false,
    }),
  } 
);
const SettingStack = createStackNavigator(
  {
    SettingScreen,
    SomethingScreen,
    MapStoreScreen,
    
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
      headerLeft: () => <Icon name='arrow-back-outline' style={{paddingLeft:10}} onPress={() => navigation.goBack(null)} />,
      //headerLeft :  <Button title="Go back" onPress={() => navigation.goBack()}/>, 
      headerRight: () => <Icon name='ios-cart-outline' style={{paddingRight:10}} onPress={() => navigation.navigate('CartScreen')} />,  
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
      title: "주문내역",
      headerLeft: () =>  <Icon name='arrow-back-outline' style={{paddingLeft:10}} onPress={() => navigation.goBack(null)} />,
      //headerLeft :  <Button title="Go back" onPress={() => navigation.goBack()}/>, 
      headerRight: () =>  <Icon name='ios-cart-outline' style={{paddingRight:10}} onPress={() => navigation.navigate('CartScreen')} />,  
    }),
    initialRouteName: "OrderScreen",
  }
);

const MenuDetailStack = createStackNavigator(
  { 
    MenuDetailScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: "MenuDetailScreen",
      headerLeft: () =>  <Icon name='arrow-back-outline' style={{paddingLeft:10}} onPress={() => navigation.navigate('MenuScreen')} />,
      //headerLeft :  <Button title="Go back" onPress={() => navigation.goBack()}/>,  
      headerRight: () =>  <Icon name='ios-cart-outline' style={{paddingRight:10}} onPress={() => navigation.navigate('CartScreen')} />,  
    }),
    initialRouteName: "MenuDetailScreen",
  }
);
const cartStack = createStackNavigator(
  { 
    CartScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: "CartScreen",
      headerLeft:  () =>  <Icon name='arrow-back-outline' style={{paddingLeft:10}} onPress={() => navigation.navigate('MenuScreen')} />,
      //headerLeft :  <Button title="Go back" onPress={() => navigation.goBack()}/>,      
    }),
    initialRouteName: "CartScreen",
  }
);

const MapStoreStack = createStackNavigator(
  { 
    MapStoreScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: "MapStoreScreen",
      headerLeft: () =>  <Icon name='arrow-back-outline' style={{paddingLeft:10}} onPress={() => navigation.navigate('SomethingScreen')} />,
    }),
    initialRouteName: "MapStoreScreen",
  }
);
const TestStack = createStackNavigator(
  { 
    TestScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: "TestScreen",
      headerLeft: () =>  <Icon name='arrow-back-outline' style={{paddingLeft:10}} onPress={() => navigation.navigate('OrderScreen')} />,
    }),
    initialRouteName: "TestScreen",
  }
);



// const IntroStack = createStackNavigator(
//   {
//     introductionScreen,
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => ({ 

//       //headerLeft: () => <Icon name="menu" style={{paddingLeft:10}} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />,
//       headerLeft: () => <Icon name="menu" style={{paddingLeft:10}} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />,      
//       title: <Text>파란만잔</Text> ,
//       headerRight: () =>  <Icon name='ios-cart-outline' style={{paddingRight:10}} onPress={() => navigation.navigate('CartScreen')} />,
//     }),
//     initialRouteName: "introductionScreen",
//   }
// );
 
const TabNavigator = createBottomTabNavigator(
  {
    홈: HomeStack,
    메뉴: MenuStack,
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
  }
);
 

// const AppDrawerNavigator = createDrawerNavigator(
//   {
//       TabNavigator,
//   }, 
//   {
//     contentComponent: DrawerBar,
//     drawerBackgroundColor: 'transparent',
//     overlayColor: 'rgba(0,0,0,0.5)',
//   },
// );




const AppStack = createStackNavigator({
  //introScreen : introScreen,

  LoginScreen,
  passScreen,
  emailScreen,  
  SignupScreen,  
  cartStack,
  MenuDetailStack,
  MapStoreStack,
  //MenuDetailScreen,
  //IntroStack,
  //AppDrawerNavigator,
  TestStack, 
  TabNavigator: {  
    screen: TabNavigator,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
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
