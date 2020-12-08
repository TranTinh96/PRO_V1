import React, { useState } from 'react'
import FeatherIcon from 'feather-icons-react';
import {  Tabs,Tab } from 'react-bootstrap';
import DataTableSummary from "../library/dataTable/dataTableSummary"
import DataTablePhase1 from "../library/dataTable/dataTablePhase1"
import DataTablePhase2 from "../library/dataTable/dataTablePhase2"
import DataTablePhase3 from "../library/dataTable/dataTablePhase3"

function MDataTable() {
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
                                            <div className="page-title">
                                                <div className="page-icon">
                                                    <FeatherIcon icon="server" color="#727cf5" size={18} />
                                                </div>
                                                <div className="page-title-text">DataTables</div>
                                            </div>

                                        </div>
                                    </div>                                    
                                </div>
                                {/* --------------------- Header Dashboard -------------------------*/}
                                <div className="table-data-contanier">
                                    <Tabs  className="justify-content-end" defaultActiveKey="Summary" id="uncontrolled-tab-example">
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
