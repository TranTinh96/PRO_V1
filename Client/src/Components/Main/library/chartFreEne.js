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
              <CharLine_Ene name='KW' data={props.KWH} dataArray ={[25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]}  />
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
              <CharLine_Fre name='F' data={props.Frequcency} dataArray ={[50, 50, 49, 48, 52, 55]}/>
            </td>
            <td className="table-chartFreEne-value">{props.Frequcency}</td>
            <td className="table-chartFreEne-unit">F</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ChartFreEne;
