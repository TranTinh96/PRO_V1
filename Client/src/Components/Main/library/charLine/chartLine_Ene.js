import React ,{ useEffect ,useState }from 'react'
import ReactApexChart from "react-apexcharts";

function ChartLine_Ene() {
  var [series, setSeries] = useState([
    {
      name: "series1",
      data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
    },
  ]);
  var [options, setOptions] = useState({
    chart: {
      type: 'bar',
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '70%'
      }
    },
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    xaxis: {
      crosshairs: {
        width: 1
      },
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      style: {
        fontSize: "11px",
        fontFamily: "Open Sans,sans-serif",
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return ''
          }
        }
      },
      marker: {
        show: false
      }
    }
  });
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div className="chart-container">
      <ReactApexChart
        type="bar"
        options={options}
        series={series}
        height={30}
        width={150}
      />
    </div>
  );
}
export default ChartLine_Ene;

