import React, {Component} from 'react';
import CartComponent from '../../components/CartComponent';
import MenuComponent from '../../components/MenuComponent';
import {Provider} from 'react-redux';
import store from '../../redux/store'


export default class CartScreen extends Component{

    render(){
        return (
            <Provider store = {store}>
            <CartComponent />
            </Provider>
        );
    }
}
