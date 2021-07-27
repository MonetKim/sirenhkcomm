1

import MapView from 'react-native-maps';


  
import { View, StyleSheet, Image, Dimensions, RefreshControl, Text } from 'react-native';
import { connect } from 'react-redux'

import React, { useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { getOrderresults, getOrderresultsDetail } from '../redux/orderRedux/action'
//import FlatText from '../components/FlatText';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { Icon } from 'native-base';
const { width } = Dimensions.get('window');
const MaptestCompo = (props) => {

    return (
        <View style={styles.container}>
        <MapView style={styles.map}
          showsUserLocation //to show user current location when given access
          loadingEnabled //to show loading while map loading
          style={styles.map}
          initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
          }}
        >
        {

             locations && locations.map((location, index) => {
                   const {
                       coords: { latitude, longitude }
                          } = location;
                                return (
                                    <MapView.Marker
                                        key={index}
                                        coordinate={{ latitude, longitude }}
                                        title={"title"}
                                        description={"address"}
                                        // onPress={this.onMarkerPress(location)}
                                    />
                                )
                            })
                        }
      </MapView>
 </View>
    );
}


const mapStateToProps = (state) => {
    return {
        dataOrder: state.orderReducer.dataOrder,
        orderresult: state.orderReducer.orderresult,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOrderresults: (item) => dispatch(getOrderresults(item)),
        getOrderresultsDetail: (item) => dispatch(getOrderresultsDetail(item)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MaptestCompo)

const styles = StyleSheet.create({

        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F5FCFF',
        },
          map: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }
      });

