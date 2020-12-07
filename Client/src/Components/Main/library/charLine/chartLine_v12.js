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
        height: 100,
        type: 'area',
        sparkline: {
          enabled: true
        },
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        style: {
          fontSize: '10px',
          fontFamily: "Poppins,sans-serif"
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: () =>"",
         },
         },
      },
      marker: {
        show: false
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        opacity: 0.3,
      },
      yaxis: {

        min:0
      },
      
    });
    useEffect(() => {
   
        
        return () => {
           
            
        }
    }, [])
  return(
    <div className="chart-container">
        <ReactApexChart options={options} series={series} type="area" height={50} />
    </div>
  )
}
export default ChartLine_v;

