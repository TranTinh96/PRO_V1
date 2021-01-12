import React ,{useLayoutEffect} from 'react'
import { View, Text, Dimensions, ScrollView, SafeAreaView, StatusBar } from "react-native"
import { useNavigation, useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios'
import styles from '../../../assets/dashboardCss';
import Header from '../Library/mHeaderHome';
import ListAlarm from "../Library/listAlarm"


function Notification() {
    useLayoutEffect(() => {
      
    }, [])
    //Navigator
    const navigation = useNavigation();
    //THEM
    const { colors } = useTheme();
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='#1F9EFF' barStyle="light-content" />
            <Header name="ALARM" isNotification ="false" />
            <ScrollView showsVerticalScrollIndicator={false} >
                <Animatable.View
                    style={[styles.main]} animation="fadeInLeft">
                    <View style={styles.formContainerAlarm} >
                        <ListAlarm/>
                    </View>
                </Animatable.View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default Notification
