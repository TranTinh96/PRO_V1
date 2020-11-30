import React, { useState } from 'react'
import FeatherIcon from 'feather-icons-react';
import { Link,useHistory } from "react-router-dom";
import { DatePicker } from 'rc-datepicker';

function formatDate(d) {
    var month = parseInt(d.getMonth()) + 1
    var timeDay =checkLength(d.getDate()) + " - " + checkLength(month )+ " - " + d.getFullYear()
    return timeDay;
}
function currentDateInput() {
    var date = new Date().toLocaleDateString().split("/");
    var timeDay =checkLength(date[0]) + " - " + checkLength(date[1]) + " - " + date[2]
    return timeDay;
}
function currentDateCalendar() {
    var date = new Date().toLocaleDateString().split("/");
    var timeDay = checkLength(date[2]) + "-" + checkLength(date[1]) + "-" + date[0]
    return timeDay;
}
function checkLength(value){
  return  value.length <= 1 ?  "0"+ value : value
}


function MDashbard() {

    const [isCalendar, setCalendar] = useState(false)
    const [date, setDate] = useState(currentDateCalendar())
    const [timeInput, setTimeInput] = useState(currentDateInput())

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
                                                        <div className="input-group" onClick={() => setCalendar(!isCalendar)}>
                                                            <input type="text" className="form-control form-control-light shadow-none border-0 input-shadow" value={timeInput} />
                                                            <div className="input-group-append">
                                                                <span className="input-group-text bg-primary border-primary text-white btn-shadow-2">
                                                                    <FeatherIcon icon="calendar" color="#ffffff" size={12} />

                                                                </span>

                                                            </div>
                                                        </div>
                                                        <div className={isCalendar ? "page-calendar d-block" : "page-calendar d-none"}>
                                                            {/* 
                                                            <DatePicker value={date} locale='EN'
                                                                onChange={jsDate => {
                                                                    setDate(jsDate)
                                                                    setTimeInput(formatDate(jsDate))
                                                                }} />
                                                                */}
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
                                         <div className="col-lg-3 col-md-3 col-sm-12">
                                            <div  className="card">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-baseline">
                                                        <h6 className="card-title mb-0">New Customers</h6>
                                                    </div>
                                                    <div className="row">
                                                         <button className="btn btn-primary m-t-20 rounded-0 border-0 shadow-none" >SET COOKIE</button>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-12">
                                            <div  className="card">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-baseline">
                                                        <h6 className="card-title mb-0">New Customers</h6>
                                                    </div>
                                                    <div className="row">

                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-12">
                                            <div  className="card">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-baseline">
                                                        <h6 className="card-title mb-0">New Customers</h6>
                                                    </div>
                                                    <div className="row">

                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-12">
                                            <div  className="card">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-baseline">
                                                        <h6 className="card-title mb-0">New Customers</h6>
                                                    </div>
                                                    <div className="row">

                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                            </div>
                            {/*----------- End header dashboard -------------*/}
                            <div className='page-chart-dashboard'>
                                <div className="row">
                                    <div className="col-lg-8 col-sm-12">
                                        
                                    </div>
                                    <div className="col-lg-4 col-sm-12">

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
