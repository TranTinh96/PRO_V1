import React ,{useState ,useEffect} from "react";
import mqtt from "mqtt"
import { useSelector } from 'react-redux';
import {Route, Switch } from "react-router-dom"
import Header from "./element/mHeader"
import Navbars from "./element/mNavbar"
//Content
import Dashboard from "./content/mDashbard"
import mManage from "./content/mManage"
import mAccout from "./content/mAccout"
import mMaps from "./content/mMaps"
import mDataTable from "./content/mDataTable"

var options = {
  port : 35572,
  host: "wss://address.cloudmqtt.com",
  username: 'qiiwyeiv',
  password: 'X4hvcjgbyUit',
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  reconnectPeriod: 1000,
  connectTimeout: 5 * 1000,
  protocolId: "MQIsdp",
  protocolVersion: 3,
  clean: true,
  encoding: "utf8",
  timeout: 5,
  useSSL: true
};


function MApp() {
  //Redux
  var _idProject = useSelector(state => state.idTopicProject);

  //useState
 
  const [connectStatus, setConnectStatus] = useState('Connect');
  const [payload, setPayload] = useState({});
  
  var clientMQTT ;
  //Connect MQTT
  if(_idProject)
  {
    
    clientMQTT = mqtt.connect('wss://hairdresser.cloudmqtt.com',options);
    clientMQTT.subscribe(_idProject,{qos: 1}, (error) => {
      if (error) {
        console.log('Subscribe to topics error', error)
      }
    });
  }
  
  useEffect(() => {
    if(clientMQTT)
    {
      clientMQTT.on('connect', () => {
        setConnectStatus('Connected');
      });
      clientMQTT.on('error', (err) => {
        setConnectStatus('Connection ẻ');
        console.error('Connection error: ', err);
        clientMQTT.end();
      });
    
      clientMQTT.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() };
        setPayload(payload);
      });
    }
  }, [clientMQTT])
   
  return (
    <React.Fragment>
      <Header />
      <div className="pcoded-main-container">
        <Navbars />
        <Switch>
          <Route exact path="/dashboard"
            render={(props) => <Dashboard {...props} clientMQTT={clientMQTT} />}
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

export default MApp

