import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FeatherIcon from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';

//Import
import Home from "../screen/mHome"
import Accout from "../screen/mAccout"
import Dashboard from "../screen/mDashboard"
//import Map from "../screen/mMap"


//Setting Tav Navigator
const Tab = createMaterialBottomTabNavigator();

function TabNavigator() {
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
            <Tab.Screen name="Home" component={Home} options={{
                tabBarColor: '#FFF',
                tabBarIcon: ({ color }) => (
                    <Foundation name="home" color={color} size={23} />
                ),
            }} />
            <Tab.Screen name="Dashboard" component={Home} options={{
                tabBarColor: '#fff',
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="dashboard" color={color} size={24} />
                ),
            }} />
            <Tab.Screen name="Map" component={Home} options={{
                tabBarColor: '#fff',
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="place" color={color} size={22} />
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
