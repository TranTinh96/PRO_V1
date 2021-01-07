import React,{useState, useEffect} from 'react'
import axios from "axios"
import { useDispatch ,useSelector} from "react-redux";
import { Timeline ,Avatar } from 'antd';
import { ClockCircleOutlined,FileProtectOutlined ,UserOutlined } from '@ant-design/icons';

import ManageProject from "../mMiniComponent/manageProject"
import {checkTypeUndefined} from "../../services/fucServices"


function Accout() {
    var dispatch = useDispatch()


    const _idProject = useSelector((state) => state.idTopicProject);

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
