import React from 'react'
import { LineChart  } from "react-native-chart-kit";
import {Dimensions,View,Text}  from "react-native"
function Line() {
    return (
        <View>
            <LineChart
                data={{
                    labels: ["January", "February", "March", "April", "May", "June"],
                    datasets: [
                        {
                            data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100
                            ]
                        }
                    ]
                }}
                width={Dimensions.get("window").width-42} // from react-native
                height={220}
                yAxisLabel=" "
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                withInnerLines={false} //Lưới bên trong
                withOuterLines={false} //Lưới bên ngoài
                withVerticalLabels={false} //Hiển thị lable ngang
                
                chartConfig={{
                    backgroundColor: "#cee3f9",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(252,175,69, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(55,119,255, ${opacity})`,
                    fillShadowGradient :"#3777FF",//Màu vùng dưới dữ liệu
                    fillShadowGradientOpacity:0.08, //độ mờ vùng dưới dữ liệu
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
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
