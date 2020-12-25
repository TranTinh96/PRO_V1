import React, { useState ,useEffect } from 'react'
import FeatherIcon from 'feather-icons-react';
import { Link } from "react-router-dom";

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

//Function getKeyValue
import {getKeyValue}  from "../../services/fucServices"
import { ViewListOutlined } from '@material-ui/icons';


function currentDateInput() {
    var date = new Date().toLocaleDateString().split("/");
    var timeDay =checkLength(date[1]) + " - " + checkLength(date[0]) + " - " + date[2]
    return timeDay;
}

function checkLength(value){
  return  value.length <= 1 ?  "0"+ value : value
}


function MDashbard(props) {
    var clientMQTT = props.clientMQTT;
    var payload = props.payload ;
    //Calendar
    const [timeInput, setTimeInput] = useState(currentDateInput())

    //VOLTAGE LINE-NEUTRAL
    const [VLN , setVLN] =useState(0);
    const [V1N , setV1N] =useState(0);
    const [V2N , setV2N] =useState(0);
    const [V3N , setV3N] =useState(0);

    //CURRENT
    const [I , setI] =useState(0);
    const [I1 , setI1] =useState(0);
    const [I2 , setI2] =useState(0);
    const [I3 , setI3] =useState(0);

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
    useEffect(() => {
        if(payload){

            //VOLTAGE LINE-NEUTRAL
            setVLN(getKeyValue(payload,"VLN"))
            setV1N(getKeyValue(payload,"V1N"))
            setV2N(getKeyValue(payload,"V2N"))
            setV3N(getKeyValue(payload,"V3N"))

            //CURRENT
            setI(getKeyValue(payload,"I"))
            setI1(getKeyValue(payload,"I1"))
            setI2(getKeyValue(payload,"I2"))
            setI3(getKeyValue(payload,"I3"))

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
            setPE(getKeyValue(payload,"PE"))
            setPE1(getKeyValue(payload,"PE1"))
            setPE2(getKeyValue(payload,"PE2"))
            setPE3(getKeyValue(payload,"PE3"))

             //F & KW
            setF(getKeyValue(payload,"F"))
            setKWH(getKeyValue(payload,"KWH"))
        }

    }, [payload])


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
                                                            <ChartLine/>                                              
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
                                                            <ChartLine/>                                              
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
                                                            <ChartLine/>                                             
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
                                                            <ChartLine/>                                              
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
                                                    <h5 className="card-title card-title-header mb-0">ELECTRIC</h5>
                                                </div>
                                                <div className="card-content-line-chart align-items-center">
                                                    <ChartElectric/>
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
                                                         <ChartControl clientMQTT={props.clientMQTT}/>        
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
                                                         <ChartFreEne Frequcency ={F} KWH={KWH}/>       
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
                                                    <CardData summary={PE} phase1={PE1} phase2={PE2} phase3={PE3}/>
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
