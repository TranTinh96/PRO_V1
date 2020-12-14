import React from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, SafeAreaView, StatusBar } from "react-native"
import { useNavigation, useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../Library/mHeaderHome';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
function mNotification() {
    //Navigator
    const navigation = useNavigation();
    //THEM
    const { colors } = useTheme();
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='#1F9EFF' barStyle="light-content" />
            <Header name="NOTIFICATION" isNotification ="true" />
            <ScrollView showsVerticalScrollIndicator={false} >
                <Animatable.View
                    style={[styles.main, {}]}>
                    <View style={styles.formContainer} >
                
                    </View>
                </Animatable.View>
            </ScrollView>

        </SafeAreaView>
    )
}
const { height } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4'
    },
    main:{
        backgroundColor:"#F4F4F4"
    },
    formContainer:{
        padding:15
    }

});
export default mNotification
