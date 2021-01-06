import React, { useState,useLayoutEffect,useEffect } from "react";
import { useCookies } from 'react-cookie'
import {useSelector ,useDispatch } from 'react-redux';

import { Route, Switch ,useHistory } from "react-router-dom";
import Header from "./element/mHeader";
import Navbars from "./element/mNavbar";
//Content
import Dashboard from "./content/mDashboard";
import Manage from "./content/mManage";
import Accout from "./content/mAccout";
import Maps from "./content/mMaps";
import DataTable from "./content/mDataTable";
import Notification from "./content/mNotifications";

import ClipLoader from "react-spinners/ScaleLoader";

function MApp() {
  const dispatch =useDispatch()
  const _idProject = useSelector((state) => state.idTopicProject);
 
  const history = useHistory()
  //useState
  const [isLoading, setIsLoading] = useState(true);

   //Cookie
   const [cookies, removeCookie] = useCookies(["Auth"]);
 
   //Connect MQTT
   useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading);
      if(!_idProject){
        dispatch({type :"ID_TOPIC_PROJECT" , _idProject :' '})
        removeCookie("Auth");
        history.push("/");
      }    
    }, 100);
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
      <Header />
      <div className="pcoded-main-container">
        <Navbars />
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/manage/setting" component={Manage} />
          <Route exact path="/manage/open-accout" component={Manage} />
          <Route exact path="/accouts" component={Accout} />
          <Route exact path="/maps" component={Maps} />
          <Route exact path="/tables" component={DataTable} />
          <Route exact path="/alarms" component={Notification} />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default MApp;
