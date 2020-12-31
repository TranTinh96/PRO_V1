import React, { useState  } from 'react'
import FeatherIcon from 'feather-icons-react';
import { Link } from "react-router-dom";
import {useSelector } from 'react-redux';
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


function currentDateInput() {
    var date = new Date().toLocaleDateString().split("/");
    var timeDay =checkLength(date[1]) + " - " + checkLength(date[0]) + " - " + date[2]
    return timeDay;
}

function checkLength(value){
  return  value.length <= 1 ?  "0"+ value : value
}


function MDashbard(props) {

    //Calendar
    const [timeInput, setTimeInput] = useState(currentDateInput())

    //VOLTAGE LINE-NEUTRAL
    const VLNArray = useSelector((state) => state.VLNArray);
    const V1NArray = useSelector((state) => state.V1NArray);
    const V2NArray = useSelector((state) => state.V2NArray);
    const V3NArray = useSelector((state) => state.V3NArray);
    const VLN = useSelector((state) => state.VLN).VLN;
    const V1N = useSelector((state) => state.VLN).V1N;
    const V2N = useSelector((state) => state.VLN).V2N;
    const V3N = useSelector((state) => state.VLN).V3N;

    //KW
    const KW = useSelector((state) => state.KW).KW;
    const KW1 = useSelector((state) => state.KW).KW1;
    const KW2 = useSelector((state) => state.KW).KW2;
    const KW3 = useSelector((state) => state.KW).KW3;

    //KVA
    const KVA = useSelector((state) => state.KVA).KVA;
    const KVA1 = useSelector((state) => state.KVA).KVA1;
    const KVA2 = useSelector((state) => state.KVA).KVA2;
    const KVA3 = useSelector((state) => state.KVA).KVA3;

     //KVAR
     const KVAR = useSelector((state) => state.KVAR).KVAR;
     const KVAR1 = useSelector((state) => state.KVAR).KVAR1;
     const KVAR2 = useSelector((state) => state.KVAR).KVAR2;
     const KVAR3 = useSelector((state) => state.KVAR).KVAR3;

     //PF
    const PF = useSelector((state) => state.PF).PF;
    const PF1 = useSelector((state) => state.PF).PF1;
    const PF2 = useSelector((state) => state.PF).PF2;
    const PF3 = useSelector((state) => state.PF).PF3;
  
    //F & KW
    var FArray = useSelector((state) => state.FArray);
    var KWHArray = useSelector((state) => state.EArray);
    var F= useSelector((state) => state.F);
    var KWH = useSelector((state) => state.E);


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
                                                    <ChartElectric I={props.I} I1={props.I1} I2={props.I2} I3={props.I3}/>
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
                                                         <ChartControl clientMQTT={props.clientMQTT} RLAstatus={props.RLAstatus} RLBstatus={props.RLBstatus} RLAmode={props.RLAmode} RLBmode={props.RLBmode} />        
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
