
import React, {Component} from 'react';
import MaptstoreComponent from '../../components/MaptstoreComponent';
import MaptestCompo from '../../components/Maptest';
import NearStoreComponent from '../../components/NearStoreComponent';
import HomeComponent from '../../components/HomeComponent';
import {Provider} from 'react-redux';
import store from '../../redux/store'


export default class HomeScreen extends Component{

    render(){
        return (
            <Provider store = {store}>
            <HomeComponent />
            </Provider>
        );
    }
}
