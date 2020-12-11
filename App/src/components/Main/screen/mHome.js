import React, {useState, useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Header from '../Library/mHeaderHome';
import styles from '../../../assets/dashboardCss';
import LineChart from '../Library/lineChart';
import Card from '../Library/card';
import FreEne from '../Library/FreEne';
import Statistic from '../Library/infoStatistics';
import Swiper from 'react-native-swiper';

const {width, height} = Dimensions.get('screen');

function Home() {
  const [valueOne, setValueOne] = useState();

  //RETURN
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1F9EFF" barStyle="light-content" />
      <Header name="MY HOME" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animatable.View style={[styles.main]} animation="fadeInLeft">
          <View>
            <View style={styles.formContainer}>
              <View style={styles.containerScreen}>
                <View style={styles.containerHeader}>
                  <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={require('../../../assets/image/vonke/i.png')}
                    style={styles.logoheader}
                    resizeMode="stretch"
                  />
                  <Text style={styles.textHeader}>ELECTRIC</Text>
                </View>
                <View style={styles.screenChart}>
                  <Swiper
                    style={styles.wrapper}
                    showsButtons={false}
                    autoplay={true}
                    autoplayTimeout={10}
                    width={width - 30}
                    height={250}
                    index={0}
                    dotStyle={{
                      backgroundColor: '#B3FAEB',
                      padding: 1,
                      marginTop: 20,
                      borderRadius: 10,
                    }}
                    activeDotStyle={{
                      backgroundColor: '#FFF',
                      marginTop: 20,
                      borderWidth: 2,
                      borderColor: '#0074FE',
                      padding: 3,
                      borderRadius: 10,
                    }}>
                    <View>
                      <LineChart
                        data={[
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                        ]}
                      />
                    </View>
                    <View>
                      <LineChart
                        data={[
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                        ]}
                      />
                    </View>
                    <View>
                      <LineChart
                        data={[
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                        ]}
                      />
                    </View>
                    <View>
                      <LineChart
                        data={[
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                        ]}
                      />
                    </View>
                  </Swiper>
                </View>
              </View>
              <View style={styles.containerScreen}>
                <View style={styles.containerHeader}>
                  <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={require('../../../assets/image/vonke/v23.png')}
                    style={styles.logoheader}
                    resizeMode="stretch"
                  />
                  <Text style={styles.textHeader}>VOLTAGE</Text>
                </View>
                <View style={[styles.screenBetween, styles.screenTop]}>
                  <View style={styles.box1}>
                    <Card
                      title="LINE - NEUTRAL"
                      name="V"
                      name1="V1"
                      name2="V2"
                      name3="V3"
                      value={20}
                      value1={20}
                      value2={20}
                      value3={20}
                      unit="V"
                    />
                  </View>
                  <View style={styles.box2}>
                    <Card
                      title="LINE - LINE"
                      name="V"
                      name1="V12"
                      name2="V23"
                      name3="V13"
                      value={20}
                      value1={20}
                      value2={20}
                      value3={20}
                      unit="V"
                    />
                  </View>
                </View>
              </View>
            </View>
            {/*  KW -KVAr - KVA - PE */}
            <View style={styles.containerScreenTow}>
              <View style={[styles.containerHeaderTwo, styles.containerHeaderTop]}>
                <Animatable.Image
                  animation="bounceIn"
                  duraton="1500"
                  source={require('../../../assets/image/vonke/statistics.png')}
                  style={styles.logoheader}
                  resizeMode="stretch"
                />
                <Text style={styles.textHeader}>STATISTICS</Text>
              </View>
              <ScrollView
                style={{marginTop: 10 ,marginLeft:5}}
                showsHorizontalScrollIndicator={false}
                horizontal>
                <Statistic 
                  title="ACTION POWER (KW)"
                  valueSUM ={125,5}
                  valuePHA1 ={220}
                  valuePHA2 ={230}
                  valuePHA3 ={120}
                  bg="action"
                />
                <Statistic 
                  title="REACTION POWER (KVA)"
                  valueSUM ={125,5}
                  valuePHA1 ={220}
                  valuePHA2 ={230}
                  valuePHA3 ={120}
                  bg="action"
                />
                <Statistic 
                  title="APPARENT POWER (KVAr)"
                  valueSUM ={125,5}
                  valuePHA1 ={220}
                  valuePHA2 ={230}
                  valuePHA3 ={120}
                  bg="action"
                />
                <Statistic 
                  title="POWER FACTOR"
                  valueSUM ={125,5}
                  valuePHA1 ={220}
                  valuePHA2 ={230}
                  valuePHA3 ={120}
                  bg="action"
                />
              </ScrollView>
            </View>
            {/* KWH - F*/}
            <View style={styles.formContainer}>
              <View style={styles.containerScreen}>
                <View style={styles.containerHeader}>
                  <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={require('../../../assets/image/vonke/i.png')}
                    style={styles.logoheader}
                    resizeMode="stretch"
                  />
                  <Text style={styles.textHeader}>FREQUENCY & ENERGY</Text>
                </View>
                <View style={styles.screenChart}>
                
                </View>
              </View>
            </View>
          </View>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
