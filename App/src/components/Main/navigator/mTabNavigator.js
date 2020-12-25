import React ,{useState,useEffect} from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FeatherIcon from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import mqtt from "@taoqf/react-native-mqtt"
//Import
import Home from "../screen/mHome"
import Accout from "../screen/mAccout"
import Dashboard from "../screen/mDashboard"
import Notification from "../screen/mNotification"


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
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  rejectUnauthorized: false,
};


function TabNavigator() {
    const[clientMQTT ,setClientMQTT] = useState(null)
    const [connectStatus, setConnectStatus] = useState("Connect");
    const [payload, setPayload] = useState({});

    //useEffect connect MQTT   
    useEffect(() => {
        //Connect MQTT
        setClientMQTT(mqtt.connect(host, options))
      }, [])
    //useEffect MQTT
    useEffect(() => {
        if (clientMQTT) {
          clientMQTT.on("connect", () => {
            console.log("Connected");
            setConnectStatus("Connected");
            clientMQTT.subscribe('TranTinh', (error) => {
              if (error) {
                console.log("Subscribe to topics error", error);
              }
            });
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
            <Tab.Screen name="Home"  children={()=><Home payload={payload} clientMQTT={clientMQTT}/>}
            options={{
                tabBarColor: '#FFF',
                tabBarIcon: ({ color }) => (
                    <Foundation name="home" color={color} size={23} />
                ),
            }} />
            <Tab.Screen name="Dashboard" component={Dashboard} options={{
                tabBarColor: '#fff',
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="dashboard" color={color} size={24} />
                ),
            }} />
  
            <Tab.Screen name="Notification" component={Notification} options={{
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
