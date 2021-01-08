
import React ,{useEffect} from 'react'
import { Route } from "react-router-dom";
import {useSelector} from 'react-redux';
import jwt from 'jsonwebtoken';
import { useCookies } from 'react-cookie'
import Home from "./Home/home"
import Main from "./Main/mApp"
import authLogin from "../Components/Home/auth/auLogin"
import authRegister from "../Components/Home/auth/auRegister"
import auTokenProject from "../Components/Home/auth/auToken"
import auVerification from "../Components/Home/auth/auVerification"
import auReSend from "../Components/Home/auth/auReSend"
import Page404 from "./Page/Page404"
import Page403 from "./Page/Page403"

import {checkNull ,checkTypeUndefined} from "./services/fucServices"
import checkRole from "./services/fucRole"

function RouterURL() {
      //Cookie
   const [cookies, removeCookie] = useCookies(["Auth"]);

    var  isAuthenticated = false ;
    var role = "Control"
    if (!checkTypeUndefined(cookies.Auth) || ! checkNull(cookies.Auth)) {
        
        let jwtToken = jwt.decode(cookies.Auth)
        if(! checkNull(jwtToken))
        {
           role = checkRole(jwtToken.role);
            isAuthenticated =true
         
        }
    }
  
    if(isAuthenticated){
        if(role=='Administrator')
        {
            return(
            <React.Fragment>
                <Route exact path="/" component={Home} />
                <Route exact path="/profile/login" component={authLogin} />
                <Route exact path="/profile/register" component={authRegister} />
                <Route exact path="/profile/register/token-project" component={auTokenProject} />
                <Route exact path="/profile/confirmation" component={auVerification} />
                <Route exact path="/profile/resend" component={auReSend} />
                <Route exact path="/dashboard" component={Main} />
                <Route exact path="/tables" component={Main} />
                <Route exact path="/alarms" component={Main} />
                <Route exact path="/maps" component={Main} />
                <Route exact path="/accouts" component={Main} />
                <Route exact path="/manage/setting" component={Main} />
                <Route exact path="/manage/open-accout" component={Main} />
                <Route exact path="/manage/project" component={Page404} />
            </React.Fragment>
            )
        }
         if(role == "Manager")
        {
            return (
                <React.Fragment>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/profile/login" component={authLogin} />
                    <Route exact path="/profile/register" component={authRegister} />
                    <Route exact path="/profile/register/token-project" component={auTokenProject} />
                    <Route exact path="/profile/confirmation" component={auVerification} />
                    <Route exact path="/profile/resend" component={auReSend} />
                    <Route exact path="/dashboard" component={Main} />
                    <Route exact path="/tables" component={Main} />
                    <Route exact path="/alarms" component={Main} />
                    <Route exact path="/maps" component={Main} />
                    <Route exact path="/accouts" component={Main} />
                    <Route exact path="/manage/project" component={Main} />
                    <Route exact path="/manage/setting" component={Page404} />
                    <Route exact path="/manage/open-accout" component={Page404} />
                </React.Fragment>
            )
        }
    
        return (
            <React.Fragment>
                <Route exact path="/" component={Home} />
                <Route exact path="/profile/login" component={authLogin} />
                <Route exact path="/profile/register" component={authRegister} />
                <Route exact path="/profile/register/token-project" component={auTokenProject} />
                <Route exact path="/profile/confirmation" component={auVerification} />
                <Route exact path="/profile/resend" component={auReSend} />
                <Route exact path="/dashboard" component={Main} />
                <Route exact path="/tables" component={Main} />
                <Route exact path="/alarms" component={Main} />
                <Route exact path="/maps" component={Main} />
                <Route exact path="/accouts" component={Main} />
                <Route exact path="/manage/project" component={Page404} />
                <Route exact path="/manage/setting" component={Page404} />
                <Route exact path="/manage/open-accout" component={Page404} />
            </React.Fragment>
        )
    }
    return(
        <React.Fragment>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile/login" component={authLogin} />
            <Route exact path="/profile/register" component={authRegister} />
            <Route exact path="/profile/register/token-project" component={auTokenProject} />
            <Route exact path="/profile/confirmation" component={auVerification} />
            <Route exact path="/profile/resend" component={auReSend} />
            <Route exact path="/dashboard" component={Page403} />
            <Route exact path="/tables" component={Page403} />
            <Route exact path="/alarms" component={Page403} />
            <Route exact path="/maps" component={Page403} />
            <Route exact path="/accouts" component={Page403} />
            <Route exact path="/manage/setting" component={Page404} />
            <Route exact path="/manage/project" component={Page404} />
            <Route exact path="/manage/open-accout" component={Page404} />
        </React.Fragment>
    )
}

export default RouterURL