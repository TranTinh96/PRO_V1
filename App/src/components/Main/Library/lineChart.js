import React from 'react'
import { LineChart  } from "react-native-chart-kit";
import {Dimensions,View,Text}  from "react-native"
function Line(props) {
    return (
        <View>
            <LineChart
                data={{
                    labels: ["January", "February", "March", "April", "May", "June"],
                    datasets: [
                        {
                            data: props.data
                        }
                    ]
                }}
                width={Dimensions.get("window").width-42} // from react-native
                height={230}
                yAxisLabel=" "
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                withInnerLines={false} //Lưới bên trong
                withOuterLines={false} //Lưới bên ngoài
                withVerticalLabels={false} //Hiển thị lable ngang
                
                chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color:(opacity = 0) => `rgba(255,0,0, ${opacity})`,
                    labelColor:(opacity = 0) => `rgba(0,0,0, ${opacity})`,
                    fillShadowGradient :"#3777FF",//Màu vùng dưới dữ liệu
                    fillShadowGradientOpacity:0.08, //độ mờ vùng dưới dữ liệu
                    style: {
                        marginVertical:8,
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "3",
                        strokeWidth: "2",
                        stroke: "red"
                    }
                }}
                bezier //Cong va muon hơn
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </View>
    )
}

export default Line
