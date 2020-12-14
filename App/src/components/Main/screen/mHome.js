import React, {useState, useEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import { View,ScrollView,SafeAreaView,StatusBar,} from 'react-native';
import Header from '../Library/mHeaderHome';
import styles from '../../../assets/dashboardCss';
import LineChart from '../Library/lineChart';
import Card from '../Library/card';
import ChartView from "../Library/ChartView"
import Statistic from '../Library/infoStatistics';
import Swiper from 'react-native-swiper';


function Home() {

  //RETURN
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1F9EFF" barStyle="light-content" />
      <Header name="MY HOME" isNotification ="true" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animatable.View style={[styles.main]} animation="fadeInLeft">
            <View style={styles.formContainer}>
              <View style={styles.containerScreen}>
                <View style={styles.screenChart}>
                  <Swiper
                    style={styles.wrapper}
                    showsButtons={false}
                    autoplay={true}
                    autoplayTimeout={10}
                    height={290}
                    index={0}
                    dotStyle={{
                      backgroundColor: '#fafafa',
                      padding: 1,
                      marginTop: 10,
                      borderRadius: 10,
                    }}
                    activeDotStyle={{
                      backgroundColor: '#FFF',
                      marginTop: 10,
                      borderWidth: 2,
                      borderColor: '#0074FE',
                      padding: 3,
                      borderRadius: 10,
                    }}>
                    <View>
                      <LineChart
                        name ="I"
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
                        name ="I1"
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
                        name ="I2"
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
                        name ="I3"
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
               {/*  KW -KVAr - KVA - PE */}
               <View style={styles.containerScreen}>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal>
                  <Statistic 
                    title="ACTION POWER"
                    unit="( KW )"
                    nameSummary="SUMMARY"
                    namePhase1="PHASE 1"
                    namePhase2="PHASE 2"
                    namePhase3="PHASE 3"
                    valueSummary={230}
                    valuePhase1={230}
                    valuePhase2={230}
                    valuePhase3={230}
                    bg="action"
                  />
                  <Statistic 
                    title="REACTION POWER"
                    unit="( KVA )"
                    nameSummary="SUMMARY"
                    namePhase1="PHASE 1"
                    namePhase2="PHASE 2"
                    namePhase3="PHASE 3"
                    valueSummary={230}
                    valuePhase1={230}
                    valuePhase2={230}
                    valuePhase3={230}
                    bg="action"
                  />
                  <Statistic 
                    title="APPARENT POWER"
                    unit="( KVAr )"
                    nameSummary="SUMMARY"
                    namePhase1="PHASE 1"
                    namePhase2="PHASE 2"
                    namePhase3="PHASE 3"
                    valueSummary={230}
                    valuePhase1={230}
                    valuePhase2={230}
                    valuePhase3={230}
                    bg="action"
                  />
                  <Statistic 
                    title="POWER FACTOR"
                    nameSummary="SUMMARY"
                    namePhase1="PHASE 1"
                    namePhase2="PHASE 2"
                    namePhase3="PHASE 3"
                    valueSummary={230}
                    valuePhase1={230}
                    valuePhase2={230}
                    valuePhase3={230}
                  />
                </ScrollView>
              </View>
                 {/*  KWH -F */}
                 <View style={styles.containerScreen}>
                <View style={styles.chartViewContainer}>
                  <View style={styles.chartView}>
                    <ChartView title="ENEGRY" num={125.5} color="#1F9EFF" unit="KWh" />
                  </View>
                  <View style={styles.chartView}>
                    <ChartView title="FREQUENCY" num={50} unit="Hz" color="#50c594" />
                  </View>
                </View>
              </View>
              <View style={styles.containerScreen}>
                <View>
                    <Card
                      title="LINE - NEUTRAL"
                      name="SUMMARY"
                      name1="PHASE 1"
                      name2="PHASE 2"
                      name3="PHASE 3"
                      value={220}
                      value1={220}
                      value2={220}
                      value3={220}
                      unit="V"
                    />
                    <Card
                      title="LINE - LINE"
                      name="SUMMARY"
                      name1="PHASE 1"
                      name2="PHASE 2"
                      name3="PHASE 3"
                      value={230}
                      value1={230}
                      value2={230}
                      value3={230}
                      unit="V"
                    />
                </View>
              </View>
             
              
            </View>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
