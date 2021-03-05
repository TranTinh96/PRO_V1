import React,{useEffect} from 'react'
import { useDispatch ,useSelector} from "react-redux";

import ManageProject from "../mMiniComponent/manageProject"
import {checkTypeUndefined} from "../../services/fucServices"


function Accout() {
    var dispatch = useDispatch()


    const _idProject = localStorage.getItem("AuthID");

    useEffect(() => {
        if(! checkTypeUndefined(_idProject)){
           
        }
        dispatch({ type: "LOADDING_DASHBOARD" });
        dispatch({ type: "LOADDING_TABLE" });
        dispatch({type:"LOADDING_ALARM"})
      }, []);
    
    return (
        <div className="pcoded-content">
            <div className="pcoded-inner-content">
                <div className="main-body">
                    <div className="page-wrapper">
                        <div className="page-body">
                            <div className="page-start-dashboard ">                   
                                <ManageProject/>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accout
