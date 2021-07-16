import React, {Component} from 'react';
import Ordercomponent from '../../components/Ordercomponent';
import {Provider} from 'react-redux';
import store from '../../redux/store'


export default class SomethingScreen extends Component{

    render(){
        return (
            <Provider store = {store}>
            <Ordercomponent />
            </Provider>
        );
    }
}