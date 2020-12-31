import React, { useState, useEffect ,useLayoutEffect } from "react";
import mqtt from "mqtt";
import { useSelector ,useDispatch } from "react-redux";
import { Route, Switch ,useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Header from "./element/mHeader";
import Navbars from "./element/mNavbar";
//Content
import Dashboard from "./content/mDashboard";
import mManage from "./content/mManage";
import mAccout from "./content/mAccout";
import mMaps from "./content/mMaps";
import DataTable from "./content/mDataTable";

import ClipLoader from "react-spinners/ScaleLoader";
 //Function
 import {getKeyValue ,getKeyValueString ,getKeyValue2Int }  from "../services/fucServices"

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
  rejectUnauthorized: false,
};

function MApp() {
  const dispatch =useDispatch()
  const history = useHistory()
  //Redux
  const _idProject = useSelector((state) => state.idTopicProject);
  //Cookie
  const [cookies, removeCookie] = useCookies(["Auth"]);

 
  //useState
  const [isLoading, setIsLoading] = useState(true);
  const [clientMQTT, setClientMQTT] = useState(null);
  const [connectStatus, setConnectStatus] = useState("Connect");
  const [payload, setPayload] = useState({});
  const [topic ,setTopic] =useState("")

   //Connect MQTT
  useEffect(() => {

    setClientMQTT(mqtt.connect(host, options));

    setTimeout(() => {
      setIsLoading(!isLoading);
    }, 200);
  }, []);

  //Client MQTT
  useEffect(() => {
    if (clientMQTT) {
      clientMQTT.on("connect", () => {
        console.log("Connected" + " " + _idProject);
        setConnectStatus("Connected");
        if (_idProject) {
          clientMQTT.subscribe(_idProject, (error) => {
            if (error) {
              console.log("Subscribe to topics error", error);
              setClientMQTT(mqtt.connect(host, options));
            }
          });
        }
        else{
          dispatch({type :"ID_TOPIC_PROJECT" , _idProject :' '})
          removeCookie("Auth");
          history.push("/")
        }
      });
      clientMQTT.on("error", (err) => {
        setConnectStatus("Connection error");
        console.error("Connection error: ", err);
        clientMQTT.end();
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

        //SUMMARY
        var summaryData ={
          VLN :getKeyValue(payloadSplit,"VLN"),
          VLL :getKeyValue(payloadSplit,"VLL"),
          I :getKeyValue(payloadSplit,"I"),
          KW :getKeyValue(payloadSplit,"KW") ,
          KVA :getKeyValue(payloadSplit,"KVA"),
          KVAR : getKeyValue(payloadSplit,"KVAR"),
          PE : getKeyValue(payloadSplit,"PE"),
          F :getKeyValue(payloadSplit,"F"),
          KWH :getKeyValue(payloadSplit,"KWH")
        }
        //dispatch({type:"SUMMARY",summaryData :summaryData})

        //VOLTAGE LINE-NEUTRAL
        dispatch({type:"ADD_DATA_VLNArray",VLNArray:getKeyValue2Int(payloadSplit,"VLN")})
        dispatch({type:"ADD_DATA_V1NArray",V1NArray:getKeyValue2Int(payloadSplit,"V1N")})
        dispatch({type:"ADD_DATA_V2NArray",V2NArray:getKeyValue2Int(payloadSplit,"V2N")})
        dispatch({type:"ADD_DATA_V3NArray",V3NArray:getKeyValue2Int(payloadSplit,"V3N")})
        dispatch({
          type:"ADD_DATA_VLN",
          VLN:getKeyValue(payloadSplit,"VLN"),
          V1N:getKeyValue(payloadSplit,"V1N"),
          V2N:getKeyValue(payloadSplit,"V2N"),
          V3N:getKeyValue(payloadSplit,"V3N"),
         })


        //CURRENT
        dispatch({
          type:"ADD_DATA_I",
          I:getKeyValue(payloadSplit,"I"),
          I1:getKeyValue(payloadSplit,"I1"),
          I2:getKeyValue(payloadSplit,"I2"),
          I3:getKeyValue(payloadSplit,"I3"),
         })



        //KW
        dispatch({
          type:"ADD_DATA_KW",
          KW:getKeyValue(payloadSplit,"KW"),
          KW1:getKeyValue(payloadSplit,"KW1"),
          KW2:getKeyValue(payloadSplit,"KW2"),
          KW3:getKeyValue(payloadSplit,"KW3"),
         })


        //KVA
        dispatch({
          type:"ADD_DATA_KVA",
          KVA:getKeyValue(payloadSplit,"KVA"),
          KVA1:getKeyValue(payloadSplit,"KVA1"),
          KVA2:getKeyValue(payloadSplit,"KVA2"),
          KVA3:getKeyValue(payloadSplit,"KVA3"),
         })


         //KVAR
         dispatch({
          type:"ADD_DATA_KVAR",
          KVAR:getKeyValue(payloadSplit,"KVAR"),
          KVAR1:getKeyValue(payloadSplit,"KVAR1"),
          KVAR2:getKeyValue(payloadSplit,"KVAR2"),
          KVAR3:getKeyValue(payloadSplit,"KVAR3"),
         })


        //PE
        dispatch({
          type:"ADD_DATA_PF",
          PF:getKeyValue(payloadSplit,"PF"),
          PF1:getKeyValue(payloadSplit,"PF1"),
          PF2:getKeyValue(payloadSplit,"PF2"),
          PF3:getKeyValue(payloadSplit,"PF3"),
         })

         //F & KW
        dispatch({type:"ADD_DATA_F",F:getKeyValue2Int(payloadSplit,"FREQUENCY")})
        dispatch({type:"ADD_DATA_E",E:getKeyValue2Int(payloadSplit,"KWH")})
        dispatch({type:"ADD_DATA_FArray",FArray:getKeyValue2Int(payloadSplit,"FREQUENCY")})
        dispatch({type:"ADD_DATA_EArray",EArray:getKeyValue2Int(payloadSplit,"KWH")})

        //RL status
        dispatch({
          type:"ADD_RL_SELEC",
          RLAstatus:getKeyValueString(payloadSplit,"RLAstatus"),
          RLAmode:getKeyValueString(payloadSplit,"RLAmode"),
          RLBstatus:getKeyValueString(payloadSplit,"RLBstatus"),
          RLBmode:getKeyValueString(payloadSplit,"RLBmode"),
         })
        
    }

}, [payload])


  if (isLoading) {
    return (
      <React.Fragment>
        <div className="container-spinners">
          <div className="spinners">
            <ClipLoader size={60} color="#727cf5" loading={isLoading} />
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Header />
      <div className="pcoded-main-container">
        <Navbars />
        <Switch>
          <Route
            exact
            path="/dashboard"
            render={(props) => (
              <Dashboard {...props} clientMQTT={clientMQTT}/> 
            )}
          />
          <Route exact path="/manage/setting" component={mManage} />
          <Route exact path="/manage/open-accout" component={mManage} />
          <Route exact path="/accouts" component={mAccout} />
          <Route exact path="/maps" component={mMaps} />
          <Route
            exact
            path="/tables"
            render={(props) => (
              <DataTable {...props}  />
            )}
          />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default MApp;
