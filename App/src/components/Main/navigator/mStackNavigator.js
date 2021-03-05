import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
//Import
import TabNavigator from "./mTabNavigator"

const MainStack = createStackNavigator();
const DashboardStack = createStackNavigator();

function StackNavigator() {
    console.log("Stack Navigator")
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
        </MainStack.Navigator>

    )
}

export default StackNavigator
