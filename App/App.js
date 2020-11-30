/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useMemo, useReducer } from 'react';
import { View, ActivityIndicator } from 'react-native'
import {  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme } from 'react-native-paper';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';

import AsyncStorage from "@react-native-community/async-storage"
import AuNavigator from "./src/components/Auth/navigator/auNavigator"
import MainNavigator from "./src/components/Main/navigator/mStackNavigator"
import { AuthContext } from './src/context/authContext';
import { loginReducer, initialLoginState } from "./src/redux/loginReducer"


const App = () => {

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  /*
   *
   * Setting Reducer
   */
  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  /*
   *
   *  Value Context
   */
  const authContext = useMemo(() => ({

    signIn: async (jwtToken) => {
      try {
        await AsyncStorage.setItem('authJWT', jwtToken);
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGIN', token: jwtToken });
    },

    signOut: async () => {

      try {
        await AsyncStorage.removeItem('authJWT');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
 
    signUp: () => {

    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }

  }), []);
 
  /*
   *
   * useEffect
   * 
   */


  useEffect(() => {
    setTimeout(async () => {
      let jwtToken =null ;

      try {
        jwtToken = await AsyncStorage.getItem('authJWT');
      } catch (e) {
        console.log(e);
      }
      console.log('user token: ', jwtToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: jwtToken });
    }, 1000);
  }, []);

 /*
  * Loading
  * 
  */
  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return (

    <PaperProvider theme={theme} >
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
            {loginState.userToken !==null ? <MainNavigator/> :<AuNavigator/>}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;
