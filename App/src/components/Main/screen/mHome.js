import React, {useState, useEffect ,useLayoutEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import { View,ScrollView,SafeAreaView,StatusBar,} from 'react-native';
import {useSelector ,useDispatch} from 'react-redux';
import Header from '../Library/mHeaderHome';
import styles from '../../../assets/dashboardCss';
import LineChart from '../Library/lineChart';
import Card from '../Library/card';
import ChartView from "../Library/ChartView"
import Statistic from '../Library/infoStatistics';
import Swiper from 'react-native-swiper';
import {getKeyValue} from "../../services/fucService"


function Home(props) {
  const payload = props.payload ;
  const topic = props.topic
  //Redux
   const dispatch =useDispatch();

   var I = useSelector((state) => state.I);
   var I1 = useSelector((state) => state.I1);
   var I2 = useSelector((state) => state.I2);
   var I3 = useSelector((state) => state.I3);

  //VOLTAGE LINE-NEUTRAL
  const [VLN , setVLN] =useState(0);
  const [V1N , setV1N] =useState(0);
  const [V2N , setV2N] =useState(0);
  const [V3N , setV3N] =useState(0);

  //VOLTAGE LINE-LINE
  const [VLL , setVLL] =useState(0);
  const [V12 , setV12] =useState(0);
  const [V23 , setV23] =useState(0);
  const [V31 , setV31] =useState(0);



  //KW
  const [KW , setKW] =useState(0);
  const [KW1 , setKW1] =useState(0);
  const [KW2 , setKW2] =useState(0);
  const [KW3 , setKW3] =useState(0);

  //KVA
  const [KVA , setKVA] =useState(0);
  const [KVA1 , setKVA1] =useState(0);
  const [KVA2 , setKVA2] =useState(0);
  const [KVA3 , setKVA3] =useState(0);

 //KVAR
  const [KVAR , setKVAR] =useState(0);
  const [KVAR1 , setKVAR1] =useState(0);
  const [KVAR2 , setKVAR2] =useState(0);
  const [KVAR3 , setKVAR3] =useState(0);

  //PE
  const [PE , setPE] =useState(0);
  const [PE1 , setPE1] =useState(0);
  const [PE2 , setPE2] =useState(0);
  const [PE3 , setPE3] =useState(0);

  //F & KW
  const [F , setF] =useState(0);
  const [KWH , setKWH] =useState(0);

  
    //Payload
    useLayoutEffect(() => {
      if(topic){
          var payloadSplit = payload.toString().split('&')

          //VOLTAGE LINE-NEUTRAL
          setVLN(getKeyValue(payloadSplit,"VLN"))
          setV1N(getKeyValue(payloadSplit,"V1N"))
          setV2N(getKeyValue(payloadSplit,"V2N"))
          setV3N(getKeyValue(payloadSplit,"V3N"))

           //VOLTAGE LINE - LINE
          setVLL(getKeyValue(payloadSplit,"VLL"))
          setV12(getKeyValue(payloadSplit,"V12"))
          setV23(getKeyValue(payloadSplit,"V23"))
          setV31(getKeyValue(payloadSplit,"V31"))

          //KW
          setKW(getKeyValue(payloadSplit,"KW"))
          setKW1(getKeyValue(payloadSplit,"KW1"))
          setKW2(getKeyValue(payloadSplit,"KW2"))
          setKW3(getKeyValue(payloadSplit,"KW3"))

          //KVA
          setKVA(getKeyValue(payloadSplit,"KVA"))
          setKVA1(getKeyValue(payloadSplit,"KVA1"))
          setKVA2(getKeyValue(payloadSplit,"KVA2"))
          setKVA3(getKeyValue(payloadSplit,"KVA3"))

           //KVAR
          setKVAR(getKeyValue(payloadSplit,"KVAR"))
          setKVAR1(getKeyValue(payloadSplit,"KVAR1"))
          setKVAR2(getKeyValue(payloadSplit,"KVAR2"))
          setKVAR3(getKeyValue(payloadSplit,"KVAR3"))

          //PE
          setPE(getKeyValue(payloadSplit,"PE"))
          setPE1(getKeyValue(payloadSplit,"PE1"))
          setPE2(getKeyValue(payloadSplit,"PE2"))
          setPE3(getKeyValue(payloadSplit,"PE3"))

           //F & KW
          setF(getKeyValue(payloadSplit,"FREQUENCY"))
          setKWH(getKeyValue(payloadSplit,"KWH"))
          dispatch({type:"ADD_DATA_I",I:getKeyValue(payloadSplit,"I")})
          dispatch({type:"ADD_DATA_I1",I1:getKeyValue(payloadSplit,"I1")})
          dispatch({type:"ADD_DATA_I2",I2:getKeyValue(payloadSplit,"I2")})
          dispatch({type:"ADD_DATA_I3",I3:getKeyValue(payloadSplit,"I3")})
          
        
          
      }

  }, [payload])

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
                    autoplayTimeout={5}
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
                        name="I"
                        dataArray={I}
                      />
                    </View>
          
                    <View>
                      <LineChart
                        name ="I1"
                        dataArray={I1}
                      />
                    </View>
                    <View>
                      <LineChart
                        name ="I2"
                        dataArray={I2}
                      />
                    </View>
                    <View>
                      <LineChart
                        name ="I3"
                        dataArray={I3}
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
                    valueSummary={KW}
                    valuePhase1={KW1}
                    valuePhase2={KW2}
                    valuePhase3={KW3}
                    bg="action"
                  />
                  <Statistic 
                    title="REACTION POWER"
                    unit="( KVA )"
                    nameSummary="SUMMARY"
                    namePhase1="PHASE 1"
                    namePhase2="PHASE 2"
                    namePhase3="PHASE 3"
                    valueSummary={KVA}
                    valuePhase1={KVA1}
                    valuePhase2={KVA2}
                    valuePhase3={KVA3}
                    bg="action"
                  />
                  <Statistic 
                    title="APPARENT POWER"
                    unit="( KVAr )"
                    nameSummary="SUMMARY"
                    namePhase1="PHASE 1"
                    namePhase2="PHASE 2"
                    namePhase3="PHASE 3"
                    valueSummary={KVAR}
                    valuePhase1={KVAR1}
                    valuePhase2={KVAR2}
                    valuePhase3={KVAR3}
                    bg="action"
                  />
                  <Statistic 
                    title="POWER FACTOR"
                    nameSummary="SUMMARY"
                    namePhase1="PHASE 1"
                    namePhase2="PHASE 2"
                    namePhase3="PHASE 3"
                    valueSummary={PE}
                    valuePhase1={PE1}
                    valuePhase2={PE2}
                    valuePhase3={PE3}
                  />
                </ScrollView>
              </View>
                 {/*  KWH -F */}
                 <View style={styles.containerScreen}>
                <View style={styles.chartViewContainer}>
                  <View style={styles.chartView}>
                    <ChartView title="ENEGRY" num={KWH} color="#1F9EFF" unit="KWh" />
                  </View>
                  <View style={styles.chartView}>
                    <ChartView title="FREQUENCY" num={F} unit="Hz" color="#50c594" />
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
                      value={VLN}
                      value1={V1N}
                      value2={V2N}
                      value3={V3N}
                      unit="V"
                    />
                    <Card
                      title="LINE - LINE"
                      name="SUMMARY"
                      name1="PHASE 1"
                      name2="PHASE 2"
                      name3="PHASE 3"
                      value={VLL}
                      value1={V12}
                      value2={V23}
                      value3={V31}
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
