import React from 'react'
import {
    Text,
    View,
    StyleSheet
  } from 'react-native';
  import * as Animatable from 'react-native-animatable';

function ListAlarm(props) {
    return (
      <View style={styles.card}>
        <View style={styles.cardbody}>
          <View style={styles.screenBetween}>
            <View style={styles.screenLeft}>
             <View style={styles.cardImage}>
                    <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={require('../../../assets/image/alarm-clock.png')}
                    style={styles.logoheader}
                    resizeMode="stretch"
                />
                </View>
              <View syle={styles.containerLeft}>
                <Text style={styles.textHeader}>Voltage</Text>
                <Text style={styles.textdetailHeader}>VLN</Text>
              </View>
            </View>
            <View style={styles.screenRight}>
                <View style={styles.columnRight}>
                    <View style={styles.containerRight}>
                        <Text style={styles.textValue}>High High</Text>
                    </View>
                </View>
            </View>
          </View>
        </View>
      </View>
    );
}


export default ListAlarm

const styles = StyleSheet.create({
    card: {
        margin:6,
        padding:8,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor:"#FFF",
        borderRadius:5
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
        paddingTop:10,
        paddingBottom:10,

        
    },
    screenRight:{
        alignContent:"center",
        alignItems:"center",
        flexDirection:"row",
    },
    columnRight:{
       
    },
    containerRight:{
        paddingBottom:3,
        paddingTop:3,
        paddingLeft:8,
        paddingRight:0,
        borderWidth :0,
        borderColor:"#30CC7B",
        borderRadius:50

    },
    screenLeft:{
        alignContent:"center",
        alignItems:"center",
        flexDirection:"row",
    },
    cardImage:{
        padding:6,
        borderWidth :2,
        borderColor:"#727cf5",
        borderRadius:6,
        marginRight:15
    },
    logoheader:{
        width :15,
        height :15 ,
    },
    containerLeft:{
       
    },
    textHeader:{
        fontFamily: "OpenSans-Bold",
        fontSize:15,
        color:"#E48762",
       
    },
    textdetailHeader:{
        fontFamily: "OpenSans-Bold",
        fontSize:12,
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
        fontSize:13,
        color:"#2B28A9",
        alignContent:"center",
        alignItems:"center",
        
    }

  });