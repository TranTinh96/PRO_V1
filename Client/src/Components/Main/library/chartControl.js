import React,{useState}from "react";
import Switch from '@material-ui/core/Switch';
import onLight from "../../../assets/Image/light/on.png"
import offLight from "../../../assets/Image/light/off.png"



function ChartControl() {
    const [state, setState] = React.useState({
      isRelayA: true,
      isRelayB: true,
    });
    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };
    
  return (
    <div className="table-chartFreEne-container">
      <table className="table table-striped table-chartFreEne table-chartControl" responsive>
        <thead>
          <tr>
            <th scope="col">RELAY</th>
            <th scope="col">STATUS</th>
            <th scope="col">MODE</th>
            <th scope="col">AUTO</th>
            <th scope="col">MANUAL</th>
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
                {state.isRelayA ? <img  src={onLight} alt="Joseph" className="img-light-on" />:   <img  src={offLight} alt="Joseph" className="img-light-off" />}
            </td>
            <td className="table-chartFreEne-mode">
              <button className="btn btn-primary shadow-none rounded-0 btn-mode">AUTO</button>
              <button className="btn btn-primary shadow-none rounded-0 btn-mode btn-manual"> MANUAL</button>
            </td>
            <td className="table-chartControl-auto">
                <input class="form-control shadow-none rounded-0 d-inline" type="time"/>
                <input class="form-control shadow-none rounded-0 d-inline m-l-10" type="time"/>
                <button className="btn btn-success shadow-none rounded-0 btn-mode btn-auto">SET</button>
            </td>
            <td className="table-chartControl-manual">
              <Switch
                checked={state.isRelayA}
                onChange={handleChange}
                size="small"
                color="primary"
                name="isRelayA"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </td>
          </tr>
          {/* Relay B  */}
          <tr>
            <td className="table-chartFreEne-name">
              <div className="badge-chartFreEne"></div>
              <p>RELAY B</p>
            </td>
            <td className="table-chartFreEne-status">
                {state.isRelayB ? <img  src={onLight} alt="Joseph" className="img-light-on" />:   <img  src={offLight} alt="Joseph" className="img-light-off" />}
            </td>
            <td className="table-chartFreEne-mode">
              <button className="btn btn-primary shadow-none rounded-0 btn-mode">AUTO</button>
              <button className="btn btn-primary shadow-none rounded-0 btn-mode btn-manual"> MANUAL</button>
            </td>
            <td className="table-chartControl-auto">
                <input className="form-control shadow-none rounded-0 d-inline" type="time"/>
                <input className="form-control shadow-none rounded-0 d-inline m-l-10" type="time"/>
                <button className="btn btn-success shadow-none rounded-0 btn-mode btn-auto">SET</button>
            </td>
            <td className="table-chartControl-manual">
              <Switch
                checked={state.isRelayB}
                onChange={handleChange}
                size="small"
                color="secondary"
                name="isRelayB"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ChartControl;
