import React, { useState, useEffect , useLayoutEffect } from "react";
import {useHistory } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import mqtt from "mqtt";
import ClipLoader from "react-spinners/ScaleLoader";
import { useDispatch, useSelector } from "react-redux";


import DrawerForm from "../library/drawerAlarm"
import EditableAlarm from "../library/tableEditAlarm"


function MNotifications() {
  const dispatch = useDispatch();
  const _idProject = localStorage.getItem("AuthID");
  
  return (
    <>
      <div className="pcoded-content">
        <div className="pcoded-inner-content">
          <div className="main-body">
            <div className="page-wrapper ">
              <div className="page-body shadow-none">
                {/* ------- Start-Dashboard -------  */}
                <div className="page-start-dashboard ">
                  <div className="row">
                    <div className="col-6">
                      <div className="page-title-box">
                        <div className="page-title">
                          <div className="page-icon">
                            <FeatherIcon
                              icon="bell"
                              color="#727cf5"
                              size={14}
                            />
                          </div>
                          <div className="page-title-text page-title-text-fs">
                            Alarms
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                        <div className="option-time-report">
                            <DrawerForm />
                        </div>
                      </div>
                  </div>

                  {/* --------------------- Header Dashboard -------------------------*/}
                  <div className="table-data-contanier m-t-30 table-hide-pagination">
                      <EditableAlarm  _idProject={_idProject}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MNotifications;
