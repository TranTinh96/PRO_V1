import React, { useState, useEffect } from 'react'
import { useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { Text, View, ScrollView, Dimensions, SafeAreaView, StatusBar } from 'react-native';
import ProgressCirclee from 'react-native-progress-circle'
import Header from '../Library/mHeaderHome';
import styles from "../../../assets/dashboardCss"
import LineChart_Itb from "../Library/electric/lineChart_itb"
import LineChart_I1 from "../Library/electric/lineChart_i1"
import LineChart_I2 from "../Library/electric/lineChart_i2"
import LineChart_I3 from "../Library/electric/lineChart_i3"

import Swiper from 'react-native-swiper'


const { width, height } = Dimensions.get("screen")

function Home() {
    const [valueOne, setValueOne] = useState(0)

    //RETURN
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='#1F9EFF' barStyle="light-content" />
            <Header name="MY HOME" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Animatable.View style={[styles.main]} animation="fadeInLeft">
                    <View style={styles.formContainer}>
                        <Text style={styles.containerHeader2}>Chart</Text>
                        <View style={styles.screenChart}>
                            <Swiper style={styles.wrapper}
                                showsButtons={false}
                                autoplay={true}
                                autoplayTimeout={10}
                                width={width - 40}
                                height={250}
                                index={0}
                                dotStyle={{
                                    backgroundColor:"#B3FAEB",
                                    padding:4,
                                    marginTop:20 ,
                                    borderRadius:10,
                                    
                                }}
                                activeDotStyle={{
                                    backgroundColor:"#FFF",
                                    marginTop:20,
                                    borderWidth:2,
                                    borderColor:"#0074FE",
                                    padding:5,
                                    borderRadius:10,
                                }}
                            >
                                <View style={styles.slide1}>
                                    <LineChart_Itb/>
                                </View>
                                <View style={styles.slide2}>
                                    <LineChart_I1/>
                                </View>
                                <View style={styles.slide3}>
                                    <LineChart_I2/>
                                </View>
                                <View style={styles.slide4}>
                                    <LineChart_I3/>
                                </View>
                            </Swiper>

                        </View>
                        <Text style={styles.containerHeader}>Statistics</Text>
                        <View style={styles.screenBetween}>
                           
                        </View>

                    </View>
                </Animatable.View>

            </ScrollView>

        </SafeAreaView>
    )
}

export default Home
