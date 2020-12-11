import React from 'react'
import {
    Text,
    View,
    Dimensions,
    StyleSheet ,
    ScrollView

  } from 'react-native';
  import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

function Info(props) {
    return (
        <View style={[styles.container]}>
            <View style={styles.viewHeader}>
                <Text style={styles.textHeader}>{props.title}</Text>
            </View>
            <View style={styles.containerFlex}>
                <View style={styles.containerContnet}>
                    <Text style={styles.textName}>SUM</Text>
                    <Text style={styles.textValue}>{props.valueSUM}</Text>
                </View>
                <View style={styles.containerContnet}>
                    <Text style={styles.textName}>PHA1</Text>
                    <Text style={styles.textValue}>{props.valuePHA1}</Text>
                </View>
                <View style={styles.containerContnet}>
                    <Text style={styles.textName}>PHA2</Text>
                    <Text style={styles.textValue}>{props.valuePHA2}</Text>
                </View>
                <View style={styles.containerContnet}>
                    <Text style={styles.textName}>PHA3</Text>
                    <Text style={styles.textValue}>{props.valuePHA3}</Text>
                </View>
            </View>
        </View>
    )
}


export default Info

const {width,height} = Dimensions.get("screen")
const styles = StyleSheet.create({
        container :{
            width :285,
            height:135,
            borderWidth: 1,
            borderColor: "#f6f6f6",
            borderRadius:15,
            padding:15,
            margin:5
            
        },
        textHeader:{
            fontFamily: "OpenSans-Bold",
            fontSize:13,
            marginTop: 0,
            color:"#727cf5",
            alignContent:"center",
            alignItems:"center"
        },
        containerFlex :{
            flexDirection: 'row'
        },
        containerContnet:{
            flexDirection: 'column',
            marginTop:20 ,
            padding:5
        },
        textName:{
            fontFamily: "OpenSans-Bold",
            fontSize:13,
            marginBottom:20,
            marginRight:25
        },
        textValue:{
            fontFamily: "OpenSans-SemiBold",
            fontSize:14,
            
        }

  
  });