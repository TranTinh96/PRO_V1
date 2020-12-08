import React from 'react'
import Map from "../library/map"
import FeatherIcon from 'feather-icons-react';

function mMaps() {
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
                                           
                                            </div>
                                            <div className="page-title">
                                                <div className="page-icon">
                                                    <FeatherIcon icon="map-pin" color="#727cf5" size={17} />
                                                </div>
                                                <div className="page-title-text">Maps</div>
                                            </div>

                                        </div>
                                    </div>                                    
                                </div>
                                {/* --------------------- Header Dashboard -------------------------*/}
                                <div className="map-contanier col-12 ">
                                    <Map/>
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

export default mMaps
