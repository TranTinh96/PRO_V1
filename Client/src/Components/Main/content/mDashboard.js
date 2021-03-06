import React, { useState ,useEffect,useLayoutEffect } from 'react'
import FeatherIcon from 'feather-icons-react';
import { Link ,useHistory } from "react-router-dom";
import mqtt from "mqtt";
import axios from 'axios'
import {useSelector ,useDispatch } from 'react-redux';
import ClipLoader from "react-spinners/ScaleLoader";
//Chart
import ChartLine from "../library/charLine/chartLine"
import ChartElectric from "../library/chartelEctric"
import ChartFreEne from "../library/chartFreEne"
import ChartControl from "../library/chartControl"
import CardData from "../library/cardData"

//Image
import v1 from "../../../assets/Image/vonke/v1.png"
import v12 from "../../../assets/Image/vonke/v12.png"
import v13 from "../../../assets/Image/vonke/v13.png"
import v23 from "../../../assets/Image/vonke/v23.png"
import i from "../../../assets/Image/vonke/i.png"
import control from "../../../assets/Image/vonke/remote-control.png"
import TableSelecProjectAdmin from "../library/admin/tableSelecProjectAdmin"

 //Function
import {getKeyValue ,getKeyValueString ,getKeyValue2Int ,getKeyValuePhase3}  from "../../services/fucServices"
import configMQTT from "../../MQTT/config.MQTT"


function currentDateInput() {
    var date = new Date().toLocaleDateString().split("/");
    var timeDay =checkLength(date[1]) + " - " + checkLength(date[0]) + " - " + date[2]
    return timeDay;
}

function checkLength(value){
  return  value.length <= 1 ?  "0"+ value : value
}


function MDashbard() {
    const history = useHistory()

    const dispatch =useDispatch()
    //Calendar
    const [timeInput, setTimeInput] = useState(currentDateInput())

      
    const _idProject = localStorage.getItem("AuthID");

    const [clientMQTT, setClientMQTT] = useState(null);
    const [connectStatus, setConnectStatus] = useState("Connect");
    const [payload, setPayload] = useState({});
    const [topic ,setTopic] =useState("")

    //LOADING
    const isLoaddingDashboard = useSelector((state) => state.isLoaddingDashboard);

    //VOLTAGE LINE-NEUTRAL
    const VLNArray = useSelector((state) => state.VLNArray);
    const V1NArray = useSelector((state) => state.V1NArray);
    const V2NArray = useSelector((state) => state.V2NArray);
    const V3NArray = useSelector((state) => state.V3NArray);

    //VOLTAGE LINE-NEUTRAL
    const [VLN , setVLN] =useState(0);
    const [V1N , setV1N] =useState(0);
    const [V2N , setV2N] =useState(0);
    const [V3N , setV3N] =useState(0);


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
    const [F , setF] =useState(0);
    const [KWH , setKWH] =useState(0);
    const FArray = useSelector((state) => state.FArray);
    const KWHArray = useSelector((state) => state.EArray);

    //Connect MQTT
    useEffect(() => {
    
        if (_idProject != "ADMIN" || _idProject != null) {
          setClientMQTT(mqtt.connect(configMQTT.host, configMQTT.options));
          axios.post("/api/cabin/get/init", {
              _idProject: _idProject,
            })
            .then(function (res) {
              let resData = res.data;
              console.log(resData)
              //VOLTAGE LINE-NEUTRAL
              dispatch({
                type: "ADD_DATA_VLNArray",
                VLNArray: resData.dataSummary.VLN,
              });
              dispatch({
                type: "ADD_DATA_V1NArray",
                V1NArray: resData.dataPhaseOne.V1N
              });
              dispatch({
                type: "ADD_DATA_V2NArray",
                V2NArray: resData.dataPhaseTwo.V2N
              });
              dispatch({
                type: "ADD_DATA_V3NArray",
                V3NArray: resData.dataPhaseThree.V3N
              });
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
              setKWH(resData.dataSummary.KWH);
              dispatch({
                type: "ADD_DATA_FArray",
                FArray:resData.dataSummary.F
              });
              dispatch({
                type: "ADD_DATA_EArray",
                EArray: resData.dataSummary.KWH,
              });
            })
            .catch(function (error) {
              console.log(error);
            });
        }
    

        dispatch({ type: "LOADDING_TABLE" });
        dispatch({ type: "LOADDING_ALARM" });
       

    }, []);


     //Client MQTT
     useLayoutEffect(() => {
     if (clientMQTT) {
            clientMQTT.on("connect", () => {
                console.log("MQTT Connecting " + _idProject)
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
                
            });
            clientMQTT.on("reconnect", () => {
                setConnectStatus("Reconnecting");
            });

            clientMQTT.on("disconnect", () => {
                setConnectStatus("Disconnect");
            });

            clientMQTT.on("message", (topic, message) => {
                setTopic(topic)
                const payload = message.toString();
                setPayload(payload);
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
  useLayoutEffect(() => {
    if(topic){
        var payloadSplit = payload.toString().split('&')
        var payloadStr = payload.toString();
        //VOLTAGE LINE-NEUTRAL
        dispatch({type:"ADD_DATA_VLNArray",VLNArray:getKeyValue2Int(payloadStr,"VLN")})
        dispatch({type:"ADD_DATA_V1NArray",V1NArray:getKeyValue2Int(payloadStr,"V1N")})
        dispatch({type:"ADD_DATA_V2NArray",V2NArray:getKeyValue2Int(payloadStr,"V2N")})
        dispatch({type:"ADD_DATA_V3NArray",V3NArray:getKeyValue2Int(payloadStr,"V3N")})
        setVLN(getKeyValue(payloadStr,"VLN"))
        setV1N(getKeyValue(payloadStr,"V1N"))
        setV2N(getKeyValue(payloadStr,"V2N"))
        setV3N(getKeyValue(payloadStr,"V3N"))
        //debugger
        console.log(getKeyValuePhase3(payloadStr,"V3N"))

        //CURRENT
  
        dispatch({
          type:"ADD_DATA_I",
          I:getKeyValue(payloadStr,"I"),
          I1:getKeyValue(payloadStr,"I1"),
          I2:getKeyValue(payloadStr,"I2"),
          I3:getKeyValue(payloadStr,"I3"),
         })


        //KW
        setKW(getKeyValue(payloadStr,"KW"))
        setKW1(getKeyValue(payloadStr,"KW1"))
        setKW2(getKeyValue(payloadStr,"KW2"))
        setKW3(getKeyValue(payloadStr,"KW3"))

        //KVA
        setKVA(getKeyValue(payloadStr,"KVA"))
        setKVA1(getKeyValue(payloadStr,"KVA1"))
        setKVA2(getKeyValue(payloadStr,"KVA2"))
        setKVA3(getKeyValue(payloadStr,"KVA3"))

        //KVAR
        setKVAR(getKeyValue(payloadStr,"KVAR"))
        setKVAR1(getKeyValue(payloadStr,"KVAR1"))
        setKVAR2(getKeyValue(payloadStr,"KVAR2"))
        setKVAR3(getKeyValue(payloadStr,"KVAR3"))

        //PE
        setPF(getKeyValue(payloadStr,"PF"))
        setPF1(getKeyValue(payloadStr,"PF1"))
        setPF2(getKeyValue(payloadStr,"PF2"))
        setPF3(getKeyValue(payloadStr,"PF3"))

        //F & KW
        setF(getKeyValue(payloadStr,"FREQUENCY"))
        setKWH(getKeyValue(payloadStr,"KWH"))
        dispatch({type:"ADD_DATA_FArray",FArray:getKeyValue2Int(payloadStr,"FREQUENCY")})
        dispatch({type:"ADD_DATA_EArray",EArray:getKeyValue2Int(payloadStr,"KWH")})

        //RL status
        dispatch({
          type:"ADD_RL_SELEC",
          RLAstatus:getKeyValueString(payloadSplit,"RLAstatus","off"),
          RLAmode:getKeyValueString(payloadSplit,"RLAmode",'manual'),
          RLBstatus:getKeyValueString(payloadSplit,"RLBstatus" ,'off'),
          RLBmode:getKeyValueString(payloadSplit,"RLBmode",'manual'),
         })
        }

    }, [payload])

    if (isLoaddingDashboard) {
        return (
          <React.Fragment>
            <div className="container-spinners">
              <div className="spinners">
                <ClipLoader size={60} color="#727cf5" loading={isLoaddingDashboard} />
              </div>
            </div>
          </React.Fragment>
        );
      }
    return (
        <>
        <div className="pcoded-content">
            <div className="pcoded-inner-content">
                <div className="main-body">
                    <div className="page-wrapper ">
                        <div className="page-body shadow-none">
                            {/* ------- Start-Dashboard -------  */}
                            <div className="page-start-dashboard"  >
                                <div className="row">
                                    <div className="col-12">
                                        <div className="page-title-box">
                                            <div className="page-title-right">
                                                <form className="form-inline">
                                                    <div className="form-group form-position">
                                                        <div className="input-group">
                                                            <input type="text" className="form-control form-control-light shadow-none border-0 input-shadow" value={timeInput} />
                                                            <div className="input-group-append">
                                                                <span className="input-group-text bg-primary border-primary text-white btn-shadow-2">
                                                                    <FeatherIcon icon="calendar" color="#ffffff" size={12} />

                                                                </span>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Link to="/dashboard">
                                                        <div className="bg-primary border-primary text-white btn-shadow ">
                                                            <FeatherIcon icon="refresh-ccw" color="#ffffff" size={12} />
                                                        </div>
                                                    </Link>

                                                </form>
                                            </div>

                                            <div className="page-title">
                                                <div className="page-icon">
                                                    <FeatherIcon icon="home" color="#727cf5" size={19} />
                                                </div>
                                                <div className="page-title-text">Dashboard</div>
                                            </div>

                                        </div>
                                    </div>                                    
                                </div>
                                {/* --------------------- Header Dashboard -------------------------*/}
                                <div className ="m-t-20 showProject-container">
                                    <TableSelecProjectAdmin/>
                                </div>
                                <div className="row m-t-20">
                                         <div className="col-md-6 col-xl-3">
                                            <div  className="card">
                                                <div className="card-body">
                                                    <div className="d-flex  align-items-baseline">
                                                        <img  src={v1} alt="Joseph" className="img-vonke" />
                                                        <h5 className="card-title card-title-header mb-0">VOLTAGE LINE-NEUTRAL ( VLN )</h5>
                                                    </div>
                                                    <div className="row card-content-line align-items-center">
                                                        <div className="col-6 card-data">
                                                            <h1>{VLN}</h1>
                                                            <h4> V </h4>
                                                        </div>
                                                        <div className="col-6">
                                                            <ChartLine name='VLN' data={VLNArray} />                                              
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-md-6 col-xl-3">
                                            <div  className="card">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-baseline">
                                                         <div className="d-flex  align-items-baseline">
                                                            <img  src={v12} alt="Joseph" className="img-vonke" />
                                                             <h5 className="card-title card-title-header mb-0">VOLTAGE LINE-NEUTRAL ( V1N )</h5>
                                                         </div>
                                                    </div>
                                                    <div className="row card-content-line align-items-center">
                                                        <div className="col-6 card-data">
                                                            <h1>{V1N}</h1>
                                                            <h4> V </h4>
                                                        </div>
                                                        <div className="col-6">
                                                            <ChartLine name='V1N' data={V1NArray} />                                            
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-md-6 col-xl-3">
                                            <div  className="card">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-baseline">
                                                         <div className="d-flex  align-items-baseline">
                                                            <img  src={v13} alt="Joseph" className="img-vonke" />
                                                             <h5 className="card-title card-title-header mb-0">VOLTAGE LINE-NEUTRAL ( V2N )</h5>
                                                         </div>
                                                    </div>
                                                    <div className="row card-content-line align-items-center">
                                                        <div className="col-6 card-data">
                                                            <h1>{V2N}</h1>
                                                            <h4> V </h4>
                                                        </div>
                                                        <div className="col-6">
                                                            <ChartLine name='V2N' data={V2NArray} />                                           
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-md-6 col-xl-3">
                                            <div  className="card">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-baseline">
                                                         <div className="d-flex justify-content-between align-items-baseline">
                                                            <div className="d-flex  align-items-baseline">
                                                                 <img  src={v23} alt="Joseph" className="img-vonke" />
                                                                <h5 className="card-title card-title-header mb-0">VOLTAGE LINE-NEUTRAL ( V3N )</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row card-content-line align-items-center">
                                                        <div className="col-6 card-data">
                                                            <h1>{V3N}</h1>
                                                            <h4> V </h4>
                                                        </div>
                                                        <div className="col-6">
                                                            <ChartLine name='VL3' data={V3NArray}/>                                        
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                            </div>
                            {/*----------- End header dashboard -------------*/}
                            <div className='page-chart-dashboard'>
                                <div className="row">
                                    <div className="col-xl-7 col-lg-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex  align-items-baseline">
                                                    <img  src={i} alt="Joseph" className="img-vonke" />
                                                    <h5 className="card-title card-title-header mb-0">CURRENT</h5>
                                                </div>
                                                <div className="card-content-line-chart align-items-center">
                                                    <ChartElectric />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-5 col-lg-12">    
                                        <div className="col-12 col-control-panel">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="d-flex  align-items-baseline">
                                                        <img  src={control} alt="Joseph" className="img-vonke" />
                                                        <h5 className="card-title card-title-header mb-0">CONTROL</h5>
                                                    </div>
                                                    <div className="card-content-line align-items-center">
                                                         <ChartControl clientMQTT={clientMQTT}  _idProject={_idProject} />        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-control-panel">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="d-flex  align-items-baseline">
                                                        <img  src={control} alt="Joseph" className="img-vonke" />
                                                        <h5 className="card-title card-title-header mb-0">FREQUENCY & ENERGY</h5>
                                                    </div>
                                                    <div className="card-content-line align-items-center">
                                                         <ChartFreEne FArray ={FArray} F={F} KWHArray={KWHArray} KWH={KWH}/>       
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                              {/*----------- KW - KW/H -KVAR - PE-------------*/}
                          
                              <div className='page-chart-dashboard'>
                                <div className="row">
                                    <div className="col-xl-3 col-md-12">    
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex  align-items-baseline">
                                                    <img  src={control} alt="Joseph" className="img-vonke" />
                                                    <h5 className="card-title card-title-header mb-0">ACTIVE  POWER ( KW )</h5>
                                                </div>
                                                <div className="card-content-line align-items-center">
                                                    <CardData summary={KW} phase1={KW1} phase2={KW2} phase3={KW3}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-12">    
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex  align-items-baseline">
                                                    <img  src={control} alt="Joseph" className="img-vonke" />
                                                    <h5 className="card-title card-title-header mb-0">REACTIVE  POWER ( KVA )</h5>
                                                </div>
                                                <div className="card-content-line align-items-center">
                                                    <CardData summary={KVA} phase1={KVA1} phase2={KVA2} phase3={KVA3}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-12">    
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex  align-items-baseline">
                                                    <img  src={control} alt="Joseph" className="img-vonke" />
                                                    <h5 className="card-title card-title-header mb-0">APPARENT  POWER ( KVAr )</h5>
                                                </div>
                                                <div className="card-content-line align-items-center">
                                                    <CardData summary={KVAR} phase1={KVAR1} phase2={KVAR2} phase3={KVAR3}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-12">    
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex  align-items-baseline">
                                                    <img  src={control} alt="Joseph" className="img-vonke" />
                                                    <h5 className="card-title card-title-header mb-0">POWER  FACTOR</h5>
                                                </div>
                                                <div className="card-content-line align-items-center">
                                                    <CardData summary={PF} phase1={PF1} phase2={PF2} phase3={PF3}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default MDashbard
