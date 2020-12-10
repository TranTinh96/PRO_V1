import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

function ChartLine_Fre() {
  var [series, setSeries] = useState([
    {
      name: "series1",
      data: [220, 1000, 100, 50, 100, 300],
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
    return () => {};
  }, []);
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