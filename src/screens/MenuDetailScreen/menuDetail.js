import React, {Component} from 'react';
import Menudetail from '../../components/MenuDetailComponent';
import {Provider} from 'react-redux';
import store from '../../redux/store'


export default class MenuDetailScreen extends Component{

    render(){
        return (
            <Provider store = {store}>
            <Menudetail />
            </Provider>
        );
    }
}
