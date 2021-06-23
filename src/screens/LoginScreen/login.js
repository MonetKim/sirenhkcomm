import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Video} from "expo-av";

const { width, height } = Dimensions.get("window");


export default class LoginScreen extends Component{
    
    static navigationOptions = {
        header: null,
    };

    _doLogin(){
        // do something
        this.props.navigation.replace('TabNavigator')
    }

    _dosignup(){
        // do something
        this.props.navigation.navigate('SignupScreen');
    }


    render(){
        return (
       

            <View style={styles.container}>
                <Video
                source={require("../../../assets//video/hksample.mp4")}
                //source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                
                style={styles.backgroundVideo}
                /> 

                

                <View style={styles.titleArea}>
                    <Text style={styles.title}>파란만잔</Text>
                </View>
                <View style={styles.formArea}>
                    <TextInput 
                        style={styles.textForm} 
                        placeholder={"ID"}/>
                    <TextInput 
                        style={styles.textForm} 
                        placeholder={"Password"}/>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={this._doLogin.bind(this)}>
                        <Text style={styles.buttonTitle}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.titlesign}>
                    <Text style={styles.sign}>아이디가 없으신가요?</Text>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={this._dosignup.bind(this)}>
                        <Text style={styles.buttonTitle}>signup</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}


const styles = StyleSheet.create({

    backgroundVideo: {
        height: height,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
      },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
        justifyContent: 'center',
    },
    titleArea: {
        width: '100%',
        padding: wp('10%'),
        alignItems: 'center',
    },
    titlesign: {
        width: '100%',
        padding: wp('10%'),
        alignItems: 'center',
    },
    title: {
        fontSize: wp('10%'),
    },
    sign: {
        fontSize: wp('5%'),
    },
    formArea: {
        width: '100%',
        paddingBottom: wp('10%'),
    },
    textForm: {
        borderWidth: 0.5,
        borderColor: '#888',
        width: '100%',
        height: hp('5%'),
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 5,
    },
    buttonArea: {
        width: '100%',
        height: hp('5%'),
    },
    button: {
        backgroundColor: "#46c3ad",
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        color: 'white',
    },
})