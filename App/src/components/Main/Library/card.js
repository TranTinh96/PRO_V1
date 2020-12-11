import React from 'react'
import {
    Text,
    View,
    Dimensions,
    StyleSheet
  } from 'react-native';
  import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

function Card(props) {
    return (
        <View style={styles.card}>
            <View style={styles.cardbody}>
                <View style={styles.viewHeader}>
                    <Text style={styles.textHeader}>{props.title}</Text>
                </View>
                <View style={styles.screenBetween}>
                     <View style={styles.screenLeft}>
                        <Badge status="success" containerStyle ={{
                                position:"absolute",
                                marginTop:7,
                                marginLeft:10
                        }}  />
                        <Text style={styles.textContent}>{props.name}</Text>
                     </View>
                     <View style={styles.screenRight}>
                        <Text style={styles.textValue}>{props.value}</Text>
                        <Text style={styles.textUnit}>{props.unit}</Text>
                    </View>
                </View>
                <View style={styles.screenBetween}>
                     <View style={styles.screenLeft}>
                        <Badge status="success" containerStyle ={{
                                position:"absolute",
                                marginTop:7,
                                marginLeft:10
                        }}  />
                        <Text style={styles.textContent}>{props.name1}</Text>
                     </View>
                     <View style={styles.screenRight}>
                        <Text style={styles.textValue}>{props.value1}</Text>
                        <Text style={styles.textUnit}>{props.unit}</Text>
                    </View>
                </View>

                <View style={styles.screenBetween}>
                     <View style={styles.screenLeft}>
                        <Badge status="success" containerStyle ={{
                                position:"absolute",
                                marginTop:7,
                                marginLeft:10
                        }}  />
                        <Text style={styles.textContent}>{props.name2}</Text>
                     </View>
                     <View style={styles.screenRight}>
                        <Text style={styles.textValue}>{props.value2}</Text>
                        <Text style={styles.textUnit}>{props.unit}</Text>
                    </View>
                </View>
                <View style={styles.screenBetween}>
                     <View style={styles.screenLeft}>
                        <Badge status="success" containerStyle ={{
                                position:"absolute",
                                marginTop:7,
                                marginLeft:10
                        }}  />
                        <Text style={styles.textContent}>{props.name3}</Text>
                     </View>
                     <View style={styles.screenRight}>
                        <Text style={styles.textValue}>{props.value3}</Text>
                        <Text style={styles.textUnit}>{props.unit}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}


export default Card

const {width,height} = Dimensions.get("screen")
const styles = StyleSheet.create({
    card: {
        padding :10,
        backgroundColor:"#FFF"
    },
    cardbody: {
     
    },
    viewHeader:{
        marginBottom:10
    },
    textHeader:{
        marginLeft: 10,
        fontFamily: "OpenSans-Bold",
        fontSize:13,
        marginTop: 0,
        color:"#727cf5",
        alignContent:"center",
        alignItems:"center"
    },
    screenBetween:{
        flexDirection: 'row',
        position : 'relative',
        alignContent:"stretch",
        justifyContent: 'space-between',
        alignItems: 'stretch',
        paddingTop:8,
        paddingBottom:6,

        
    },
    screenRight:{
        flexDirection: 'row',
    },
    screenLeft:{
        
    },
    textContent:{
        marginLeft:25,
        fontFamily: "OpenSans-SemiBold",
        fontSize:14,
    },
    textValue:{
        fontFamily: "OpenSans-SemiBold",
        fontSize:14,
    },
    textUnit:{
        fontFamily: "OpenSans-SemiBold",
        fontSize:14,
        marginLeft:6
    }
  

  });