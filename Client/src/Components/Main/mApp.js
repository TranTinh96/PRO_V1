import React, { useState,useLayoutEffect,useEffect } from "react";
import { useCookies } from 'react-cookie'
import {useSelector ,useDispatch } from 'react-redux';

import { Route, Switch ,useHistory } from "react-router-dom";
import Header from "./element/mHeader";
import Navbars from "./element/mNavbar";
//Content
import Dashboard from "./content/mDashboard";
import mManage from "./content/mManage";
import mAccout from "./content/mAccout";
import mMaps from "./content/mMaps";
import DataTable from "./content/mDataTable";

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
    }, 100);
  }, []);

  if(!_idProject){
    dispatch({type :"ID_TOPIC_PROJECT" , _idProject :' '})
    removeCookie("Auth");
    history.push("/");
  }
  

 
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
          <Route
            exact
            path="/dashboard"
            render={(props) => (
              <Dashboard {...props}/> 
            )}
          />
          <Route exact path="/manage/setting" component={mManage} />
          <Route exact path="/manage/open-accout" component={mManage} />
          <Route exact path="/accouts" component={mAccout} />
          <Route exact path="/maps" component={mMaps} />
          <Route
            exact
            path="/tables"
            render={(props) => (
              <DataTable {...props}  />
            )}
          />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default MApp;
