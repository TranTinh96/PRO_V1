import React, {useState, useEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import SwitchSelector from 'react-native-switch-selector';
import LinearGradient from 'react-native-linear-gradient';
import TimePickerRelayA from '../Library/timePickerRelayA';
import TimePickerRelayB from '../Library/timePickerRelayB';
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import Header from '../Library/mHeaderHome';
import styles from '../../../assets/dashboardCss';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const options = [
  {label: 'A', value: true},
  {label: 'M', value: false},
];

function Home() {
  //Time

  var [isModeA, setIsModeA] = useState(true);
  var [isModeB, setIsModeB] = useState(false);
  var [isOnOffManualRelayA, setIsOnOffManualRelayA] = useState(false);
  var [isOnOffManualRelayB, setIsOnOffManualRelayB] = useState(false);
  var [isOnRelayA, setIsOnRelayA] = useState(false);
  var [isOnRelayB, setIsOnRelayB] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1F9EFF" barStyle="light-content" />
      <Header name="CONTROL" />
      <View style={styles.containerControl}>
        <Animatable.View style={styles.mainControl} animation="fadeInLeft">
          <View style={styles.dashboardContainer}>
            <View style={styles.dashboardControl}>
              <Text style={styles.textHeader}>RELAY A</Text>
              {isOnRelayA && (
                <View style={styles.bulbContainerOn}>
                  <Icon name="lightbulb-on-outline" size={25} color="#f94144" />
                </View>
              )}
              {!isOnRelayA && (
                <View style={styles.bulbContainer}>
                  <Icon name="lightbulb-on-outline" size={25} color="#f94144" />
                </View>
              )}
            </View>
            <View style={styles.border}></View>
            <View style={[styles.controlContainer]}>
              <View style={styles.screenRight}>
                <SwitchSelector
                  options={options}
                  initial={0}
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
                  onPress={(value) => setIsModeA(value)}
                />
              </View>

              <View style={styles.screenLeft}>
                {isModeA && <TimePickerRelayA />}
                {!isModeA && (
                  <View style={styles.containerManual}>
                    <TouchableOpacity
                      onPress={() => {
                        setIsOnOffManualRelayA(!isOnOffManualRelayA);
                      }}>
                      <View style={styles.viewPower}>
                        {isOnOffManualRelayA && (
                          <Animatable.Image
                            animation="bounceIn"
                            duraton="1500"
                            source={require('../../../assets/image/vonke/power-On.png')}
                            style={styles.powerImage}
                            resizeMode="stretch"
                          />
                        )}
                        {!isOnOffManualRelayA && (
                          <Animatable.Image
                            animation="bounceIn"
                            duraton="1500"
                            source={require('../../../assets/image/vonke/poweeOff.png')}
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
              {isOnRelayB && (
                <View style={styles.bulbContainerOn}>
                  <Icon name="lightbulb-on-outline" size={25} color="#f94144" />
                </View>
              )}
              {!isOnRelayB && (
                <View style={styles.bulbContainer}>
                  <Icon name="lightbulb-on-outline" size={25} color="#f94144" />
                </View>
              )}
            </View>
            <View style={styles.border}></View>
            <View style={[styles.controlContainerRelayB]}>
              <View style={styles.screenRight}>
                <SwitchSelector
                  options={options}
                  initial={1}
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
                  onPress={(value) => setIsModeB(value)}
                />
              </View>

              <View style={styles.screenLeft}>
                {isModeB && <TimePickerRelayB />}
                {!isModeB && (
                  <View style={styles.containerManual}>
                    <TouchableOpacity
                      onPress={() => {
                        setIsOnOffManualRelayB(!isOnOffManualRelayB);
                      }}>
                      <View style={styles.viewPower}>
                        {isOnOffManualRelayB && (
                          <Animatable.Image
                            animation="bounceIn"
                            duraton="1500"
                            source={require('../../../assets/image/vonke/power-On.png')}
                            style={styles.powerImage}
                            resizeMode="stretch"
                          />
                        )}
                        {!isOnOffManualRelayB && (
                          <Animatable.Image
                            animation="bounceIn"
                            duraton="1500"
                            source={require('../../../assets/image/vonke/poweeOff.png')}
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

export default Home;
