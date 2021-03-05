import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from "moment"
import {useSelector} from 'react-redux';

function TimePicker(props) {
   //MQTT
   var clientMQTT= props.clientMQTT
   //
  var [timeStartRelayA, setTimeStartRelayA] = useState('00:00');
  var [timeEndRelayA, setTimeEndRelayA] = useState('00:00');
  const [isDatePickerVisibleStartRelayA,setDatePickerVisibilityStartRelayA,] = useState(false);
  const [isDatePickerVisibleEndRelayA,setDatePickerVisibilityEndRelayA,] = useState(false);
  
  const RLBmode = useSelector((state) => state.RLB.RLBmode);
  var _idProject = useSelector((state) => state.projectID);

  const topic =`${_idProject}/`

  //StartRelayA
  const showTimePickerStartRelayA = () => {
    setDatePickerVisibilityStartRelayA(true);
  };
  const hideTimePickerStartRelayA = () => {
    setDatePickerVisibilityStartRelayA(false);
  };
  const handleConfirmStartRelayA = (datetime) => {
    setTimeStartRelayA(moment(datetime).format('HH:MM'))
    hideTimePickerStartRelayA();
  };
  //  EndRelayA
  const showTimePickerEndRelayA = () => {
    setDatePickerVisibilityEndRelayA(true);
  };
  const hideTimePickerEndRelayA = () => {
    setDatePickerVisibilityEndRelayA(false);
  };
  const handleConfirmEndRelayA = (datetime) => {
    setTimeEndRelayA(moment(datetime).format('HH:MM'))
    hideTimePickerEndRelayA();
  };

    //Publish MQTT mode Auto
    const onClickRLAauto = () => {
      if( (timeStartRelayA !==" ") &&(timeEndRelayA !==" ")){
          var payload = "&RLBmode"+ "=" + RLBmode + "&"+ "RLBonTime"+"=" +timeStartRelayA +":00"+"&"+"RLBoffTime"+"=" + timeEndRelayA+":00"+"&";
          clientMQTT.publish(topic,payload)
      }
      else
      {
        alert("RLAonTime or RLAoffTime don't value !")
      }
    }

  return (
    <View style={styles.containerAuto}>
      <View style={styles.autoTime}>
        <View style={styles.timeContainer}>
          <TextInput style={styles.textTime} value={timeStartRelayA} />
          <TouchableOpacity onPress={showTimePickerStartRelayA }>
            <Animatable.Image
              animation="bounceIn"
              duraton="1500"
              source={require('../../../assets/image/time.png')}
              style={styles.timeImage}
              resizeMode="stretch"
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisibleStartRelayA}
            mode="time"
            onConfirm={handleConfirmStartRelayA}
            onCancel={hideTimePickerStartRelayA}
          />
        </View>
      </View>
      <View style={styles.padding}></View>
      <View style={styles.autoTime}>
        <View style={styles.timeContainer}>
          <TextInput style={styles.textTime} value={timeEndRelayA} />
          <TouchableOpacity onPress={showTimePickerEndRelayA }>
            <Animatable.Image
              animation="bounceIn"
              duraton="1500"
              source={require('../../../assets/image/time.png')}
              style={styles.timeImage}
              resizeMode="stretch"
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisibleEndRelayA}
            mode="time"
            onConfirm={handleConfirmEndRelayA}
            onCancel={hideTimePickerEndRelayA}
          />
        </View>
      </View>
      <View style={styles.autoButton}>
        <TouchableHighlight onPress={onClickRLAauto}>
            <View style={styles.buttonSet}>
                <Text style={styles.textButton}>SET</Text>
            </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default TimePicker;

const styles = StyleSheet.create({
  containerAuto: {
    flexDirection: 'row',
  },
  autoTime: {
    flexDirection: 'column',
  },
  autoButton: {
      width:20
  },
  timeContainer: {
    flexDirection: 'row',
    width: 100,
    marginBottom:14
  },
  textTime: {
    height: 35,
    width: 60,
    borderColor: '#727cf5',
    borderBottomWidth: 1,
    fontFamily: "OpenSans-SemiBold",
    fontSize:14,
    color:"#2B28A9",
    textAlign:'center',
    padding:5
  },
  timeImage: {
    width: 25,
    height: 25,
    marginLeft:0,
    marginTop:8
    
  },
  autoButton:{
    justifyContent:"center",
    marginTop:-5,
    marginRight:5,
    marginLeft:6
  },
  buttonSet: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding:4,
    paddingLeft: 14,
    paddingRight:14,
    backgroundColor:"#727cf5",
    borderRadius:20
  
  },
  textButton:{
    color:"#FFF",
    fontFamily: "OpenSans-Bold",
    fontSize:13,
  },
  padding:{
    marginLeft:15
  }
});
