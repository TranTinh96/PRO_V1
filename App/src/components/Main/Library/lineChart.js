import React from 'react'
import { LineChart  } from "react-native-chart-kit";
import {limitData}  from "../../services/fucService"

import {Dimensions,View,StyleSheet,Text}  from "react-native"
function Line(props) {
    return (
        <View style={styles.containerCard}>
            <Text style={styles.textHeader}>CURRENT - {props.name} ( A )</Text>
            <LineChart
                data={{
                    labels: ["January", "February", "March", "April", "May", "June"],
                    datasets: [
                        {
                            data: props.dataArray
                        }
                    ]
                }}
                width={Dimensions.get("window").width-40} // from react-native
                height={225}
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
                        
                        borderRadius: 10
                    },
                    propsForDots: {
                        r: "3",
                        strokeWidth: "2",
                        stroke: "red"
                    }
                }}
                bezier //Cong va muon hơn
                style={{
                    borderRadius: 10,
                }}
            />
        </View>
    )
}

export default Line


const styles = StyleSheet.create({
    containerCard:{
        backgroundColor:"#FFF",
        margin:8,
        borderRadius:10,
    },
    textHeader:{
        marginLeft: 15,
        fontFamily: "OpenSans-Bold",
        fontSize:14,
        marginTop: 15,
        marginBottom:15,
        color:"#E48762",
    },
    
})