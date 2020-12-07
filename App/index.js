/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import axios from 'axios'
import  AsyncStorage from "@react-native-community/async-storage"
//Function
import setAuthorizationToken from './src/components/services/jwtService';
import checkRole from "./src/components/services/fucService"
//Redux
import { createStore } from 'redux'
import { Provider } from "react-redux"
import reducer from "./src/redux/reducerMain"

var store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.subscribe(() => {

});

axios.defaults.baseURL = 'http://192.168.1.103:5000'

var authToken = AsyncStorage.getItem('Auth')
if (authToken) {
  /*
  let role = checkRole(resData.role);
  var users ={
    email : resData.addressEmail ,
    userName : resData.user ,
    role : role
  }
  //Redux User JWT
  store.dispatch({ type: "SET_USER", users: users })
  */
  //Set Axios 
  setAuthorizationToken(authToken)
}

export default function Main() {
  return (
    <Provider store={store}>
        <App />
    </Provider>

  );
}

AppRegistry.registerComponent(appName, () => Main);
