import React, {Component} from 'react';
import MaptstoreComponent from '../../components/MaptstoreComponent';
import MaptestCompo from '../../components/Maptest';
import NearStoreComponent from '../../components/NearStoreComponent';
import {Provider} from 'react-redux';
import store from '../../redux/store'


export default class MapStoreScreen extends Component{

    render(){
        return (
            <Provider store = {store}>
            <MaptstoreComponent />
            </Provider>
        );
    }
}
