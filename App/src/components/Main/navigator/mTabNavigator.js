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
import configMQTT from "../../MQTT/config.MQTT"


//Setting Tav Navigator
const Tab = createMaterialBottomTabNavigator();

//MQTT Config

function TabNavigator() 
{
  console.log("Tab Navigator")
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
      
        if((_idProject !="ADMIN" )&& (_idProject !== null))
        {
            
            setClientMQTT(mqtt.connect(configMQTT.host,configMQTT.options));
        }
        else
        {
          signOut()
        }
      }, [])

    //useEffect MQTT
    useEffect(() => {
        if (clientMQTT) {
          clientMQTT.on("connect", () => {
            console.log("Connect MQTT : " +_idProject)
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
            console.log(topic)
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
            initialRouteName="Notification"
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
            <Tab.Screen name="Home"  children={()=><Home payload={payload} topic={topic}/>}
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
