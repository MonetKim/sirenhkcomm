import React from 'react';
import { View, TouchableOpacity, Dimensions, Text, Alert, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { navigate } from '../NavigationRef';
import introScreen from "../screens/IntroScreen/introduction";


function Drawers ({idx,title,route}){
  return (
    <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 5,
            paddingTop: 25,
            paddingLeft: 30,
          }                
        }
        onPress={() => navigate(`${route}`) 
          //Alert.alert('title', `1${idx}`);
          //console.log('나오는 곳' + `${route}`);

        }
        >
          <Text
            style={{
              marginLeft: 12,
              color: '#272727',
              fontSize: 16,
              lineHeight: 19,
            }}>
            {title}
          </Text>
          </TouchableOpacity>
    </View>
  );

}

export default class DrawerBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          idx: 0,
          title: '소개',
          route: 'introductionScreen'          
        },             
        {
          idx: 1,
          title: '뉴스',
          route: 'News',
        },
        {
          idx: 2,
          title: '포인트',
          route: 'point'
        }, 
        {
          idx: 3,
          title: '고객센터',
          route: 'callCenter'
        },
        {
          idx: 4,
          title: '가맹문의',
          route: 'lead'
        }        
      ],
    };
  }

  navigateToScreen = route => () => {
    const navigate = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigate);
  };


  render() {
    return (
      <View
        style={{
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
          backgroundColor: 'white',
          flex: 1,
        }}>
        <View
          style={{
            height: 110,
            backgroundColor: '#46c3ad',
            borderTopRightRadius: 50,
            paddingTop: 20,
            paddingLeft: 30,
          }}>
             
          <Image
            style={{ height: 100, width: 100, borderRadius: 25 }}
            source={require('../../assets/image/logo/logo.png')}
          />

        </View>
        <View>
          {this.state.list.map(list => (
            <Drawers key={list.idx} title={list.title} idx={list.idx} route={list.route}></Drawers>
          ))}
        </View>
      </View>
    );
  }
}