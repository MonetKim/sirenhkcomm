import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    StyleSheet
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class SettingScreen extends Component{
    _navigate(){
        this.props.navigation.navigate('NearStoreScreen');
    }
 
    _checkLogout(){
        Alert.alert(
            "로그아웃",
            "정말로 로그아웃 하시겠습니까??",
            [
                {text: 'ok', onPress: this._logout.bind(this)},
                {text: 'cancel', onPress: () => null},
            ],
            { cancelable: true }
            
        )
    }

    _logout(){
        const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })],
            //actions: [NavigationActions.navigate({ routeName: 'NearStoreScreen' })],
        });
        this.props.navigation.dispatch(resetAction);
    }

    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.wrapButton}
                    onPress={this._navigate.bind(this)}>
                    <Text>🏅 NearStoreScreen</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.wrapButton}
                    onPress={this._checkLogout.bind(this)}>
                    <Text>🔓 Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.wrapButton}
                    onPress={this._navigate.bind(this)}>
                    <Text>🏅 ManagerScreen</Text>
                </TouchableOpacity>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    wrapButton: {
        width: wp('100%'),
        height: hp('8%'),
        paddingLeft: wp('8%'),
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
    }
})