import React ,{ useEffect ,useState }from 'react'
import ReactApexChart from "react-apexcharts";


function ChartLine(props) {
    
    var [series,setSeries] = useState([
        {
            name: ' ',
            data: []
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
          fontSize: '11px',
          fontFamily: "Open Sans,sans-serif"

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

      setSeries([{
            name: props.name,
            data: props.data
        }]
      )

    }, [props])
  return(
    <div className="chart-container">
        <ReactApexChart options={options} series={series} type="area" height={50} />
    </div>
  )
}
export default ChartLine;

