import React from 'react'
import { View,StyleSheet,Image,Dimensions,RefreshControl , Text} from 'react-native';
import { connect } from 'react-redux'

const Subscribers = (props) => {
    return(
        <View>
                <Text>안녕숫자: {props.count}</Text>
        </View>
    )
}

const mapStateToProps = (state) =>{
    return {
        count: state.count
    }
}

export default connect(mapStateToProps)(Subscribers)