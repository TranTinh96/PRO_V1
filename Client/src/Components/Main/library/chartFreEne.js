import React ,{useEffect} from "react";
import CharLine_Ene from "../library/charLine/chartLine_Ene";
import CharLine_Fre from "../library/charLine/chartLine_Fre";

function ChartFreEne(props) {
  return (
    <div className="table-chartFreEne-container">
      <table className="table table-striped table-chartFreEne" responsive>
        <tbody className="my-tbody">
          <tr>
            <td className="table-chartFreEne-name">
              <div className="badge-chartFreEne"></div>
               <p >ENERGY</p>
              </td>
            <td className="table-chartFreEne-chart">
              <CharLine_Ene name='KW' dataArray ={props.KWHArray}  />
            </td>
            <td className="table-chartFreEne-value">{props.KWH}</td>
            <td className="table-chartFreEne-unit">kWH</td>
          </tr>
          <tr>
            <td className="table-chartFreEne-name">
              <div className="badge-chartFreEne"></div>
               <p >FREQUENCY</p>
            </td>
            <td className="table-chartFreEne-chart">
              <CharLine_Fre name='Hz' dataArray ={props.FArray}/>
            </td>
            <td className="table-chartFreEne-value">{props.F}</td>
            <td className="table-chartFreEne-unit">Hz</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ChartFreEne;
