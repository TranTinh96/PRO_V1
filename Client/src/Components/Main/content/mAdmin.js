import React from 'react'
import { Route, Switch} from "react-router-dom";
//Library
import mManageSetting from "../mMiniComponent/manageSetting"
import mManageRegister from "../mMiniComponent/manageRegisterUser"



function Manage() {
    return (
        <div className="pcoded-content">
            <div className="pcoded-inner-content pcoded-inner-padding">
                <div className="main-body">
                    <div class="page-wrapper">
                        <div className="page-body">
                            {/* Nội dung của Manage  */}
                            <Switch>
                                <Route exact path="/manage/setting" component={mManageSetting} />
                                {/*<Route path="/manage/open-accout" component={mManageRegister} /> */}
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Manage
