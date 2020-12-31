import React, { useState ,useLayoutEffect} from 'react'
import FeatherIcon from 'feather-icons-react';
import {  Tabs,Tab } from 'react-bootstrap';
import { Radio } from 'antd';
import {useDispatch} from 'react-redux';
import DataTableSummary from "../library/dataTable/dataTableSummary"
import DataTablePhase1 from "../library/dataTable/dataTablePhase1"
import DataTablePhase2 from "../library/dataTable/dataTablePhase2"
import DataTablePhase3 from "../library/dataTable/dataTablePhase3"



function MDataTable(props) {
    const payload = props.payload ;
    const topic = props.topic;
    
    const dispatch = useDispatch();

    const [timeReport,setTimeReport] = useState("readTime")
    const handleReportChange = e => {
        setTimeReport( e.target.value );
      };



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
                                    <div className="col-6">
                                        <div className="page-title-box">
                                            <div className="page-title">
                                                <div className="page-icon">
                                                    <FeatherIcon icon="server" color="#727cf5" size={14} />
                                                </div>
                                                <div className="page-title-text page-title-text-fs">DataTables</div>
                                            </div>

                                        </div>
                                    </div> 
                                    <div className="col-6">
                                        <div className="option-time-report">
                                            <Radio.Group defaultValue="readtime" value={timeReport} onChange={handleReportChange} size="small">
                                                <Radio.Button value="readTime">Read Time</Radio.Button>
                                                <Radio.Button value="hours">Hours</Radio.Button>
                                                <Radio.Button value="days">Days</Radio.Button>
                                                <Radio.Button value="weeks">Weekd</Radio.Button>
                                            </Radio.Group>
                                        </div>
                                    </div>                                   
                                </div>
                               
                                
                                {/* --------------------- Header Dashboard -------------------------*/}
                                <div className="table-data-contanier">
                                
                                    <Tabs  className="justify-content-start" defaultActiveKey="Summary" id="uncontrolled-tab-example">
                                        <Tab eventKey="Summary" title="SUMMARY">
                                            <DataTableSummary/>
                                        </Tab>
                                        <Tab eventKey="phase1" title="PHASE 1">
                                            <DataTablePhase1/>          
                                        </Tab>
                                        <Tab eventKey="phase2" title="PHASE 2">
                                            <DataTablePhase2/>               
                                        </Tab>
                                        <Tab eventKey="phase3" title="PHASE 3">
                                            <DataTablePhase3/>               
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
    )
}

export default MDataTable
