import { AsyncStorage } from "react-native";
import { navigate } from "../utils/NavigationRef";
import createAppContext from "./createAppContext";
import API from "../api/WebService";
import aType from "../utils/ActionTypes";
import userReducer from "./reducer";


/**
 * User Actions
 */

const onSignup = (dispatch) => async ({
  email,
  password,
  firstName,
  lastName,
}) => {
  API.post("user/signup", {
    email,
    password,
    firstName,
    lastName,
  })
    .then((response) => {
      configureAPI({ token: `Bearer ${response.data}` });
      dispatch({ type: aType.LOGIN, payload: response.data });
      navigate("homeStack");
    })
    .catch((err) => {
      dispatch({
        type: aType.ERROR,
        payload: "Login Fail with provided Email ID and Password",
      });
    });
};

// const onSignin = (dispatch) => async ({ email, password }) => {
//   API.post("user/login", {
//     email,
//     password,
//   })
//     .then((response) => {
//       configureAPI({ token: `Bearer ${response.data}` });
//       dispatch({ type: aType.LOGIN, payload: response.data });
//       navigate("homeStack");
//     })
//     .catch((err) => {
//       dispatch({
//         type: aType.ERROR,
//         payload: "Login Fail with provided Email ID and Password",
//       });
//     });
// };

const configureAPI = ({ token }) => {
  API.defaults.headers.common["Authorization"] = token;
};

// const onCheckLogin = (dispatch) => async () => {
//   const token = await AsyncStorage.getItem("token");
//   if (token) {
//     dispatch({ type: aType.LOGIN, payload: token });
//     navigate("homeStack");
//     configureAPI({ token });
//   } else {
//     navigate("loginStack");
//   }
// };

// const onGetProfile = (dispatch) => async () => {
//   try {
//   } catch {}
// };

// const onLogout = (dispatch) => () => {
//   navigate("loginStack");
//   dispatch({ type: aType.LOGOUT });
// };
// const onDissmiss = (dispatch) => () => {
//   dispatch({ type: aType.DISSMISS });
// };

/**
 * Export Methods with Create Context
 */
export const { Provider, Context } = createAppContext(
  userReducer,
  {
    // onCheckAvailability,
    // onCheckLogin,
    onSignup,
    // onSignin,
    // onLogout,
    // fetchTopRestaurants,
    // onAddToCart,
    // onViewCart,
    // onCreateOrder,
    // onViewOrders,
    // onViewOrderDetails,
    // onDissmiss,
  },
  { accessToken: null, msg: null }
);
