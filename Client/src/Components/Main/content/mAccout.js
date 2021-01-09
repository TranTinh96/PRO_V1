import React,{useState, useEffect} from 'react'
import axios from "axios"
import { useDispatch ,useSelector} from "react-redux";
import { Timeline ,Avatar } from 'antd';
import { ClockCircleOutlined,FileProtectOutlined ,UserOutlined } from '@ant-design/icons';

import {checkTypeUndefined} from "../../services/fucServices"


function Accout() {
    var dispatch = useDispatch()

    const [infoProject ,setInfoProject ] = useState({})
    const [isProject ,setIsfoProject ] = useState(false)
    const emailUser = useSelector((state) => state.setUserJWT).users.email;
    const nameUser = useSelector((state) => state.setUserJWT).users.user;
    const roleUser = useSelector((state) => state.setUserJWT).users.role;
    const _idProject = localStorage.getItem("AuthID");

    useEffect(() => {
        if(! checkTypeUndefined(_idProject)){
            axios.post('/api/cabin/accouts/information', {
                _idProject :_idProject 
             })
             .then(function(res) {
                 let resData = res.data;
                 console.log(resData)
                 if(resData.status){
                     setInfoProject(resData.project)
                     setIsfoProject(true)
                     
                 }
                 else
                 {
                     setInfoProject({});
                     setIsfoProject(false)
                 }
              
             
             })
             .catch(function (error) {
               console.log(error);
         });
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
                                <div className="avatar-container m-t-30">
                                    <Avatar
                                        size={{
                                        xs: 24,
                                        sm: 32,
                                        md: 40,
                                        lg: 64,
                                        xl: 80,
                                        xxl: 100,
                                        }}
                                        src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-9/58933439_653230448470099_801322193127473152_o.jpg?_nc_cat=106&ccb=2&_nc_sid=8bfeb9&_nc_ohc=DCjG4vuNVe0AX95e97Q&_nc_ht=scontent.fsgn5-6.fna&oh=b9511536f9dedf09857003080b9dd8b5&oe=601CF94F"
                                    />
                                    <h5>{nameUser}</h5>
                                    <h6>@{roleUser}</h6>
                                </div>
                                <div className="timeLine-container">
                                 <Timeline mode="alternate">
                                    <Timeline.Item dot={<FileProtectOutlined style={{ fontSize: '16px' }} />}>{infoProject.timeCreate}  - Create new cabin project  with name ({infoProject.nameProject}) </Timeline.Item>
                                    <Timeline.Item color="green">ID : {infoProject.tokenProject}</Timeline.Item>
                                    <Timeline.Item dot={<UserOutlined style={{ fontSize: '16px' }} />}>
                                        Register Accout 
                                    </Timeline.Item>
                                    <Timeline.Item color="red"> Email : {emailUser}</Timeline.Item>
                                    <Timeline.Item > User : {nameUser} </Timeline.Item>
                                    <Timeline.Item color="green"> Role : {roleUser}</Timeline.Item>
                                    <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
                                
                                    </Timeline.Item>
                                </Timeline>
                                </div>
                              
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accout
