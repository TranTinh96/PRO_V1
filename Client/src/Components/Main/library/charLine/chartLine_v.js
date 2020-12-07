import React ,{ useEffect ,useState }from 'react'
import ReactApexChart from "react-apexcharts";

function ChartLine_v() {

    var [series,setSeries] = useState([
        {
            name: 'series1',
            data: [220, 1000,100 ,50,100, 300]
        }])
    var [options, setOptions] = useState({
      chart: {
        height:50,
        width :"100%",
        type: "area",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      grid: {
        show: true,
        borderColor: "#90A4AE",
        strokeDashArray: 0,
        position: "back",
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        row: {
          colors: undefined,
          opacity: 0.5,
        },
        column: {
          colors: undefined,
          opacity: 0.5,
        },
      },
      yaxis: {
        show: false,
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
    });
    useEffect(() => {
   
        
        return () => {
           
            
        }
    }, [])
  return(
    <div className="chart-container">
        <ReactApexChart options={options} series={series} type="area" />
    </div>
  )
}
export default ChartLine_v;

