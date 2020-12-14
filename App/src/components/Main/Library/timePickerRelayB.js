import React, {useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from "moment"

function TimePicker() {
  var [timeEndRelayB, setTimeEndRelayB] = useState('6:30');
  const [isDatePickerVisibleStartRelayA,setDatePickerVisibilityStartRelayA,] = useState(false);
  //StartRelayA
  const showTimePickerStartRelayA = () => {
    setDatePickerVisibilityStartRelayA(true);
  };
  const hideTimePickerStartRelayA = () => {
    setDatePickerVisibilityStartRelayA(false);
  };
  const handleConfirmStartRelayA = (datetime) => {
    setTimeEndRelayB(moment(datetime).format('HH:MM'))
    hideTimePickerStartRelayA();
  };
  return (
    <View style={styles.containerAuto}>
      <View style={styles.autoTime}>
        <View style={styles.timeContainer}>
          <TextInput style={styles.textTime} value={timeEndRelayB} />
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
      <View style={styles.autoButton}>
        <TouchableHighlight>
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
    marginLeft:5,
    marginTop:8
    
  },
  autoButton:{
    justifyContent:"center",
    marginTop:-8,
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
  }
});
