import React from "react";
import {Route, Switch} from "react-router-dom"
import Header from "./element/mHeader"
import Navbars from "./element/mNavbar"
//Content
import mDashboard from "./content/mDashbard"
import mManage from "./content/mManage"
import mAccout from "./content/mAccout"
import mMaps from "./content/mMaps"
import mDataTable from "./content/mDataTable"


function mApp() {


  return (
    <React.Fragment>
      <Header />
      <div className="pcoded-main-container">
        {/* Navbar */}
        <Navbars />
        {/* Content */}
        <Switch>
          <Route exact path="/dashboard" component={mDashboard} />
          <Route exact path="/manage/setting" component={mManage} />
          <Route exact path="/manage/open-accout" component={mManage} />
          <Route exact path="/accouts" component={mAccout} />
          <Route exact path="/maps" component={mMaps} />
          <Route exact path="/tables" component={mDataTable} />
      </Switch>
      </div>
    </React.Fragment>
  )
}

export default mApp

