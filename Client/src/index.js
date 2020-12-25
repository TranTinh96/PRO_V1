import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import jwt from 'jsonwebtoken';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from 'redux'
import { Provider } from "react-redux"
import reducer from "./Redux/reducer"
import Cookies from 'universal-cookie';
import { CookiesProvider } from 'react-cookie';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import setAuthorizationToken from './Components/services/jwtService';

import checkRole from "./Components/services/fucRole";
import {checkUndefined } from "./Components/services/fucServices";
import "bootstrap/dist/css/bootstrap.min.css"
import 'antd/dist/antd.css'
import "./assets/css/util.css"
import "./assets/css/styles_dashboard.css"
import "./assets/css/screen.css"
import "./assets/css/styles_home.css"
import "./assets/css/styles_formLogin.css"
import "./assets/css/style_calendar.css"
import "./assets/css/styles_chart.css"



var store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.subscribe(() => {

});

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

console.log((!(checkUndefined(authToken))))
if (!(checkUndefined(authToken))) {
  let jwtToken = jwt.decode(authToken)
  console.log("Test Auth Token")
  let role = checkRole(jwtToken.role);
  var users = {
    email: jwtToken.email,
    user: jwtToken.user,
    role: role
  }
  //Redux User JWT
  store.dispatch({ type: "SET_USER", users: users })

  //Redux ProjectID
  store.dispatch({type :"PROJECT_ID_REGISTER" ,projectID :" "})
  store.dispatch({type :"ID_TOPIC_PROJECT" , _idProject :jwtToken.project_id})
  
  //Set Axios 
  setAuthorizationToken(authToken)
}




ReactDOM.render(
  <CookiesProvider>
    <Router>
      <MuiThemeProvider theme={Them}>
        <Provider store={store}>      
          <App />
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
