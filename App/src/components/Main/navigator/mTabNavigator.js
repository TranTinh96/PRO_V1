import React ,{useState,useEffect ,useContext} from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FeatherIcon from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import {useSelector} from 'react-redux';
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

function TabNavigator() 
{
  console.log("Tab Navigator")
    //Context
  const { signOut } = useContext(AuthContext);
  //Redux
  var _idProject = useSelector((state) => state.projectID);
 console.log(_idProject)
  useEffect(() => {
      
      if(!_idProject)
      {
          signOut()
      }
    }, [])
    
      
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
            <Tab.Screen name="Home"  children={()=><Home />}
            options={{
                tabBarColor: '#FFF',
                tabBarIcon: ({ color }) => (
                    <Foundation name="home" color={color} size={23} />
                ),
            }} />
            {/*
            <Tab.Screen name="Dashboard" children={()=><Dashboard payload={payload} clientMQTT={clientMQTT}  topic={topic}/>}
                options={{
                tabBarColor: '#fff',
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="dashboard" color={color} size={24} />
                ),
            }} />
           */}
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
