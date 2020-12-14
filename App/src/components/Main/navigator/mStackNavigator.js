import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
//Import
import TabNavigator from "./mTabNavigator"
//import Notification from "../screen/mNotification"

const MainStack = createStackNavigator();
const DashboardStack = createStackNavigator();

function StackNavigator() {
    return (
        <MainStack.Navigator
            mode={'modal'}
            screenOptions={{
                headerShown: false,
            }}>
             <MainStack.Screen name={'DashboardStack'}>
                {() => (
                    <DashboardStack.Navigator
                        mode={'card'}
                        screenOptions={{
                            headerShown: false,
                        }}>
                        <DashboardStack.Screen name={'Dashboard'} component={TabNavigator} />
                    </DashboardStack.Navigator>
                )}
            </MainStack.Screen>
            {/*
            <MainStack.Screen name="Notification" component={Notification} />
            <MainStack.Screen name="33" component={Notification} />
             */}
        </MainStack.Navigator>

    )
}

export default StackNavigator
