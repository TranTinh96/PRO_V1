import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {limitData} from "../../../services/fucServices"

function ChartLine_Fre(props) {
  var [series, setSeries] = useState([
    {
      name: "series1",
      data: [],
    },
  ]);
  var [options, setOptions] = useState({
    chart: {
      type: "line",
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      style: {
        fontSize: "11px",
        fontFamily: "Open Sans,sans-serif",
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
  });
  useEffect(() => {

    setSeries([{
          name: props.name,
          data: limitData(props.dataArray,6,props.data)
      }]
    )

  }, [props])
  return (
    <div className="chart-container">
      <ReactApexChart
        options={options}
        series={series}
        height={30}
        width={150}
      />
    </div>
  );
}
export default ChartLine_Fre;
