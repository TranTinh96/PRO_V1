import React from "react";

function DataTableSummary(props) {
  if(props.modeTime ==="readTime")
  {
    return (
      <div className="table-data-container" id="style-7">
        <table className="table table-fixed" responsive>
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">VOLTAGE (VLN)</th>
              <th scope="col">VOLTAGE (VLL)</th>
              <th scope="col">CURRENT (I) </th>
              <th scope="col">ACTIVE POWER (KW)</th>
              <th scope="col">REACTIVE POWER (KVAR)</th>
              <th scope="col">APPARENT POWER (KVA)</th>
              <th scope="col">POWER FACTOR (PF)</th>
              <th scope="col">FREQUENCY (Hz)</th>
              <th scope="col">ENERGY (KWH)</th>
            </tr>
          </thead>
          <tbody className="my-tbody">
            {
              props.summaryData.map((data ,index)=>{
                return(
                <tr>
                  <td>{index}</td>
                  <td>{data.VLN}</td>
                  <td>{data.VLL}</td>
                  <td>{data.I}</td>
                  <td>{data.KW}</td>
                  <td>{data.KVA}</td>
                  <td>{data.KVAR}</td>
                  <td>{data.PF}</td>
                  <td>{data.F}</td>
                  <td>{data.KWH}</td>
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
            <th scope="col">VOLTAGE (VLN)</th>
            <th scope="col">VOLTAGE (VLL)</th>
            <th scope="col">CURRENT (I) </th>
            <th scope="col">ACTIVE POWER (KW)</th>
            <th scope="col">REACTIVE POWER (KVAR)</th>
            <th scope="col">APPARENT POWER (KVA)</th>
            <th scope="col">POWER FACTOR (PF)</th>
            <th scope="col">FREQUENCY (Hz)</th>
            <th scope="col">ENERGY (KWH)</th>
            <th scope="col">TIME</th>
          </tr>
        </thead>
        <tbody className="my-tbody">
          {
            props.summaryData.map((data ,index)=>{
              return(
              <tr>
                <td>{index}</td>
                <td>{data.VLN}</td>
                <td>{data.VLL}</td>
                <td>{data.I}</td>
                <td>{data.KW}</td>
                <td>{data.KVA}</td>
                <td>{data.KVAR}</td>
                <td>{data.PF}</td>
                <td>{data.F}</td>
                <td>{data.KWH}</td>
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

export default DataTableSummary;
