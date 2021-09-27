
import React, {Component} from 'react';
import MaptstoreComponent from '../../components/MaptstoreComponent';
import MaptestCompo from '../../components/Maptest';
import NearStoreComponent from '../../components/NearStoreComponent';
import CartDetailComponent from '../../components/CartDetailComponent';
import {Provider} from 'react-redux';
import store from '../../redux/store'


export default class NearStoreScreen extends Component{

    render(){
        return (
            <Provider store = {store}>
            <NearStoreComponent />
            </Provider>
        );
    }
}
