import React, { useState, useEffect , useLayoutEffect } from "react";
import {useHistory } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import axios from "axios"
import mqtt from "mqtt";
import ClipLoader from "react-spinners/ScaleLoader";
import { useDispatch, useSelector } from "react-redux";


import DrawerForm from "../library/drawerAlarm"
import EditableAlarm from "../library/tableEditAlarm"


//Function
import {getKeyValue} from "../../services/fucServices";

//MQTT Config
const host = "wss://hairdresser.cloudmqtt.com";
const options = {
  port: 35572,
  host: "wss://address.cloudmqtt.com",
  username: "qiiwyeiv",
  password: "X4hvcjgbyUit",
  clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
  keepalive: 60,
  protocolId: "MQIsdp",
  protocolVersion: 3,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: "WillMsg",
    payload: "Connection Closed abnormally..!",
    qos: 0,
    retain: false,
  },
  rejectUnauthorized: false,
};

function MNotifications() {
  const history = useHistory()
  const dispatch = useDispatch();
  
  const _idProject = useSelector((state) => state.idTopicProject);
  const isLoaddingAlarm = useSelector((state) => state.isLoaddingAlarm);
  if (isLoaddingAlarm) {
    history.go(0);
  }
  const [clientMQTT, setClientMQTT] = useState(null);
  const [connectStatus, setConnectStatus] = useState("Connect");
  const [payload, setPayload] = useState({});
  const [topic, setTopic] = useState("");

  //Connect MQTT
  useEffect(() => {
    setClientMQTT(mqtt.connect(host, options));
    dispatch({ type: "LOADDING_DASHBOARD" });
    dispatch({type:"LOADDING_TABLE"})
  }, []);


  
  //Client MQTT
  useLayoutEffect(() => {
    if (clientMQTT) {
      clientMQTT.on("connect", () => {
          console.log("MQTT Connecting " + _idProject)
        setConnectStatus("Connected");
        if (_idProject) {
          clientMQTT.subscribe(_idProject, (error) => {
            if (error) {
              console.log("Subscribe to topics error", error);
              setClientMQTT(mqtt.connect(host, options));
            }
          });
        }
       
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
  }, [clientMQTT]);

   //Payload
   useLayoutEffect(() => {
    if(topic){
        var payloadSplit = payload.toString().split('&')

     
     
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
                <div className="page-start-dashboard">
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
                  <div className="table-data-contanier m-t-30">
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
