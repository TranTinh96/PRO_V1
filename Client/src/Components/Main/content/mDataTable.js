import React, { useState, useEffect , useLayoutEffect } from "react";
import {useHistory } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { Tabs, Tab } from "react-bootstrap";
import axios from "axios"
import { Radio } from "antd";
import mqtt from "mqtt";
import ClipLoader from "react-spinners/ScaleLoader";
import { useDispatch, useSelector } from "react-redux";
import DataTableSummary from "../library/dataTable/dataTableSummary";
import DataTablePhase1 from "../library/dataTable/dataTablePhase1";
import DataTablePhase2 from "../library/dataTable/dataTablePhase2";
import DataTablePhase3 from "../library/dataTable/dataTablePhase3";

//Function
import {getKeyValue} from "../../services/fucServices";

//MQTT Config
const host = "wss://hairdresser.cloudmqtt.com";
const options = {
  port: 35572,
  host: "wss://hairdresser.cloudmqtt.com",
  username: "qiiwyeiv",
  password: "X4hvcjgbyUit",
  clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
  keepalive: 60,
  protocolId: "MQIsdp",
  protocolVersion: 3,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: "WillMsg",
    payload: "Connection Closed abnormally..!",
    qos: 0,
    retain: false,
  },
  rejectUnauthorized: false,
};

function MDataTable() {
  const history = useHistory()
  const dispatch = useDispatch();
  
  const _idProject = localStorage.getItem("AuthID");;
  const isLoaddingTable = useSelector((state) => state.isLoaddingTable);
  var summaryData = useSelector((state) => state.SUMMARY);
  var phaseOneData = useSelector((state) => state.PhaseOne);
  var phaseTwoData = useSelector((state) => state.PhaseTwo);
  var phaseThreeData = useSelector((state) => state.PhaseThree);

  const [clientMQTT, setClientMQTT] = useState(null);
  const [connectStatus, setConnectStatus] = useState("Connect");
  const [payload, setPayload] = useState({});
  const [topic, setTopic] = useState("");

  //Data 
  const [dataSummary ,setDataSummary] = useState([])
  const [dataPhaseOne ,setDataPhaseOne] = useState([])
  const [dataPhaseTwo ,setDataPhaseTwo] = useState([])
  const [dataPhaseThree ,setDataPhaseThree] = useState([])
  

  const [timeReport, setTimeReport] = useState("readTime");
  const handleReportChange = (e) => {
    setTimeReport(e.target.value);
  };

  //Connect MQTT
  useEffect(() => {
    if (isLoaddingTable) {
      history.go(0);
    }
     if((_idProject !="ADMIN" )&& (_idProject !== null))
     {      setClientMQTT(mqtt.connect(host, options));
    }
    dispatch({ type: "LOADDING_DASHBOARD" });
    dispatch({type:"LOADDING_ALARM"})
   
  },[]);


  //Time Sheet Api
   useLayoutEffect(() => {
        switch (timeReport) {
          //Hours
          case "hours":
              axios.post('/api/cabin/dataTimeHours', {
                _idProject :_idProject
              })
              .then(function (res) {
                let resData=res.data ;
                setDataSummary(resData.dataSummary)
                setDataPhaseOne(resData.dataPhaseOne)
                setDataPhaseTwo(resData.dataPhaseTwo)
                setDataPhaseThree(resData.dataPhaseThree)
              })
              .catch(function (error) {
                console.log(error);
              });
              break;
          //Days
          case "days":
              axios.post('/api/cabin/dataTimeDays', {
                _idProject :_idProject
              })
              .then(function (res) {
                let resData=res.data ;
                setDataSummary(resData.dataSummary)
                setDataPhaseOne(resData.dataPhaseOne)
                setDataPhaseTwo(resData.dataPhaseTwo)
                setDataPhaseThree(resData.dataPhaseThree)
              })
              .catch(function (error) {
                console.log(error);
              });
            
            break;
          //Weeks
          case "weeks":

              axios.post('/api/cabin/dataTimeWeeks', {
                _idProject :_idProject
              })
              .then(function (res) {
                let resData=res.data ;
                setDataSummary(resData.dataSummary)
                setDataPhaseOne(resData.dataPhaseOne)
                setDataPhaseTwo(resData.dataPhaseTwo)
                setDataPhaseThree(resData.dataPhaseThree)
              })
              .catch(function (error) {
                console.log(error);
              });
              
            
            break;
        
          default:
            break;
        }
   }, [timeReport])



  //Client MQTT
  useLayoutEffect(() => {
    if (clientMQTT ) {
      clientMQTT.on("connect", () => {
          console.log("MQTT Connecting " + _idProject)
         setConnectStatus("Connected");
         clientMQTT.subscribe(_idProject, (error) => {
            if (error) {
              console.log("Subscribe to topics error", error);
              setClientMQTT(mqtt.connect(host, options));
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
         
     };
  }, [clientMQTT]);

   //Payload
   useLayoutEffect(() => {
    if(topic && timeReport ==="readTime"){
        var payloadSplit = payload.toString().split('&')

        //TABLE SUMMARY
        var summaryData ={
            VLN     :getKeyValue(payloadSplit,"VLN"),
            VLL     :getKeyValue(payloadSplit,"VLL"),
            I       :getKeyValue(payloadSplit,"I"),
            KW      :getKeyValue(payloadSplit,"KW") ,
            KVAR    :getKeyValue(payloadSplit,"KVAR") ,
            KVA     :getKeyValue(payloadSplit,"KVA"),
            PF      :getKeyValue(payloadSplit,"PF"),
            F       :getKeyValue(payloadSplit,"F"),
            KWH     :getKeyValue(payloadSplit,"KWH")
          }
          dispatch({type:"TABLE_SUMMARY",summaryData:summaryData})
          

         //TABLE PHASE ONE
         var phaseOneData ={
          V1N     :getKeyValue(payloadSplit,"V1N"),
          V12     :getKeyValue(payloadSplit,"V12"),
          I1       :getKeyValue(payloadSplit,"I1"),
          KW1      :getKeyValue(payloadSplit,"KW1") ,
          KVAR1    :getKeyValue(payloadSplit,"KVAR1") ,
          KVA1     :getKeyValue(payloadSplit,"KVA1"),
          PF1      :getKeyValue(payloadSplit,"PF1")
        }
        dispatch({type:"TABLE_PHASE_ONE",phaseOneData:phaseOneData})


         //TABLE PHASE TW0
         var phaseTwoData ={
          V2N      :getKeyValue(payloadSplit,"V2N"),
          V23      :getKeyValue(payloadSplit,"V23"),
          I2       :getKeyValue(payloadSplit,"I2"),
          KW2      :getKeyValue(payloadSplit,"KW2") ,
          KVAR2    :getKeyValue(payloadSplit,"KVAR2") ,
          KVA2     :getKeyValue(payloadSplit,"KVA2"),
          PF2      :getKeyValue(payloadSplit,"PF2")
        }
        dispatch({type:"TABLE_PHASE_TWO",phaseTwoData:phaseTwoData})

        
         //TABLE PHASE THREE
         var phaseThreeData ={
          V3N      :getKeyValue(payloadSplit,"V3N"),
          V31      :getKeyValue(payloadSplit,"V31"),
          I3       :getKeyValue(payloadSplit,"I3"),
          KW3      :getKeyValue(payloadSplit,"KW3") ,
          KVAR3    :getKeyValue(payloadSplit,"KVAR3") ,
          KVA3     :getKeyValue(payloadSplit,"KVA3"),
          PF3      :getKeyValue(payloadSplit,"PF3")
        }
        dispatch({type:"TABLE_PHASE_THREE",phaseThreeData:phaseThreeData})
        
     
      }
    }, [payload])

  if (isLoaddingTable) {
    return (
      <React.Fragment>
        <div className="container-spinners">
          <div className="spinners">
            <ClipLoader size={60} color="#727cf5" loading={isLoaddingTable} />
          </div>
        </div>
      </React.Fragment>
    );
  }
  else if(timeReport ==="readTime")
  {
    return (
      <>
        <div className="pcoded-content">
          <div className="pcoded-inner-content">
            <div className="main-body">
              <div className="page-wrapper ">
                <div className="page-body shadow-none">
                  {/* ------- Start-Dashboard -------  */}
                  <div className="page-start-dashboard">
                    <div className="row">
                      <div className="col-6">
                        <div className="page-title-box">
                          <div className="page-title">
                            <div className="page-icon">
                              <FeatherIcon
                                icon="server"
                                color="#727cf5"
                                size={14}
                              />
                            </div>
                            <div className="page-title-text page-title-text-fs">
                              DataTables
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="option-time-report">
                          <Radio.Group
                            defaultValue="readtime"
                            value={timeReport}
                            onChange={handleReportChange}
                            size="small"
                          >
                            <Radio.Button value="readTime">
                              Read Time
                            </Radio.Button>
                            <Radio.Button value="hours">Hours</Radio.Button>
                            <Radio.Button value="days">Days</Radio.Button>
                            <Radio.Button value="weeks">Weeks</Radio.Button>
                          </Radio.Group>
                        </div>
                      </div>
                    </div>
  
                    {/* --------------------- Header Dashboard -------------------------*/}
                    <div className="table-data-contanier">            
                       <Tabs className="justify-content-start"  defaultActiveKey="Summary" id="uncontrolled-tab-example">
                          <Tab eventKey="Summary" title="SUMMARY">
                            <DataTableSummary summaryData={summaryData} modeTime={"readTime"}/>
                          </Tab>
                          <Tab eventKey="phase1" title="PHASE 1">
                            <DataTablePhase1 phaseOneData={phaseOneData} modeTime={"readTime"}/>
                          </Tab>
                          <Tab eventKey="phase2" title="PHASE 2">
                            <DataTablePhase2  phaseTwoData={phaseTwoData} modeTime={"readTime"}/>
                          </Tab>
                          <Tab eventKey="phase3" title="PHASE 3">
                            <DataTablePhase3  phaseThreeData={phaseThreeData} modeTime={"readTime"}/>
                          </Tab>
                        </Tabs> 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
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
                <div className="page-start-dashboard">
                  <div className="row">
                    <div className="col-6">
                      <div className="page-title-box">
                        <div className="page-title">
                          <div className="page-icon">
                            <FeatherIcon
                              icon="server"
                              color="#727cf5"
                              size={14}
                            />
                          </div>
                          <div className="page-title-text page-title-text-fs">
                            DataTables
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="option-time-report">
                        <Radio.Group
                          defaultValue="readtime"
                          value={timeReport}
                          onChange={handleReportChange}
                          size="small"
                        >
                          <Radio.Button value="readTime">
                            Read Time
                          </Radio.Button>
                          <Radio.Button value="hours">Hours</Radio.Button>
                          <Radio.Button value="days">Days</Radio.Button>
                          <Radio.Button value="weeks">Weeks</Radio.Button>
                        </Radio.Group>
                      </div>
                    </div>
                  </div>

                  {/* --------------------- Header Dashboard -------------------------*/}
                  <div className="table-data-contanier">            
                    <Tabs className="justify-content-start"  defaultActiveKey="Summary" id="uncontrolled-tab-example">
                        <Tab eventKey="Summary" title="SUMMARY">
                          <DataTableSummary summaryData={dataSummary}  />
                        </Tab>
                        <Tab eventKey="phase1" title="PHASE 1">
                          <DataTablePhase1 phaseOneData={dataPhaseOne} />
                        </Tab>
                        <Tab eventKey="phase2" title="PHASE 2">
                          <DataTablePhase2  phaseTwoData={dataPhaseTwo}/>
                        </Tab>
                        <Tab eventKey="phase3" title="PHASE 3">
                          <DataTablePhase3  phaseThreeData={dataPhaseThree}/>
                        </Tab>
                      </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MDataTable;
