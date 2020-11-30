import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, Text ,TouchableOpacity } from "react-native"
import { useNavigation, useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Badge } from "react-native-elements"
function mHeader(props) {
     //Navigator
    const navigation = useNavigation();
    
    return (
        <LinearGradient colors={['#FFF', '#FFF']} style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.text}>{props.name}</Text>
                <TouchableOpacity  onPress={()=>navigation.navigate('Notification') }>
                    <MaterialIcons name="notifications" size={26} color="#0074FE" style={[styles.icon], {
                        transform: [{ rotate: "0deg" }]
                    }}  />
                    <Badge
                         badgeStyle={{
                             backgroundColor: "#EB4833",
                         }}
                         status="error"
                        containerStyle={{ position: 'absolute', top: -6, right: -4 }}
                        value={10}
                        textStyle={{
                            color: "white",
  
                        }}
                        
                    />
                </TouchableOpacity>

            </View>
        </LinearGradient>
    )
}

const { width, height } = Dimensions.get("screen")
const styles = StyleSheet.create({
    container: {
        height: 60,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "white",
        position: "relative",

    },
    text:{
        color:"#0074FE" ,
        fontSize:17,
        fontFamily: "Quicksand-Bold",
        marginTop:2
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: 15,
        marginLeft: 10,
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
