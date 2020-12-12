import React from 'react'
import {
    Text,
    View,
    Dimensions,
    StyleSheet
  } from 'react-native';
  import * as Animatable from 'react-native-animatable';

function Card(props) {
    return (
      <View style={styles.card}>
        <View style={styles.cardbody}>
          <View style={styles.screenBetween}>
            <View style={styles.screenLeft}>
                <View style={styles.cardImage}>
                    <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={require('../../../assets/image/vonke/v23.png')}
                    style={styles.logoheader}
                    resizeMode="stretch"
                />
                </View>
              <View syle={styles.containerLeft}>
                <Text style={styles.textHeader}>VOLTAGE</Text>
                <Text style={styles.textdetailHeader}>{props.title}</Text>
              </View>
            </View>
            <View style={styles.screenRight}>
                <View style={styles.columnRight}>
                    <View style={styles.containerRight}>
                        <Text style={styles.textValue}>{props.value}</Text>
                        <Text style={styles.textInfo}>{props.name}</Text>
                    </View>
                    <View style={styles.containerRightEnd}>
                        <Text style={styles.textValue}>{props.value1}</Text>
                        <Text style={styles.textInfo}>{props.name1}</Text>
                    </View>
                </View>
                <View style={styles.columnRightTwo}>
                    <View style={styles.containerRight}>
                        <Text style={styles.textValue}>{props.value2}</Text>
                        <Text style={styles.textInfo}>{props.name2}</Text>
                    </View>
                    <View style={styles.containerRightEnd}>
                        <Text style={styles.textValue}>{props.value3}</Text>
                        <Text style={styles.textInfo}>{props.name3}</Text>
                    </View>
                </View>
            </View>
          </View>
        </View>
      </View>
    );
}


export default Card

const {width,height} = Dimensions.get("screen")
const styles = StyleSheet.create({
    card: {
        margin:8,
        padding:3,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor:"#FFF",
        borderRadius:10
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
    cardImage:{
        padding:6,
        borderWidth :2,
        borderColor:"#30CC7B",
        borderRadius:50,
        marginRight:10
    },
    logoheader:{
        width :17,
        height :17 ,
       
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