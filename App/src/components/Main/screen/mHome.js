import React, {useState, useEffect ,useLayoutEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import { View,ScrollView,SafeAreaView,StatusBar,} from 'react-native';
import {useSelector ,useDispatch} from 'react-redux';
import axios from 'axios'
import Header from '../Library/mHeaderHome';
import styles from '../../../assets/dashboardCss';
import LineChart from '../Library/lineChart';
import Card from '../Library/card';
import ChartView from "../Library/ChartView"
import Statistic from '../Library/infoStatistics';
import Swiper from 'react-native-swiper';
import socket from "../../socketIO/connect.SocketIO";
import {getKeyValue} from "../../services/fucService";

function Home() {

  //Redux
  const dispatch =useDispatch();

  //Redux
  var _idProject = useSelector((state) => state.projectID);
  const [payload, setPayload] = useState({});
  const [topic, setTopic] = useState("")

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
  const [PF , setPF] =useState(0);
  const [PF1 , setPF1] =useState(0);
  const [PF2 , setPF2] =useState(0);
  const [PF3 , setPF3] =useState(0);
  //F & KW
  const [F , setF] =useState(50);
  const [KWH , setKWH] =useState(0);

  useEffect(() => {
    if ( _idProject) {
      axios.post("/api/cabin/get/init", {
          _idProject: _idProject,
        })
        .then(function (res) {
          let resData = res.data;
          console.log(resData)
          setVLN(resData.dataSummary.VLN);
          setV1N( resData.dataPhaseOne.V1N);
          setV2N( resData.dataPhaseTwo.V2N);
          setV3N(resData.dataPhaseThree.V3N);
          //CURRENT
          dispatch({
            type: "ADD_DATA_I",
            I: resData.dataSummary.I,
            I1:resData.dataPhaseOne.I1,
            I2: resData.dataPhaseTwo.I2,
            I3: resData.dataPhaseThree.I3,
          });
          //KW
          setKW(resData.dataSummary.KW);
          setKW1(resData.dataPhaseOne.KW1);
          setKW2(resData.dataPhaseTwo.KW2);
          setKW3(resData.dataPhaseThree.KW3);
          //KVA
          setKVA(resData.dataSummary.KVA);
          setKVA1(resData.dataPhaseOne.KVA1);
          setKVA2(resData.dataPhaseTwo.KVA2);
          setKVA3(resData.dataPhaseThree.KVA3);
          //KVAR
          setKVAR(resData.dataSummary.KVRA);
          setKVAR1(resData.dataPhaseOne.KVAR1);
          setKVAR2(resData.dataPhaseTwo.KVAR2);
          setKVAR3(resData.dataPhaseThree.KVAR3);
          //PE
          setPF(resData.dataSummary.PF);
          setPF1(resData.dataPhaseOne.PF1);
          setPF2(resData.dataPhaseTwo.PF2);
          setPF3(resData.dataPhaseThree.PF3);
          //F & KW
          setF(resData.dataSummary.F);
          setKWH(resData.dataSummary.KWH)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
}, []);

useEffect(() => {
     socket.on(_idProject ,payload => {
        console.log(payload)
        //VOLTAGE LINE-NEUTRAL
        setVLN(getKeyValue(payload,"VLN"))
        setV1N(getKeyValue(payload,"V1N"))
        setV2N(getKeyValue(payload,"V2N"))
        setV3N(getKeyValue(payload,"V3N"))
        //CURRENT
  
        dispatch({
          type:"ADD_DATA_I",
          I:getKeyValue(payload,"I"),
          I1:getKeyValue(payload,"I1"),
          I2:getKeyValue(payload,"I2"),
          I3:getKeyValue(payload,"I3"),
         })


        //KW
        setKW(getKeyValue(payload,"KW"))
        setKW1(getKeyValue(payload,"KW1"))
        setKW2(getKeyValue(payload,"KW2"))
        setKW3(getKeyValue(payload,"KW3"))

        //KVA
        setKVA(getKeyValue(payload,"KVA"))
        setKVA1(getKeyValue(payload,"KVA1"))
        setKVA2(getKeyValue(payload,"KVA2"))
        setKVA3(getKeyValue(payload,"KVA3"))

        //KVAR
        setKVAR(getKeyValue(payload,"KVAR"))
        setKVAR1(getKeyValue(payload,"KVAR1"))
        setKVAR2(getKeyValue(payload,"KVAR2"))
        setKVAR3(getKeyValue(payload,"KVAR3"))

        //PE
        setPF(getKeyValue(payload,"PF"))
        setPF1(getKeyValue(payload,"PF1"))
        setPF2(getKeyValue(payload,"PF2"))
        setPF3(getKeyValue(payload,"PF3"))

        //F & KW
        setF(getKeyValue(payload,"FREQUENCY"))
        setKWH(getKeyValue(payload,"KWH"))
        
       })
}, [])


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
                    valueSummary={PF}
                    valuePhase1={PF1}
                    valuePhase2={PF2}
                    valuePhase3={PF3}
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
