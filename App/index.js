/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import axios from 'axios'


//Redux
import { createStore } from 'redux'
import { Provider } from "react-redux"
import reducer from "./src/redux/reducerMain"


var store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.subscribe(() => {
  
});

//axios.defaults.baseURL = 'http://192.168.1.8:5000'
axios.defaults.baseURL = 'http://172.16.10.202:5000'
//axios.defaults.baseURL = 'http://192.168.1.100:5000'


export default function Main() {
  return (
    <Provider store={store}>
        <App />
    </Provider>

  );
}

AppRegistry.registerComponent(appName, () => Main);
