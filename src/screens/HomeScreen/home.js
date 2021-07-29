import React, {Component} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import 'react-native-gesture-handler';

import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';



export default class HomeScreen extends Component{
    render(){
        return (
  
            <View style={styles.container}>     
                <View style={styles.wrapContent}>
                    <View style={styles.content} ></View>
                </View>
                <View style={styles.wrapContent}>
                    <View style={styles.content}></View>
                </View>
                <View style={styles.wrapContent}>
                    <View style={styles.content}></View>
                </View>
                <View style={styles.wrapContent}>
                    <View style={styles.content}></View>
                </View>
                <View style={styles.wrapContent}>
                    <View style={styles.content}></View>
                </View>                                
            </View>       
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp('5%'),
        backgroundColor: 'white',
    },
    wrapContent: {
        width: wp('90%'),
        height: wp('30%'),
        paddingBottom: wp('5%'),
        
    },
    content: {
        width: "100%",
        height: "100%",
        backgroundColor: "#888",
    }
})