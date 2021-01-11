import React, { useState, useEffect , useLayoutEffect } from "react";
import {useHistory } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import mqtt from "mqtt";
import ClipLoader from "react-spinners/ScaleLoader";
import { useDispatch, useSelector } from "react-redux";


import DrawerForm from "../library/drawerAlarm"
import EditableAlarm from "../library/tableEditAlarm"
import configMQTT from "../../MQTT/config.MQTT"


function MNotifications() {
  const history = useHistory()
  const dispatch = useDispatch();
  
  const _idProject = localStorage.getItem("AuthID");
  const isLoaddingAlarm = useSelector((state) => state.isLoaddingAlarm);
  
  const [clientMQTT, setClientMQTT] = useState(null);
  const [connectStatus, setConnectStatus] = useState("Connect");
  const [payload, setPayload] = useState({});
  const [topic, setTopic] = useState("");

  //Connect MQTT
  useEffect(() => {
    if (isLoaddingAlarm) {
      history.go(0);
    }
    if((_idProject !="ADMIN" )&& (_idProject !== null))
    {
      setClientMQTT(mqtt.connect(configMQTT.host,configMQTT.options));
      localStorage.setItem("AuthID",_idProject)
      dispatch({type :"ID_TOPIC_PROJECT" ,_idProject : _idProject})

    }
    dispatch({ type: "LOADDING_DASHBOARD" });
    dispatch({type:"LOADDING_TABLE"})
 
  }, []);


  
  //Client MQTT
  useLayoutEffect(() => {
    if (clientMQTT) {
      clientMQTT.on("connect", () => {
          console.log("MQTT Connecting " + _idProject)
          setConnectStatus("Connected");
          clientMQTT.subscribe(_idProject, (error) => {
            if (error) {
              console.log("Subscribe to topics error", error);
            }
          });
    
       
      });
      clientMQTT.on("error", (err) => {
        setConnectStatus("Connection error");
        console.error("Connection error: ", err);
        
      });
      clientMQTT.on("reconnect", () => {
        setConnectStatus("Reconnecting");
      });

      clientMQTT.on("disconnect", () => {
        setConnectStatus("Disconnect");
      });

      clientMQTT.on("message", (topic, message) => {
        setTopic(topic)
        const payload = message.toString();
        setPayload(payload);
      });
    }
    return () => {
         
     };
  }, [clientMQTT ]);

   //Payload
   useLayoutEffect(() => {
    if(topic){
        var payloadSplit = payload.toString().split('&')
        dispatch({type:"LOADDING_DATA_ALARM"})
     
     
      }
    }, [payload])

  if (isLoaddingAlarm) {
    return (
      <React.Fragment>
        <div className="container-spinners">
          <div className="spinners">
            <ClipLoader size={60} color="#727cf5" loading={isLoaddingAlarm} />
          </div>
        </div>
      </React.Fragment>
    );
  }
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
