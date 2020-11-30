
import React from 'react'
import { Route } from "react-router-dom";
import Home from "./Home/home"
import Main from "./Main/mApp"
import authLogin from "../Components/Home/auth/auLogin"
import authRegister from "../Components/Home/auth/auRegister"
import auTokenProject from "../Components/Home/auth/auToken"
import auVerification from "../Components/Home/auth/auVerification"
import auReSend from "../Components/Home/auth/auReSend"

function RouterURL() {
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
            <Route exact path="/manage/setting" component={Main} />
            <Route exact path="/manage/open-accout" component={Main} />
        </React.Fragment>
    )
}

export default RouterURL