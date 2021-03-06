import React ,{useEffect} from 'react'
import Map from "../library/map"
import FeatherIcon from 'feather-icons-react';
import { useDispatch} from "react-redux";

function Maps() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: "LOADDING_DASHBOARD" });
        dispatch({ type: "LOADDING_TABLE" });
        dispatch({type:"LOADDING_ALARM"})
      }, []);
    
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
                                                    <FeatherIcon icon="map-pin" color="#727cf5" size={15} />
                                                </div>
                                                <div className="page-title-text page-title-text-fs">Maps</div>
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

export default Maps
