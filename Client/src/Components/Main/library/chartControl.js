import React,{useState ,useEffect}from "react";
import Switch from "react-switch";
import {useSelector ,useDispatch} from 'react-redux';
import { Button } from 'antd';
import onLight from "../../../assets/Image/light/on.png"
import offLight from "../../../assets/Image/light/off.png"



function ChartControl(props) {
    var clientMQTT= props.clientMQTT
    const role = useSelector((state) => state.setUserJWT).users.role;
    const [isRelayA, setIsRelayA] = useState(true)
    const [isRelayB, setIsRelayB] = useState(true)
    const [isModeRelayA, setIsModeRelayA] = useState(true)
    const [isModeRelayB, setIsModeRelayB] = useState(false)
  
    const handleChangeRelayA = () => {
      clientMQTT.publish('presence', 'Hello mqtt Tran Tinh')
      setIsRelayA(!isRelayA)
    };
    const handleChangeRelayB = () => {
      setIsRelayB(!isRelayB)
    };
    const handleChangeModeRelayA = () => {
      setIsModeRelayA(!isModeRelayA)
    };
    const handleChangeModeRelayB = () => {
      setIsModeRelayB(!isModeRelayB)
    };
     const [isDisable , setIsDisable]= useState(false)
  //useEffect
   useEffect(() => {
     console.log(role +":"+isDisable)
      if(role =="User")
      {
        setIsDisable(true);
      }
     
   }, [role])
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
                {isRelayA ? <img  src={onLight} alt="Joseph" className="img-light-on" />:   <img  src={offLight} alt="Joseph" className="img-light-off" />}
            </td>
          
            <td className="table-chartFreEne-mode">
              <Switch
                  checked={isModeRelayA}
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
            {isModeRelayA ? 
            <td className="table-chartControl-auto">
                <input className="form-control shadow-none rounded-0 d-inline" type="time"/>
                <input className="form-control shadow-none rounded-0 d-inline m-l-10 m-r-10" type="time"/>
                <Button type="primary" type="dashed">SET</Button>
            </td>
            :
            <td className="table-chartControl-manual">
              <Switch
                checked={isRelayA}
                onChange={handleChangeRelayA}
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
                {isRelayB ? <img  src={onLight} alt="Joseph" className="img-light-on" />:   <img  src={offLight} alt="Joseph" className="img-light-off" />}
            </td>
            <td className="table-chartFreEne-mode">
              <Switch
                    checked={isModeRelayB}
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
            {isModeRelayB?
            <td className="table-chartControl-auto">
                <input className="form-control shadow-none rounded-0 d-inline" type="time"/>
                <input className="form-control shadow-none rounded-0 d-inline m-l-10 m-r-10" type="time"/>
                <Button type="primary" type="dashed">SET</Button>
            </td>
            :
            <td className="table-chartControl-manual">
            <Switch
                checked={isRelayB}
                onChange={handleChangeRelayB}
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
