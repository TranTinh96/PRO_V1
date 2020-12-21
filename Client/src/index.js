import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import jwt from 'jsonwebtoken';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from 'redux'
import { Provider } from "react-redux"
import mqtt from "mqtt"
import reducer from "./Redux/reducer"
import Cookies from 'universal-cookie';
import { CookiesProvider } from 'react-cookie';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import setAuthorizationToken from './Components/services/jwtService';
//import options from "./Components/MQTT/mqttConfig"

import checkRole from "./Components/services/fucService"
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/css/util.css"
import "./assets/css/styles_dashboard.css"
import "./assets/css/screen.css"
import "./assets/css/styles_home.css"
import "./assets/css/styles_formLogin.css"
import "./assets/css/style_calendar.css"
import "./assets/css/styles_chart.css"

var options = {
  protocol: 'mqtts',
  clientId: 'b0908853'    
};

var store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.subscribe(() => {

});
var clientMQTT ;

const Them = createMuiTheme({
  typography: {
    "fontFamily": `"Poppins", sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  }
});
const cookies = new Cookies();
var authToken = cookies.get("Auth")
//User
if (authToken) {
  let jwtToken = jwt.decode(authToken)
  let role = checkRole(jwtToken.role);
  var users = {
    email: jwtToken.email,
    user: jwtToken.user,
    role: role
  }
  //Redux User JWT
  store.dispatch({ type: "SET_USER", users: users })

  //Redux ProjectID
  store.dispatch({type :"ID_TOPIC_PROJECT" , _idProject :jwtToken.project_id})
  
  //Set Axios 
  setAuthorizationToken(authToken)

  //Connect MQTT
  clientMQTT  = mqtt.connect('mqtt://test.mosquitto.org:8081',options);
  clientMQTT.on('connect', function () {
     console.log("Connect MQTT Broker Success !")
  })
}
const MQTTContext = React.createContext();


ReactDOM.render(
  <CookiesProvider>
    <Router>
      <MuiThemeProvider theme={Them}>
        <Provider store={store}>
          <MQTTContext.Provider clientMQTT={clientMQTT}>
            <App />
          </MQTTContext.Provider>
        </Provider>
      </MuiThemeProvider>
    </Router>
  </CookiesProvider>,

  document.getElementById("root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
