import React, {Component} from 'react';
import Ordercomponent from '../../components/Ordercomponent';
import Ordercomponent2 from '../../components/Ordercomponent2';
import {Provider} from 'react-redux';
import store from '../../redux/store'


export default class SomethingScreen extends Component{

    render(){
        return (
            <Provider store = {store}>
            <Ordercomponent2 />
            </Provider>
        );
    }
}