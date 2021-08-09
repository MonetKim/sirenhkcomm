
import React, {Component} from 'react';
import Comments from '../../components/Comments';
import MaptestCompo from '../../components/Maptest';
import NearStoreComponent from '../../components/NearStoreComponent';
import Orderdetail from '../../components/OrderdetailComponent';
import {Provider} from 'react-redux';
import store from '../../redux/store'


export default class TestScreen extends Component{

    render(){
        return (
            <Provider store = {store}>
            <Orderdetail />
            </Provider>
        );
    }
}
