import React, {Component} from 'react';
import Subscribers from '../../components/Subscribers';
import {Provider} from 'react-redux';
import store from '../../redux/store'


export default class SomethingScreen extends Component{

    render(){
        return (
            <Provider store = {store}>
            <Subscribers />
            </Provider>
        );
    }
}