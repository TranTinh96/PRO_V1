import React from "react";

function DataTablePhase2(props) {
  if(props.modeTime ==="readTime"){
    return (
      <div className="table-data-container" id="style-7">
        <table className="table table-fixed" responsive>
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">LINE - NEUTRAL (V2N)</th>
              <th scope="col">LINE - LINE (V23)</th>
              <th scope="col">CURRENT (I2)</th>
              <th scope="col">ACTIVE POWER (KW2)</th>
              <th scope="col">REACTIVE POWER (KVAR2)</th>
              <th scope="col">APPARENT POWER (KVA2)</th>
              <th scope="col">POWER FACTOR (PF2)</th>
              <th scope="col">TIME</th>
            </tr>
          </thead>
          <tbody className="my-tbody">
          {
              props.phaseTwoData.map((data ,index)=>{
                return(
                <tr>
                  <td>{index}</td>
                  <td>{data.V2N}</td>
                  <td>{data.V23}</td>
                  <td>{data.I2}</td>
                  <td>{data.KW2}</td>
                  <td>{data.KVA2}</td>
                  <td>{data.KVAR2}</td>
                  <td>{data.PF2}</td>
                  <td>{data.timeCreate}</td>    
                </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className="table-data-container" id="style-7">
      <table className="table table-fixed" responsive>
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">LINE - NEUTRAL (V2N)</th>
            <th scope="col">LINE - LINE (V23)</th>
            <th scope="col">CURRENT (I2)</th>
            <th scope="col">ACTIVE POWER (KW2)</th>
            <th scope="col">REACTIVE POWER (KVAR2)</th>
            <th scope="col">APPARENT POWER (KVA2)</th>
            <th scope="col">POWER FACTOR (PF2)</th>
          </tr>
        </thead>
        <tbody className="my-tbody">
        {
            props.phaseTwoData.map((data ,index)=>{
              return(
              <tr>
                <td>{index}</td>
                <td>{data.V2N}</td>
                <td>{data.V23}</td>
                <td>{data.I2}</td>
                <td>{data.KW2}</td>
                <td>{data.KVA2}</td>
                <td>{data.KVAR2}</td>
                <td>{data.PF2}</td>
              </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default DataTablePhase2;
