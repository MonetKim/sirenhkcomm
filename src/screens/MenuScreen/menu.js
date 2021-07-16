import React, {Component} from 'react';
import MenuComponent from '../../components/MenuComponent';
import {Provider} from 'react-redux';
import store from '../../redux/store'


export default class MenuDetailScreen extends Component{
    

    render(){
        return (
            <Provider store = {store}>
            <MenuComponent />
            </Provider>
        );
    }
}
