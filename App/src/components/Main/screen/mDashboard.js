import React, {useState, useEffect,useLayoutEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import SwitchSelector from 'react-native-switch-selector';
import {useSelector ,useDispatch} from 'react-redux';
import TimePickerRelayA from '../Library/timePickerRelayA';
import TimePickerRelayB from '../Library/timePickerRelayB';
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import Header from '../Library/mHeaderHome';
import styles from '../../../assets/dashboardCss';
import {getKeyValueString} from "../../services/fucService"
import topicPublish from "../../MQTT/topicPublish"

const options = [
  {label: 'A', value: "auto"},
  {label: 'M', value: 'manual'},
];

//Function check Role
function checkRole(role){
  return role==="User"? true:false;
}

//Check Switch
function checkRLStatus(status){
  return  status==="on"? true:false;
}
//CheckLight
function checkStatus(status){
  var light;
  if(status=="on"){
    light ="off"
  }
  else{
    light ="on"
  }
  return light;
}


//CheckLight
function checkMode(mode){
  var modeRL;
  if(mode ==="auto"){
    modeRL = true
  }
  else{
    modeRL = false
  }
  return modeRL;
}

//Function checkInit 
 function checkInit(mode){
   return mode==="auto"? 0 :1;
 }


function Dashboard(props) {
   //Redux
   var dispatch =useDispatch();

  //RL status
  const [RLstatusA ,setRLstatusA] =useState('off')
  const [RLstatusB ,setRLstatusB] =useState('off')
  
  //RL mode
  const [RLmodeA ,setRLmodeA] =useState('manual')
  const [RLmodeB ,setRLmodeB] =useState('manual')

   //MQTT
   var clientMQTT= props.clientMQTT
   var payload = props.payload ;

   const role = useSelector((state) => state.User).users.role;
   var _idProject = useSelector((state) => state.projectID);
   const RLAstatus = useSelector((state) => state.RLA.RLAstatus);
   const RLAmode = useSelector((state) => state.RLA.RLAmode);
   const RLBstatus = useSelector((state) => state.RLB.RLBstatus);
   const RLBmode = useSelector((state) => state.RLB.RLBmode);
   console.log(RLAstatus + "/"+RLAmode +"/"+RLBstatus +"/"+RLBmode)


   const topic =`${_idProject}/${topicPublish.topic}`
     //Publish MQTT mode Manual
     const handleManualRLA = () => {
      var payload = "&RLAmode"+ "=" + RLAmode + "&"+ "RLAstatus"+"="+checkStatus(RLAstatus)+"&";
      if(checkRLStatus(RLAstatus))
        dispatch({type:'RLAstatusOFF'})
      else
        dispatch({type:'RLAstatusON'})
     
      clientMQTT.publish(topic,payload)
    };
    const handleManualRLB= () => {
      var payload = "&RLBmode"+ "=" + RLBmode + "&"+ "RLBstatus"+"="+checkStatus(RLBstatus)+"&";
      if(checkRLStatus(RLBstatus))
          dispatch({type:'RLBstatusOFF'})
      else
         dispatch({type:'RLBstatusON'})

      clientMQTT.publish(topic,payload)
    };
    const handleChangeModeRelayA = (RLAmodeValue) => {
      if(RLAmodeValue ==="auto")
        dispatch({type:'RLAmodeAuto'})
      else
        dispatch({type:'RLAmodeManual'})
  
    };
    const handleChangeModeRelayB = (RLBmodeValue) => {
      if(RLBmodeValue ==="auto")
        dispatch({type:'RLBmodeAuto'})
      else
        dispatch({type:'RLBmodeManual'})
    };
  


   //Payload
   useLayoutEffect(() => {
    if(payload){
        var payloadSplit = payload.toString().split('&')
        //RLA status
        setRLstatusA(getKeyValueString(payloadSplit,"RLAstatus"))
        setRLstatusB(getKeyValueString(payloadSplit,"RLBstatus"))
        
        //RLA mode
        setRLmodeA(getKeyValueString(payloadSplit,"RLAmode"))
        setRLmodeB(getKeyValueString(payloadSplit,"RLBmode"))
         //RELAY A
        if(RLmodeA ==="auto")
            dispatch({type:'RLAmodeAuto'})
        else if(RLmodeA ==="manual")
            dispatch({type:'RLAmodeManual'})
        //RELAY B
        if(RLmodeB ==="auto")
            dispatch({type:'RLBmodeAuto'})
        else if(RLmodeB ==="manual")
            dispatch({type:'RLBmodeManual'})
          
        //Status RELAY A
        if(RLstatusA ==="on")
            dispatch({type:'RLAstatusON'})
        else if(RLstatusA ==="off")
            dispatch({type:'RLAstatusOFF'})
        //Status RELAY B
        if(RLstatusB ==="on")
            dispatch({type:'RLBstatusON'})
        else if(RLstatusB ==="off")
            dispatch({type:'RLBstatusOFF'})
    }

}, [payload])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1F9EFF" barStyle="light-content" />
      <Header name="CONTROL" isNotification ="true"/>
      <View style={styles.containerControl} pointerEvents={checkRole(role) ? 'none' : 'auto'}>
        <Animatable.View style={styles.mainControl} animation="fadeInLeft">
          <View style={styles.dashboardContainer}>
            <View style={styles.dashboardControl}>
              <Text style={styles.textHeader}>RELAY A</Text>
              {checkRLStatus(RLAstatus) && (
                 <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={require('../../../assets/image/light/on.png')}
                    style={styles.bulbContainerOn}
                    resizeMode="stretch"
               />
              )}
              {!checkRLStatus(RLAstatus) && (
                 <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={require('../../../assets/image/light/off.png')}
                    style={styles.bulbContainerOn}
                    resizeMode="stretch"
                  />
              )}
            </View>
            <View style={styles.border}></View>
            <View style={[styles.controlContainer]}>
              <View style={styles.screenRight}>
                <SwitchSelector
                  options={options}
                  initial={checkInit(RLAmode)}
                  fontSize={12}
                  selectedColor="#7959F8"
                  height={32}
                  borderColor="#70CF98"
                  buttonColor="#70CF98"
                  borderWidth={2}
                  hasPadding
                  valuePadding={2}
                  buttonMargin={2}
                  bold
                  textStyle={{
                    paddingLeft: 2,
                  }}
                  selectedTextStyle={{
                    paddingRight: -5,
                  }}
                  onPress={handleChangeModeRelayA }
                />
              </View>

              <View style={styles.screenLeft}>
                {checkMode(RLAmode)&& <TimePickerRelayA  clientMQTT={clientMQTT}/>}
                {!checkMode(RLAmode)&& (
                  <View style={styles.containerManual}>
                    <TouchableOpacity
                      onPress={handleManualRLA}>
                      <View style={styles.viewPower}>
                        {checkRLStatus(RLAstatus) && (
                          <Animatable.Image
                            animation="bounceIn"
                            duraton="1500"
                            source={require('../../../assets/image/vonke/powerOn.png')}
                            style={styles.powerImage}
                            resizeMode="stretch"
                          />
                        )}
                        {!checkRLStatus(RLAstatus) && (
                          <Animatable.Image
                            animation="bounceIn"
                            duraton="1500"
                            source={require('../../../assets/image/vonke/powerOff.png')}
                            style={styles.powerImage}
                            resizeMode="stretch"
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
          {/* RELAY B */}
          <View style={styles.dashboardContainer}>
            <View style={styles.dashboardControl}>
              <Text style={styles.textHeader}>RELAY B</Text>
              {checkRLStatus(RLBstatus) && (
                 <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={require('../../../assets/image/light/on.png')}
                    style={styles.bulbContainerOn}
                    resizeMode="stretch"
                  />
              )}
              {!checkRLStatus(RLBstatus) && (
                 <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={require('../../../assets/image/light/off.png')}
                    style={styles.bulbContainer}
                    resizeMode="stretch"
                  />
              )}
            </View>
            <View style={styles.border}></View>
            <View style={[styles.controlContainerRelayB]}>
              <View style={styles.screenRight}>
                <SwitchSelector
                  options={options}
                  initial={checkInit(RLBmode)}
                  fontSize={12}
                  selectedColor="#7959F8"
                  height={32}
                  borderColor="#70CF98"
                  buttonColor="#70CF98"
                  borderWidth={2}
                  hasPadding
                  valuePadding={2}
                  buttonMargin={2}
                  bold
                  textStyle={{
                    paddingLeft: 2,
                  }}
                  selectedTextStyle={{
                    paddingRight: -5,
                  }}
                  onPress={handleChangeModeRelayB}
                />
              </View>

              <View style={styles.screenLeft}>
                {checkMode(RLBmode) && <TimePickerRelayB  clientMQTT={clientMQTT} />}
                {!checkMode(RLBmode) && (
                  <View style={styles.containerManual}>
                    <TouchableOpacity
                      onPress={handleManualRLB}>
                      <View style={styles.viewPower}>
                        {checkRLStatus(RLBstatus) && (
                          <Animatable.Image
                            animation="bounceIn"
                            duraton="1500"
                            source={require('../../../assets/image/vonke/powerOn.png')}
                            style={styles.powerImage}
                            resizeMode="stretch"
                          />
                        )}
                        {!checkRLStatus(RLBstatus) && (
                          <Animatable.Image
                            animation="bounceIn"
                            duraton="1500"
                            source={require('../../../assets/image/vonke/powerOff.png')}
                            style={styles.powerImage}
                            resizeMode="stretch"
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
}

export default Dashboard;
