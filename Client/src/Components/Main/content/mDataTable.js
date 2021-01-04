import React, { useState, useEffect , useLayoutEffect } from "react";
import {useHistory } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { Tabs, Tab } from "react-bootstrap";
//import { useCookies } from 'react-cookie';
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
  host: "wss://address.cloudmqtt.com",
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
  
  const _idProject = useSelector((state) => state.idTopicProject);
  const isLoaddingTable = useSelector((state) => state.isLoaddingTable);
  //Cookie
  //const [cookies, removeCookie] = useCookies(["Auth"]);

  const [clientMQTT, setClientMQTT] = useState(null);
  const [connectStatus, setConnectStatus] = useState("Connect");
  const [payload, setPayload] = useState({});
  const [topic, setTopic] = useState("");

  const [timeReport, setTimeReport] = useState("readTime");
  const handleReportChange = (e) => {
    setTimeReport(e.target.value);
  };

  //Connect MQTT
  useEffect(() => {
    if (isLoaddingTable) {
      history.go(0);
    }

    setClientMQTT(mqtt.connect(host, options));
    dispatch({ type: "LOADDING_DASHBOARD" });
  }, []);

  //Client MQTT
  useLayoutEffect(() => {
    if (clientMQTT) {
      clientMQTT.on("connect", () => {
          console.log("MQTT Connecting " + _idProject)
        setConnectStatus("Connected");
        if (_idProject) {
          clientMQTT.subscribe(_idProject, (error) => {
            if (error) {
              console.log("Subscribe to topics error", error);
              setClientMQTT(mqtt.connect(host, options));
            }
          });
        }
       
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
    if(topic){
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
                    <Tabs
                      className="justify-content-start"
                      defaultActiveKey="Summary"
                      id="uncontrolled-tab-example"
                    >
                      <Tab eventKey="Summary" title="SUMMARY">
                        <DataTableSummary />
                      </Tab>
                      <Tab eventKey="phase1" title="PHASE 1">
                        <DataTablePhase1 />
                      </Tab>
                      <Tab eventKey="phase2" title="PHASE 2">
                        <DataTablePhase2 />
                      </Tab>
                      <Tab eventKey="phase3" title="PHASE 3">
                        <DataTablePhase3 />
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
