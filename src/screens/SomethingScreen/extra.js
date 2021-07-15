
import React, {Component} from 'react';
import Subscribers from '../../components/Subscribers';
import Comments from '../../components/Comments';
import {Provider} from 'react-redux';
import store from '../../redux/store'


export default class SomethingScreen extends Component{

    render(){
        return (
            <Provider store = {store}>
            <Comments />
            </Provider>
        );
    }
}
