import React from "react";

function DataTablePhase1(props) {
  if(props.modeTime ==="readTime"){
    return (
      <div className="table-data-container" id="style-7">
        <table className="table table-fixed" responsive>
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">LINE - NEUTRAL (V1N)</th>
              <th scope="col">LINE - LINE (V12)</th>
              <th scope="col">CURRENT (I1)</th>
              <th scope="col">ACTIVE POWER (KW1)</th>
              <th scope="col">REACTIVE POWER (KVAR1)</th>
              <th scope="col">APPARENT POWER (KVA1)</th>
              <th scope="col">POWER FACTOR (PF1)</th>
            </tr>
          </thead>
          <tbody className="my-tbody">
          {
              props.phaseOneData.map((data ,index)=>{
                return(
                <tr>
                  <td>{index}</td>
                  <td>{data.V1N}</td>
                  <td>{data.V12}</td>
                  <td>{data.I1}</td>
                  <td>{data.KW1}</td>
                  <td>{data.KVA1}</td>
                  <td>{data.KVAR1}</td>
                  <td>{data.PF1}</td>
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
            <th scope="col">LINE - NEUTRAL (V1N)</th>
            <th scope="col">LINE - LINE (V12)</th>
            <th scope="col">CURRENT (I1)</th>
            <th scope="col">ACTIVE POWER (KW1)</th>
            <th scope="col">REACTIVE POWER (KVAR1)</th>
            <th scope="col">APPARENT POWER (KVA1)</th>
            <th scope="col">POWER FACTOR (PF1)</th>
            <th scope="col">TIME</th>
          </tr>
        </thead>
        <tbody className="my-tbody">
        {
            props.phaseOneData.map((data ,index)=>{
              return(
              <tr>
                <td>{index}</td>
                <td>{data.V1N}</td>
                <td>{data.V12}</td>
                <td>{data.I1}</td>
                <td>{data.KW1}</td>
                <td>{data.KVA1}</td>
                <td>{data.KVAR1}</td>
                <td>{data.PF1}</td>
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

export default DataTablePhase1;
