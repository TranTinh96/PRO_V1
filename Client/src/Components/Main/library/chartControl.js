import React,{useState ,useEffect,useLayoutEffect}from "react";
import Switch from "react-switch";
import {useSelector ,useDispatch} from 'react-redux';
import axios from "axios"
import { Button } from 'antd';
import onLight from "../../../assets/Image/light/on.png"
import offLight from "../../../assets/Image/light/off.png"
import topicPublish from "../../MQTT/topicPublish"



function ChartControl(props) {
    var RLmodeA = useSelector((state) => state.RL).RLAmode;
    var RLmodeB =  useSelector((state) => state.RL).RLAmode;
    var RLstatusA =  useSelector((state) => state.RL).RLAstatus;
    var RLstatusB =  useSelector((state) => state.RL).RLBstatus;
  //MQTT
    var clientMQTT= props.clientMQTT
    //Redux
    var dispatch =useDispatch();
    const role = useSelector((state) => state.setUserJWT).users.role;
    const _idProject = useSelector((state) => state.idTopicProject);
    //RLA
    const [RLAstatus ,setRLAstatus] = useState("off")
    const [RLAmode ,setRLAmode] = useState("manual")
    //RLB
    const [RLBstatus ,setRLBstatus] = useState("off")
    const [RLBmode ,setRLBmode] = useState("manual")
    //Topic publish
    const topic =`${_idProject}/${topicPublish.topic}`
    //Time mode = auto
    const [state , setState]= useState({
        RLAonTime : " ",
        RLAoffTime : " ",
        RLBonTime : " ",
        RLBoffTime : " "
    })

    /** 
     * Function
     */
    function checkRLStatus(status){
      return  status=="on"? true:false;
    }

    function checkStatus(status){
      var light;
      if(status=="on"){
        light ="off"
      }
      else{
        light ="on"
      }
      return light;
    }
    //Input Time
    function handleChange(e) {
      const value = e.target.value;
      setState({
        ...state,
        [e.target.name]: value
      });
    }


    //Handle change mode

    const handleChangeModeRelayA = () => {
      RLAmode ==="auto" ? setRLAmode('manual') : setRLAmode('auto')
    };

    const handleChangeModeRelayB = () => {
        RLBmode ==="auto" ? setRLBmode('manual') : setRLBmode('auto')
    };

    /**
     * Publish MQTT mode Manual
     */
    
     const handleManualRLA = () => {
      var payload = "&RLAmode"+ "=" + RLAmode + "&"+ "RLAstatus"+"="+ checkStatus(RLAstatus)+"&";
      checkRLStatus(RLAstatus) ? setRLAstatus("off") :setRLAstatus('on')
      axios.post('/api/cabin/relay/update', {
        _idProject :_idProject,
        name :'RLA',
        mode :"manual",
        status : RLstatusA ,
        timeOn :'00:00',
        timeOff :'00:00'
     })
      .then(function (res) {
        var Res = res.data
         if(Res.success){
           console.log(Res)
         }
      })
      clientMQTT.publish(topic,payload)
    };
    const handleManualRLB= () => {
      var payload = "&RLBmode"+ "=" + RLBmode + "&"+ "RLBstatus"+"="+checkStatus(RLBstatus)+"&";
      checkRLStatus(RLBstatus) ? setRLBstatus("off") :setRLBstatus('on')
      clientMQTT.publish(topic,payload)
    };

    /**
     * Publish MQTT mode Auto
     */

    const onClickRLAauto = () => {
      if( (state.RLAoffTime !==" ") &&(state.RLAonTime !==" ")){
        var payload = "&RLAmode"+ "=" + RLAmode + "&"+ "RLAonTime"+"=" + state.RLAonTime+":00"+"&"+"RLAoffTime"+"=" + state.RLAoffTime+":00"+"&";
        clientMQTT.publish(topic,payload)
      }
      else
      {
        alert("RLAonTime or RLAoffTime don't value !")
      }
    }
    const onClickRLBauto = () => {
      if( (state.RLBoffTime !==" ") && (state.RLBonTime !==" ")){
        var payload = "&RLBmode"+ "=" + RLBmode + "&"+ "RLABnTime"+"=" + state.RLBonTime+":00"+"&"+"RLBoffTime"+"=" + state.RLBoffTime+":00"+"&";
        clientMQTT.publish(topic,payload)
      }
      else
      {
        alert("RLBonTime or RLBoffTime don't value !")
      }
    }

   const [isDisable,setIsDisable] =useState(false)

  
  //Role
   useEffect(() => {
      if(role =="User")
      {
        setIsDisable(true);
      }
     
   }, [role])

  useLayoutEffect(() => {
     //Mode
      RLmodeA ==="auto" ? setRLAmode("auto"): setRLAmode('manual')
      RLmodeB ==="auto" ? setRLBmode("auto"): setRLBmode('manual')
      //Status 
      RLstatusA ==="on" ? setRLAstatus("on") : setRLAstatus("off")
      RLstatusB ==="on" ? setRLBstatus("on") : setRLBstatus("off")
    
  }, [RLmodeA,RLmodeB,RLstatusA,RLstatusB])


  return (
    <div className={isDisable ? "table-chartFreEne-container-disable":"table-chartFreEne-container"}>
      <table className="table table-striped table-chartFreEne table-chartControl" responsive>
        <thead>
          <tr>
            <th scope="col">RELAY</th>
            <th scope="col">STATUS</th>
            <th scope="col">MODE</th>
            <th scope="col">AUTO / MANUAL</th>
          </tr>
        </thead>
        <tbody className="my-tbody">
         {/* Relay A */}
          <tr>
            <td className="table-chartFreEne-name">
              <div className="badge-chartFreEne"></div>
              <p>RELAY A</p>
            </td>
            <td className="table-chartFreEne-status">
                {RLAstatus ==="on" ? <img  src={onLight} alt="Joseph" className="img-light-on" />:   <img  src={offLight} alt="Joseph" className="img-light-off" />}
            </td>
          
            <td className="table-chartFreEne-mode">
              <Switch
                  checked={RLAmode=="auto"?true:false}
                  onChange={handleChangeModeRelayA}
                  className="react-switch"
                  id="icon-switch"
                  height={25}
                  width={55}
                  offColor="#ced4da"
                  onColor="#80ed99"
                  uncheckedIcon={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: 11,
                        color: "#727cf5",
                        paddingRight: 2 ,
                        fontWeight:700
                      }}
                    >
                      M
                    </div>
                  }
                  checkedIcon={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: 11,
                        color: "#727cf5",
                        paddingRight: 2,
                        fontWeight:700
                      }}
                    >
                      AU
                    </div>
                  }
                
                />
            </td>
            {RLAmode=="auto" ? 
            <td className="table-chartControl-auto">
                <input className="form-control shadow-none rounded-0 d-inline" type="time" name="RLAonTime"  value={state.RLAonTime} onChange={handleChange}/>
                <input className="form-control shadow-none rounded-0 d-inline m-l-10 m-r-10" type="time" name="RLAoffTime"  value={state.RLAoffTime} onChange={handleChange}/>
                <Button type="primary" type="dashed" onClick={onClickRLAauto}>SET</Button>
            </td>
            :
            <td className="table-chartControl-manual">
              <Switch
                checked={checkRLStatus(RLAstatus)}
                onChange={handleManualRLA}
                className="react-switch"
                id="icon-switch"
                height={25}
                width={55}
                offColor="#ced4da"
                onColor="#d8f3dc"
                uncheckedIcon={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      fontSize: 11,
                      color: "#727cf5",
                      paddingRight: 2 ,
                      fontWeight:700
                    }}
                  >
                    OFF
                  </div>
                }
                checkedIcon={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      fontSize: 11,
                      color: "red",
                      paddingRight: 2,
                      fontWeight:700
                    }}
                  >
                    ON
                  </div>
                }
              
              />
            </td>
            }
          </tr>
          {/* Relay B  */}
          <tr>
            <td className="table-chartFreEne-name">
              <div className="badge-chartFreEne"></div>
              <p>RELAY B</p>
            </td>
            <td className="table-chartFreEne-status">
                {RLBstatus==="on" ? <img  src={onLight} alt="Joseph" className="img-light-on" />:   <img  src={offLight} alt="Joseph" className="img-light-off" />}
            </td>
            <td className="table-chartFreEne-mode">
              <Switch
                    checked={RLBmode=="auto"?true:false}
                    onChange={handleChangeModeRelayB}
                    className="react-switch"
                    id="icon-switch"
                    height={25}
                    width={55}
                    offColor="#ced4da"
                    onColor="#80ed99"
                    uncheckedIcon={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                          fontSize: 11,
                          color: "#727cf5",
                          paddingRight: 2 ,
                          fontWeight:700
                        }}
                      >
                        M
                      </div>
                    }
                    checkedIcon={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                          fontSize: 11,
                          color: "#727cf5",
                          paddingRight: 2,
                          fontWeight:700
                        }}
                      >
                        AU
                      </div>
                    }
                  
                  />
            </td>
            {RLBmode=="auto"?
            <td className="table-chartControl-auto">
                 <input className="form-control shadow-none rounded-0 d-inline" type="time" name="RLBonTime"  value={state.RLBonTime} onChange={handleChange}/>
                <input className="form-control shadow-none rounded-0 d-inline m-l-10 m-r-10" type="time" name="RLBoffTime"  value={state.RLBoffTime} onChange={handleChange}/>
                <Button type="primary" type="dashed" onClick={onClickRLBauto}>SET</Button>
            </td>
            :
            <td className="table-chartControl-manual">
            <Switch
                checked={checkRLStatus(RLBstatus)}
                onChange={handleManualRLB}
                className="react-switch"
                id="icon-switch"
                height={25}
                width={55}
                offColor="#ced4da"
                onColor="#d8f3dc"
                uncheckedIcon={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      fontSize: 11,
                      color: "#727cf5",
                      paddingRight: 2 ,
                      fontWeight:700
                    }}
                  >
                    OFF
                  </div>
                }
                checkedIcon={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      fontSize: 11,
                      color: "red",
                      paddingRight: 2,
                      fontWeight:700
                    }}
                  >
                    ON
                  </div>
                }
              
              />
            </td>
            }
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ChartControl;
