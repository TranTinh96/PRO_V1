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
import ChartView from "../Library/ChartView"
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
              <View style={styles.containerScreen}>
                <View>
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
                {/*  KWH -F */}
              <View style={styles.containerScreen}>
                <View style={styles.chartViewContainer}>
                  <View style={styles.chartView}>
                    <ChartView title="ENEGRY" num={125.5} color="#2B28A9" unit="KWh" />
                  </View>
                  <View style={styles.chartView}>
                    <ChartView title="FREQUENCY" num={50} unit="Hz" color="#50c594" />
                  </View>
                   
                   
                </View>
              </View>
            </View>
            {/*  KW -KVAr - KVA - PE */}
            <View style={styles.containerScreenTow}>
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
                <View style={styles.screenChart}>
                
                </View>
              </View>
            </View>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
