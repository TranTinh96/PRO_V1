import React,{useState ,useEffect,useLayoutEffect}from "react";
import Switch from "react-switch";
import {useSelector ,useDispatch} from 'react-redux';
import axios from "axios"
import { Button } from 'antd';
import onLight from "../../../assets/Image/light/on.png"
import offLight from "../../../assets/Image/light/off.png"
import topicPublish from "../../MQTT/topicPublish"



function ChartControl(props) {
    const RLmodeA = useSelector((state) => state.RL).RLAmode;
    const RLmodeB =  useSelector((state) => state.RL).RLBmode;
    const RLstatusA =  useSelector((state) => state.RL).RLAstatus;
    const RLstatusB =  useSelector((state) => state.RL).RLBstatus;
    
    //MQTT
    var clientMQTT= props.clientMQTT
    //Redux
    var dispatch =useDispatch();
    const role = useSelector((state) => state.setUserJWT).users.role;
    const _idProject = props._idProject
    //RLA
    const [RLAstatus ,setRLAstatus] = useState("off")
    const [RLAmode ,setRLAmode] = useState("manual")
    //RLB
    const [RLBstatus ,setRLBstatus] = useState("off")
    const [RLBmode ,setRLBmode] = useState("manual")
    const [RLAonTime ,setRLAonTime] = useState(" ")
    const [RLAoffTime ,setRLAoffTime] = useState(" ")
    const [RLBonTime ,setRLBonTime] = useState(" ")
    const [RLBoffTime ,setRLBoffTime] = useState(" ")

    //Topic publish
    const topic =`${_idProject}/${topicPublish.topic}`

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
    function handleChangeRLAonTime(e) {
      setRLAonTime(e.target.value);
    }

    function handleChangeRLAoffTime(e) {
      setRLAoffTime(e.target.value);
    }

    function handleChangeRLBonTime(e) {
      setRLBonTime(e.target.value);
    }

    function handleChangeRLBoffTime(e) {
      setRLBoffTime(e.target.value);
    }


    //Handle change mode

    const handleChangeModeRelayA = () => {
      RLAmode =="auto" ? setRLAmode('manual') : setRLAmode('auto')
    };

    const handleChangeModeRelayB = () => {
        RLBmode =="auto" ? setRLBmode('manual') : setRLBmode('auto')
    };

    /**
     * Publish MQTT mode Manual
     */
    
     const handleManualRLA = () => {
      var payload = "&RLAmode"+ "=" + RLAmode + "&"+ "RLAstatus"+"="+ checkStatus(RLAstatus)+"&";
      
      let arrayRLAManual =[
        {
          name :'RLA',
          mode :RLAmode,
          status : checkStatus(RLAstatus) ,
          timeOn :"00:00",
          timeOff :"00:00"
        } ,
        {
          name :'RLB',
          mode :RLBmode,
          status : RLBstatus ,
          timeOn : RLBonTime,
          timeOff : RLBoffTime
        }
      ]
      axios.post('/api/cabin/relay/update', {
        _idProject :_idProject,
        arrayRelay :arrayRLAManual
     })
      .then(function (res) {
        var Res = res.data
         if(Res.status){
          checkRLStatus(RLAstatus) ? setRLAstatus("off") :setRLAstatus('on')
         }
      })
      clientMQTT.publish(topic,payload)
    };

    //Manual B
    const handleManualRLB= () => {
      var payload = "&RLBmode"+ "=" + RLBmode + "&"+ "RLBstatus"+"="+checkStatus(RLBstatus)+"&";
    
      let arrayRelayBManual =[
        {
          name :'RLA',
          mode :RLAmode,
          status : RLAstatus ,
          timeOn : RLAonTime,
          timeOff : RLAoffTime
        } ,
        {
          name :'RLB',
          mode :RLBmode,
          status : checkStatus(RLBstatus) ,
          timeOn : "00:00",
          timeOff : '00:00'
        }
      ]
      axios.post('/api/cabin/relay/update', {
        _idProject :_idProject,
        arrayRelay :arrayRelayBManual
     })
      .then(function (res) {
        var Res = res.data
         if(Res.status){
          checkRLStatus(RLBstatus) ? setRLBstatus("off") :setRLBstatus('on')
         }
      })
      clientMQTT.publish(topic,payload)
    };

    /**
     * Publish MQTT mode Auto
     */

    const onClickRLAauto = () => {
      if( (RLAoffTime !==" ") &&(RLAonTime !==" ")){
        var payload = "&RLAmode"+ "=" + RLAmode + "&"+ "RLAonTime"+"=" + RLAonTime+":00"+"&"+"RLAoffTime"+"=" + RLAoffTime+":00"+"&";
        let arrayRLA_Auto =[
          {
            name :'RLA',
            mode :RLAmode,
            status : "off" ,
            timeOn :RLAonTime,
            timeOff :RLAoffTime
          } ,
          {
            name :'RLB',
            mode :RLBmode,
            status : "off" ,
            timeOn :RLBonTime,
            timeOff :RLBoffTime
          }
        ]
        axios.post('/api/cabin/relay/update', {
          _idProject :_idProject,
          arrayRelay :arrayRLA_Auto
       })
        .then(function (res) {
          var Res = res.data
           if(Res.status){
            setRLAstatus("off") 
           }
        })
        clientMQTT.publish(topic,payload)
      }
      else
      {
        alert("RLAonTime or RLAoffTime don't value !")
      }
    }
    const onClickRLBauto = () => {
      if( (RLBoffTime !==" ") && (RLBonTime !==" ")){
        var payload = "&RLBmode"+ "=" + RLBmode + "&"+ "RLBonTime"+"=" + RLBonTime+":00"+"&"+"RLBoffTime"+"=" + RLBoffTime+":00"+"&";
        let arrayRLB_Auto =[
          {
            name :'RLA',
            mode :RLAmode,
            status : "off" ,
            timeOn :RLAonTime,
            timeOff :RLAoffTime
          } ,
          {
            name :'RLB',
            mode :RLBmode,
            status : "off" ,
            timeOn :RLBonTime,
            timeOff :RLBoffTime
          }
        ]
        axios.post('/api/cabin/relay/update', {
          _idProject :_idProject,
          arrayRelay :arrayRLB_Auto
       })
        .then(function (res) {
          var Res = res.data
           if(Res.status){
            setRLBstatus("off") ;
           }
        })
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

   //Init Role
   useEffect(() => {
     if(_idProject !==null){
      axios.post('/api/cabin/relay/info', {_idProject :_idProject})
      .then(function (res) {
        var Res = res.data
        console.log(Res)
        if(Res.success){
          if(Res.status)
          {
            setRLAmode(Res.dataRelay[0].mode)
            setRLBmode(Res.dataRelay[1].mode)
            setRLAstatus(Res.dataRelay[0].status)
            setRLBstatus(Res.dataRelay[1].status)
            let onTimeRLA = Res.dataRelay[0].timeOn
            let offTimeRLA = Res.dataRelay[0].timeOff
            let onTimeRLB = Res.dataRelay[1].timeOn
            let offTimeRLB =Res.dataRelay[1].timeOff
            setRLAonTime(onTimeRLA)
            setRLAoffTime( offTimeRLA)
            setRLBonTime(onTimeRLB)
            setRLBoffTime(offTimeRLB)
          }
        }
       
      })
     }
    
   }, [_idProject])
   
   

  useLayoutEffect(() => {
     //Mode
      RLmodeA =="auto" ? setRLAmode("auto"): setRLAmode('manual')
      RLmodeB =="auto" ? setRLBmode("auto"): setRLBmode('manual')
      //Status 
      RLstatusA =="on" ? setRLAstatus("on") : setRLAstatus("off")
      RLstatusB =="on" ? setRLBstatus("on") : setRLBstatus("off")
    
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
                <input className="form-control shadow-none rounded-0 d-inline" type="time" name="RLAonTime"  value={RLAonTime} onChange={handleChangeRLAonTime}/>
                <input className="form-control shadow-none rounded-0 d-inline m-l-10 m-r-10" type="time" name="RLAoffTime"  value={RLAoffTime} onChange={handleChangeRLAoffTime}/>
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
                 <input className="form-control shadow-none rounded-0 d-inline" type="time" name="RLBonTime"  value={RLBonTime} onChange={handleChangeRLBonTime}/>
                <input className="form-control shadow-none rounded-0 d-inline m-l-10 m-r-10" type="time" name="RLBoffTime"  value={RLBoffTime} onChange={handleChangeRLBoffTime}/>
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
