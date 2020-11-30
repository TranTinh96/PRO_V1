import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
//Import
import Home from "../screen/auHome";
import Login from "../screen/auLogin";
import Register from "../screen/auRegister";
import Project from "../screen/auProject"

const AuthStack = createStackNavigator();
const LoginStack = createStackNavigator();

function AuNavigator() {
    return (
        <AuthStack.Navigator
            mode={'modal'}
            screenOptions={{
                headerShown: false,
            }}>
            <AuthStack.Screen name={'LoginStack'}>
                {() => (
                    <LoginStack.Navigator
                        mode={'card'}
                        screenOptions={{
                            headerShown: false,
                        }}>
                        <LoginStack.Screen name={'Home'} component={Home} />
                    </LoginStack.Navigator>
                )}
            </AuthStack.Screen>
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen name="Register" component={Register} />
            <AuthStack.Screen name="Project" component={Project} />
        </AuthStack.Navigator>

    )
}

export default AuNavigator
