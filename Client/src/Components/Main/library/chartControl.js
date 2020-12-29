import React,{useState ,useEffect,useLayoutEffect}from "react";
import Switch from "react-switch";
import {useSelector ,useDispatch} from 'react-redux';
import { Button } from 'antd';
import onLight from "../../../assets/Image/light/on.png"
import offLight from "../../../assets/Image/light/off.png"
import topicPublish from "../../MQTT/topicPublish"



function ChartControl(props) {
  //MQTT
    var clientMQTT= props.clientMQTT
    //Redux
    var dispatch =useDispatch();
    const role = useSelector((state) => state.setUserJWT).users.role;
    const _idProject = useSelector((state) => state.idTopicProject);
    const RLAstatus = useSelector((state) => state.RLA.RLAstatus);
    const RLAmode = useSelector((state) => state.RLA.RLAmode);
    const RLBstatus = useSelector((state) => state.RLB.RLBstatus);
    const RLBmode = useSelector((state) => state.RLB.RLBmode);

    const topic =`${_idProject}/${topicPublish.topic}`
    const [state , setState]= useState({
        RLAonTime : " ",
        RLAoffTime : " ",
        RLBonTime : " ",
        RLBoffTime : " "
    })



    
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


     //Publish MQTT mode Manual
    const handleManualRLA = () => {
      var payload = "&RLAmode"+ "=" + RLAmode + "&"+ "RLAstatus"+"="+ checkStatus(RLAstatus)+"&";
      if(checkRLStatus(RLAstatus))
        dispatch({type:'RLAstatusOFF'})
      else
        dispatch({type:'RLAstatusON'})
     
      clientMQTT.publish(topic,payload)
    };
    const handleManualRLB= () => {
      var payload = "&RLBmode"+ "=" + RLBmode + "&"+ "RLBstatus"+"="+checkStatus(RLBstatus)+"&";
      if(checkRLStatus(RLBstatus))
          dispatch({type:'RLBstatusOFF'})
      else
         dispatch({type:'RLBstatusON'})

      clientMQTT.publish(topic,payload)
    };
    const handleChangeModeRelayA = () => {
    
      if(RLAmode ==="auto")
        dispatch({type:'RLAmodeManual'})
      else
        dispatch({type:'RLAmodeAuto'})
  
    };
    const handleChangeModeRelayB = () => {
      if(RLBmode ==="auto")
        dispatch({type:'RLBmodeManual'})
      else
        dispatch({type:'RLBmodeAuto'})
    };
    //Publish MQTT mode Auto
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
  //useEffect
   useEffect(() => {
      if(role =="User")
      {
        setIsDisable(true);
      }
     
   }, [role])

  useLayoutEffect(() => {
      var RLmodeA = props.RLAmode
      var RLmodeB = props.RLBmode
      var RLstatusA = props.RLAstatus
      var RLstatusB = props.RLBstatus
      //RELAY A
      if(RLmodeA ==="auto")
          dispatch({type:'RLAmodeAuto'})
      else if(RLmodeA ==="manual")
          dispatch({type:'RLAmodeManual'})
      //RELAY B
      if(RLmodeB ==="auto")
          dispatch({type:'RLBmodeAuto'})
      else if(RLmodeB ==="manual")
          dispatch({type:'RLBmodeManual'})
        
      //Status RELAY A
      if(RLstatusA ==="on")
          dispatch({type:'RLAstatusON'})
      else if(RLstatusA ==="off")
          dispatch({type:'RLAstatusOFF'})
       //Status RELAY B
      if(RLstatusB ==="on")
          dispatch({type:'RLBstatusON'})
      else if(RLstatusB ==="off")
          dispatch({type:'RLBstatusOFF'})




  }, [props])


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
