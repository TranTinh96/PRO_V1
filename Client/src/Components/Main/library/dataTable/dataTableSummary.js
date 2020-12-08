import React from "react";

function DataTableSummary() {
  return (
    <div className="table-data-container" id="style-7">
      <table className="table table-striped table-fixed" responsive>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">VOLTAGE LINE - NEUTRAL</th>
            <th scope="col">VOLTAGE LINE - LINE</th>
            <th scope="col">CURRENT</th>
            <th scope="col">ACTIVE POWER</th>
            <th scope="col">REACTIVE POWER</th>
            <th scope="col">APPARENT POWER</th>
            <th scope="col">POWER FACTOR</th>
            <th scope="col">FREQUENCY</th>
            <th scope="col">ENERGY</th>
          </tr>
        </thead>
        <tbody className="my-tbody">
          
        </tbody>
      </table>
    </div>
  );
}

export default DataTableSummary;
