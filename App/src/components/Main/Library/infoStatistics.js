import React from 'react'
import {
    Text,
    View,
    Dimensions,
    StyleSheet
  } from 'react-native';
  import * as Animatable from 'react-native-animatable';

function Info(props) {
    return (
      <View style={styles.card}>
        <View style={styles.cardbody}>
          <View style={styles.screenBetween}>
            <View style={styles.screenLeft}>
              <View syle={styles.containerLeft}>
                <Text style={styles.textHeader}>{props.title}</Text>
              </View>
            </View>
            <View style={styles.screenRight}>
                <View style={styles.columnRight}>
                    <View style={styles.containerRight}>
                        <Text style={styles.textValue}>{props.valueSummary}</Text>
                        <Text style={styles.textInfo}>{props.nameSummary}</Text>
                    </View>
                    <View style={styles.containerRightEnd}>
                        <Text style={styles.textValue}>{props.valuePhase1}</Text>
                        <Text style={styles.textInfo}>{props.namePhase1}</Text>
                    </View>
                </View>
                <View style={styles.columnRightTwo}>
                    <View style={styles.containerRight}>
                        <Text style={styles.textValue}>{props.valuePhase2}</Text>
                        <Text style={styles.textInfo}>{props.namePhase2}</Text>
                    </View>
                    <View style={styles.containerRightEnd}>
                        <Text style={styles.textValue}>{props.valuePhase3}</Text>
                        <Text style={styles.textInfo}>{props.namePhase3}</Text>
                    </View>
                </View>
            </View>
          </View>
        </View>
      </View>
    );
}


export default Info

const {width,height} = Dimensions.get("screen")
const styles = StyleSheet.create({
    card: {
        margin:8,
        padding:3,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor:"#FFF",
        borderRadius:10,
        width:350
    },
    cardbody: {
     
    },
    viewHeader:{
        marginBottom:10
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
        flexDirection: "row",
    },
    columnRight:{
        flexDirection: "column",
    },
    columnRightTwo:{
        flexDirection: "column",
        marginLeft:25
    },
    containerRight:{
    },
    screenLeft:{
        alignContent:"center",
        alignItems:"center",
        flexDirection:"row",
    },
    containerLeft:{
       
    },
    textHeader:{
        fontFamily: "OpenSans-Bold",
        fontSize:14,
        color:"#E48762",
       
    },
    textdetailHeader:{
        fontFamily: "OpenSans-Bold",
        fontSize:13,
        color:"#2B28A9",
        marginTop: 3,
    },
    textContent:{
        marginLeft:25,
        fontFamily: "OpenSans-SemiBold",
        fontSize:14,
    },
    textValue:{
        fontFamily: "OpenSans-SemiBold",
        fontSize:15,
        color:"#2B28A9",
        textAlign: 'right'
    },
    textInfo:{
        color: '#CCCDCE',
        marginTop:2,
        fontSize:10,
        fontFamily: "OpenSans-SemiBold",
        marginBottom:5,
        textAlign: 'right'
    },
    textInfoEnd:{
        color: '#CCCDCE',
        marginTop: 2,
        fontSize:10,
        fontFamily: "OpenSans-SemiBold",
        marginBottom:0,
        textAlign: 'right'
    }
  

  });