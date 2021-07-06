// import React, {Component} from 'react';
// import {
//     View,
//     Text,
//     Button,
//     StyleSheet
// } from 'react-native';
// export default class SomethingScreen extends Component{

//     render(){
//         return (
//             <View style={styles.container}>
//                 <Text>something</Text>
//                 <Button
//                     title='back'
//                     onPress={() => this.props.navigation.goBack()} />
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// })


// import React, {Component} from 'react';
// import Subscribers from '../../components/Subscribers';
// import {Provider} from 'react-redux';
// import store from '../../redux/store'


// const App = () => {
//   return (
//     <Provider store = {store}>
//     <Subscribers />
//     </Provider>
//   );
// };


//export default App;
import React, {Component} from 'react';
import Subscribers from '../../components/Subscribers';
import {Provider} from 'react-redux';
import store from '../../redux/store'


export default class SomethingScreen extends Component{

    render(){
        return (
            <Provider store = {store}>
            <Subscribers />
            </Provider>
        );
    }
}
