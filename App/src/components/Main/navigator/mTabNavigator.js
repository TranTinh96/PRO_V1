import React ,{useState,useEffect ,useContext} from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FeatherIcon from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import mqtt from "@taoqf/react-native-mqtt"
import { useSelector } from "react-redux";
//Import
import Home from "../screen/mHome"
import Accout from "../screen/mAccout"
import Dashboard from "../screen/mDashboard"
import Notification from "../screen/mNotification"

//Context
import { AuthContext } from '../../../context/authContext';



//Setting Tav Navigator
const Tab = createMaterialBottomTabNavigator();

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
  reconnectPeriod: 10000,
  connectTimeout: 30 * 1000,
  rejectUnauthorized: false,
};


function TabNavigator() 
{
  //Context
    const { signOut } = useContext(AuthContext);
    //Redux
    var _idProject = useSelector((state) => state.projectID);
    //MQTT
    const[clientMQTT ,setClientMQTT] = useState(null)
    const [connectStatus, setConnectStatus] = useState("Connect");
    const [payload, setPayload] = useState({});
    const [topic, setTopic] = useState("")
    //useEffect connect MQTT   
    useEffect(() => {
        //Connect MQTT
        setClientMQTT(mqtt.connect(host, options))
      }, [])
    //useEffect MQTT
    useEffect(() => {
        if (clientMQTT) {
          clientMQTT.on("connect", () => {
            console.log("Connected" +_idProject);
            setConnectStatus("Connected");
            if(_idProject){
              clientMQTT.subscribe(_idProject, (error) => {
                if (error) {
                  console.log("Subscribe to topics error", error);
                }
              });
            }
            else
            {
              signOut()
            }
           
          });
          clientMQTT.on("error", (err) => {
            setConnectStatus("Connection error");
            console.error("Connection error: ", err);
            clientMQTT.end();
          });
          clientMQTT.on("reconnect", () => {
            console.log("ReConnecting");
            setConnectStatus("Reconnecting");
          });
    
          clientMQTT.on("disconnect", () => {
            console.log("DisConnect");
            setConnectStatus("Disconnect");
          });
    
          clientMQTT.on("message", (topic, message) => {
            const payload = message.toString() ;
            setPayload(payload);
            setTopic(topic)
          });
        }
      }, [clientMQTT]);
      
    return (
        <Tab.Navigator
            labeled={false}
            shifting={true}
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="Home"
            activeColor="#0074FE"
            inactiveColor="#ADADAD"
            barStyle={{
                backgroundColor: '#A5D5F3',
                height: 50,
                borderTopWidth: 2,
                borderTopColor: "#FAFAFA",
                borderRadius: 3
            }}
        >
            <Tab.Screen name="Home"  children={()=><Home payload={payload} clientMQTT={clientMQTT} topic={topic}/>}
            options={{
                tabBarColor: '#FFF',
                tabBarIcon: ({ color }) => (
                    <Foundation name="home" color={color} size={23} />
                ),
            }} />
            <Tab.Screen name="Dashboard" children={()=><Dashboard payload={payload} clientMQTT={clientMQTT}  topic={topic}/>}
                options={{
                tabBarColor: '#fff',
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="dashboard" color={color} size={24} />
                ),
            }} />
  
            <Tab.Screen name="Notification" component={Notification} options={{
                tabBarBadge:true,
                tabBarColor: '#fff',
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="notifications-none" color={color} size={26} />
                ),
            }} />
            <Tab.Screen name="Accout" component={Accout} options={{
                tabBarColor: '#fff',
                tabBarIcon: ({ color }) => (
                    <FeatherIcon name="user" color={color} size={22} />
                ),
            }} />
        </Tab.Navigator>
    )
}

export default TabNavigator
