import React, { useState,useEffect } from "react";
import { useCookies } from 'react-cookie'
import jwt from 'jsonwebtoken';
import {useSelector ,useDispatch } from 'react-redux';

import { Route, Switch ,useHistory } from "react-router-dom";
import Header from "./element/mHeader";
import Navbars from "./element/mNavbar";
//Content
import Dashboard from "./content/mDashboard";
import Manage from "./content/mAdmin";
import Accout from "./content/mAccout";
import Maps from "./content/mMaps";
import DataTable from "./content/mDataTable";
import Notification from "./content/mNotifications";
import ManageProject from "./content/mManageProject"

import ClipLoader from "react-spinners/ScaleLoader";

import {checkString ,checkNull} from "../services/fucServices"
import checkRole from "../services/fucRole";

function MApp() {
  const dispatch =useDispatch()
  var _idProject_ = null
  _idProject_ = localStorage.getItem("AuthID");
  const history = useHistory()
  //useState
  const [isLoading, setIsLoading] = useState(true);

   //Cookie
   const [cookies, removeCookie] = useCookies(["Auth"]);
   var jwtToken = jwt.decode(cookies.Auth)
   var role =checkRole(jwtToken.role);

   //Connect MQTT
   useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading);
      if(role !=="Administrator")
      {

        if((!checkString(cookies.Auth)) || ! _idProject_){
          removeCookie("Auth");
          localStorage.removeItem("AuthID")
          history.push("/");
        }   
        else
        {
          if(_idProject_ )
          {
            localStorage.setItem("AuthID",jwtToken.project_id)
            dispatch({type :"ID_TOPIC_PROJECT" , _idProject :jwtToken.project_id})
          }
       
        }
   
      }
    }, 200);
    
  }, []);

 
  if (isLoading) {
    return (
      <React.Fragment>
        <div className="container-spinners">
          <div className="spinners">
            <ClipLoader size={60} color="#727cf5" loading={isLoading} />
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Header role={role} />
      <div className="pcoded-main-container">
        <Navbars role={role}  _idProject={_idProject_}/>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/accouts" component={Accout} />
          <Route exact path="/maps" component={Maps} />
          <Route exact path="/tables" component={DataTable} />
          <Route exact path="/alarms" component={Notification} />
          <Route exact path="/manage/project" component={ManageProject} />
          <Route exact path="/manage/setting" component={Manage} />
          <Route exact path="/manage/open-accout" component={Manage} />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default MApp;
