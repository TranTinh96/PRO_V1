import React, { useState, useEffect } from "react";
import mqtt from "mqtt";
import { useSelector ,useDispatch } from "react-redux";
import { Route, Switch ,useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Header from "./element/mHeader";
import Navbars from "./element/mNavbar";
//Content
import Dashboard from "./content/mDashbard";
import mManage from "./content/mManage";
import mAccout from "./content/mAccout";
import mMaps from "./content/mMaps";
import mDataTable from "./content/mDataTable";

import ClipLoader from "react-spinners/ScaleLoader";

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

  useEffect(() => {
    //Connect MQTT
    setClientMQTT(mqtt.connect(host, options));

    setTimeout(() => {
      setIsLoading(!isLoading);
    }, 200);
  }, []);

  //useEffect MQTT
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
        const payload = message.toString();
        setPayload(payload);
      });
    }
    return () => {
      
    };
  }, [clientMQTT]);

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
              <Dashboard {...props} clientMQTT={clientMQTT} payload={payload} />
            )}
          />
          <Route exact path="/manage/setting" component={mManage} />
          <Route exact path="/manage/open-accout" component={mManage} />
          <Route exact path="/accouts" component={mAccout} />
          <Route exact path="/maps" component={mMaps} />
          <Route exact path="/tables" component={mDataTable} />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default MApp;
