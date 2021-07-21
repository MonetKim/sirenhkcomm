import { NavigationActions,StackActions  } from 'react-navigation';

let navigator;

export const setNavigator = (nav) => {
  navigator = nav;
};
 
export const navigate = (routeName, params) => {
  navigator.dispatch(NavigationActions.navigate({ routeName, params }));
  console.log(routeName+'라우트 네임'+params+'파람');
};


 