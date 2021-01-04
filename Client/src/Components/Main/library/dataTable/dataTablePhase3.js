import React from "react";


function DataTablePhase3(props) {
 
  return (
    <div className="table-data-container" id="style-7">
      <table className="table table-fixed" responsive>
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">LINE - NEUTRAL (V3N)</th>
            <th scope="col">LINE - LINE (V31)</th>
            <th scope="col">CURRENT (I3)</th>
            <th scope="col">ACTIVE POWER (KW3)</th>
            <th scope="col">REACTIVE POWER (KVAR3)</th>
            <th scope="col">APPARENT POWER (KVA3)</th>
            <th scope="col">POWER FACTOR (PF3)</th>
          </tr>
        </thead>
        <tbody className="my-tbody">
        {
            props.phaseThreeData.map((data ,index)=>{
              return(
              <tr>
                <td>{index}</td>
                <td>{data.V3N}</td>
                <td>{data.V31}</td>
                <td>{data.I3}</td>
                <td>{data.KW3}</td>
                <td>{data.KVA3}</td>
                <td>{data.KVAR3}</td>
                <td>{data.PF3}</td>
              </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default DataTablePhase3;
