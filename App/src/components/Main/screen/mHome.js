import React, {useState, useEffect ,useLayoutEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import { View,ScrollView,SafeAreaView,StatusBar,} from 'react-native';
import {useSelector ,useDispatch} from 'react-redux';
import mqtt from "@taoqf/react-native-mqtt"
import axios from 'axios'
import Header from '../Library/mHeaderHome';
import styles from '../../../assets/dashboardCss';
import LineChart from '../Library/lineChart';
import Card from '../Library/card';
import ChartView from "../Library/ChartView"
import Statistic from '../Library/infoStatistics';
import Swiper from 'react-native-swiper';
import {getKeyValue} from "../../services/fucService";
import configMQTT from "../../MQTT/config.MQTT";

function Home() {

  //Redux
  const dispatch =useDispatch();

  //Redux
  var _idProject = useSelector((state) => state.projectID);
  //MQTT
  const[clientMQTT ,setClientMQTT] = useState(null)
  const [connectStatus, setConnectStatus] = useState("Connect");
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
  const [PE , setPE] =useState(1);
  const [PE1 , setPE1] =useState(1);
  const [PE2 , setPE2] =useState(1);
  const [PE3 , setPE3] =useState(1);

  //F & KW
  const [F , setF] =useState(50);
  const [KWH , setKWH] =useState(0);

  useEffect(() => {
    if ( _idProject !== null) {
      console.log("Connect MQTT ")
       setClientMQTT(mqtt.connect(configMQTT.host,configMQTT.options));
      axios.post("/api/cabin/get/init", {
          _idProject: _idProject,
        })
        .then(function (res) {
          let resData = res.data;
          console.log(resData)
          //VOLTAGE LINE-NEUTRA
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

//useEffect MQTT
useEffect(() => {
    if (clientMQTT) {
      clientMQTT.on("connect", () => {
        console.log("Connect MQTT : " +_idProject)
        setConnectStatus("Connected");
        clientMQTT.subscribe(_idProject, (error) => {
            if (error) {
              console.log("Subscribe to topics error", error);
            }
          });
       
       
      });
      clientMQTT.on("error", (err) => {
        setConnectStatus("Connection error");
        console.error("Connection error: ", err);
        clientMQTT.end();
      });
      clientMQTT.on("reconnect", () => {
        setConnectStatus("Reconnecting");
      });

      clientMQTT.on("disconnect", () => {
        console.log("DisConnect");
        setConnectStatus("Disconnect");
      });

      clientMQTT.on("message", (topic, message) => {
        const payload = message.toString() ;
        
        setPayload(payload );
        setTopic(topic)
      });
    }
    return () => {
      if(clientMQTT){
          clientMQTT.unsubscribe(_idProject, (err) => {
              if (! err) {
                  console.log("Unsubscribe to topics");
                  clientMQTT.end(function(){
                      setConnectStatus('Connect');
                    });
              
              }
          });
      }
  };
  }, [clientMQTT]);
  
  
    //Payload
    useEffect(() => {
      if(topic){
          //VOLTAGE LINE-NEUTRAL
          setVLN(getKeyValue(payload.toString(),"VLN"))
          setV1N(getKeyValue(payload.toString(),"V1N"))
          setV2N(getKeyValue(payload.toString(),"V2N"))
          setV3N(getKeyValue(payload.toString(),"V3N"))

           //VOLTAGE LINE - LINE
          setVLL(getKeyValue(payload.toString(),"VLL"))
          setV12(getKeyValue(payload.toString(),"V12"))
          setV23(getKeyValue(payload.toString(),"V23"))
          setV31(getKeyValue(payload.toString(),"V31"))

          //KW
          setKW(getKeyValue(payload.toString(),"KW"))
          setKW1(getKeyValue(payload.toString(),"KW1"))
          setKW2(getKeyValue(payload.toString(),"KW2"))
          setKW3(getKeyValue(payload.toString(),"KW3"))

          //KVA
          setKVA(getKeyValue(payload.toString(),"KVA"))
          setKVA1(getKeyValue(payload.toString(),"KVA1"))
          setKVA2(getKeyValue(payload.toString(),"KVA2"))
          setKVA3(getKeyValue(payload.toString(),"KVA3"))

           //KVAR
          setKVAR(getKeyValue(payload.toString(),"KVAR"))
          setKVAR1(getKeyValue(payload.toString(),"KVAR1"))
          setKVAR2(getKeyValue(payload.toString(),"KVAR2"))
          setKVAR3(getKeyValue(payload.toString(),"KVAR3"))

          //PE
          setPE(getKeyValue(payload.toString(),"PE"))
          setPE1(getKeyValue(payload.toString(),"PE1"))
          setPE2(getKeyValue(payload.toString(),"PE2"))
          setPE3(getKeyValue(payload.toString(),"PE3"))

           //F & KW
          setF(getKeyValue(payload.toString(),"FREQUENCY"))
          setKWH(getKeyValue(payload.toString(),"KWH"))
          dispatch({type:"ADD_DATA_I",I:getKeyValue(payload.toString(),"I")})
          dispatch({type:"ADD_DATA_I1",I1:getKeyValue(payload.toString(),"I1")})
          dispatch({type:"ADD_DATA_I2",I2:getKeyValue(payload.toString(),"I2")})
          dispatch({type:"ADD_DATA_I3",I3:getKeyValue(payload.toString(),"I3")})
          
        
          
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
