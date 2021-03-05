import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, Text ,TouchableOpacity } from "react-native"
import { useNavigation, useTheme } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Badge } from "react-native-elements"
function mHeader(props) {
     //Navigator
    const navigation = useNavigation();
    if(props.isNotification=="true")
    {
        return (
            <LinearGradient colors={['#F4F4F4', '#F4F4F4']} style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.text}>{props.name}</Text>
                    <TouchableOpacity  onPress={()=>navigation.navigate('Notification') }>
                        <MaterialIcons name="notifications-none" size={24} color="#0074FE" style={[styles.icon], {
                            transform: [{ rotate: "0deg" }]
                        }}  />
                        <Badge
                            badgeStyle={{
                                backgroundColor: "#EB4833",
                            }}
                            status="error"
                            containerStyle={{ position: 'absolute', top: -2, right: 0 }}
                           
                            
                        />
                    </TouchableOpacity>

                </View>
            </LinearGradient>
        )
    }
    return(
        <LinearGradient colors={['#FFF', '#FFF']} style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.text}>{props.name}</Text>
                </View>
            </LinearGradient>
    )
}

const { width, height } = Dimensions.get("screen")
const styles = StyleSheet.create({
    container: {
        height: 50,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: "#F4F4F4",
        position: "relative",

    },
    text:{
        color:"#0074FE" ,
        fontSize:15,
        fontFamily: "OpenSans-Bold",
        marginTop:0
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: 15,
        marginLeft: 5,
        marginRight: 12,

    },
    icon: {
        marginTop: 2,

    },
    iconSearch: {
        marginTop: 5
    },
    searchContainer: {
        position: "absolute",
        right: 10,
        top: 10
    },


})

export default mHeader
