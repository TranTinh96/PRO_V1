import React, { useState, useEffect } from 'react'
import { useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { Text, View, ScrollView, Dimensions, SafeAreaView, StatusBar } from 'react-native';
import ProgressCirclee from 'react-native-progress-circle'
import Header from '../Library/mHeaderHome';
import styles from "../../../assets/dashboardCss"
import LineChart from "../Library/lineChart"
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
                <Animatable.View
                    style={[styles.main]}
                    animation="fadeInLeft"
                >
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
                                    <LineChart />
                                </View>
                                <View style={styles.slide2}>
                                    <Text style={styles.text}>Beautiful</Text>
                                </View>
                                <View style={styles.slide3}>
                                    <Text style={styles.text}>And simple</Text>
                                </View>
                            </Swiper>

                        </View>
                        <Text style={styles.containerHeader}>Statistics</Text>
                        <View style={styles.screenBetween}>
                            <View style={styles.screenDataOne}>
                                <View style={styles.progressContainer}>
                                    <ProgressCirclee
                                        percent={30}
                                        radius={30}
                                        borderWidth={3}
                                        color="#FCAF45"
                                        shadowColor="#FFF"
                                        bgColor="#fff"

                                    >
                                        <Text style={styles.textprogress}>{'30'}</Text>
                                    </ProgressCirclee>

                                </View>
                                <View>
                                    <Text style={styles.textHeader}>V</Text>
                                    <Text style={styles.textContent}>Sơ cấp </Text>
                                </View>
                            </View>
                            <View style={styles.screenDataTwo}>
                                <View style={styles.progressContainer}>
                                    <ProgressCirclee
                                        percent={30}
                                        radius={30}
                                        borderWidth={3}
                                        color="#2180FD"
                                        shadowColor="#ECECEC"
                                        bgColor="#fff"

                                    >
                                        <Text style={styles.textprogress}>{'30'}</Text>
                                    </ProgressCirclee>

                                </View>
                                <View>
                                    <Text style={styles.textHeader}>V</Text>
                                    <Text style={styles.textContent}>Thứ cấp </Text>
                                </View>

                            </View>
                        </View>
                        <View style={[styles.screenBetween, styles.paddingScreen]}>
                            <View style={styles.screenDataOne}>
                                <View style={styles.progressContainer}>
                                    <ProgressCirclee
                                        percent={30}
                                        radius={30}
                                        borderWidth={3}
                                        color="#63D471"
                                        shadowColor="#ECECEC"
                                        bgColor="#fff"

                                    >
                                        <Text style={styles.textprogress}>{'30'}</Text>
                                    </ProgressCirclee>

                                </View>
                                <View>
                                    <Text style={styles.textHeader}>I </Text>
                                    <Text style={styles.textContent}>Sơ cấp </Text>
                                </View>
                            </View>
                            <View style={styles.screenDataTwo}>
                                <View style={styles.progressContainer}>
                                    <ProgressCirclee
                                        percent={30}
                                        radius={30}
                                        borderWidth={3}
                                        color="#9381FF"
                                        shadowColor="#ECECEC"
                                        bgColor="#fff"

                                    >
                                        <Text style={styles.textprogress}>{'30'}</Text>
                                    </ProgressCirclee>

                                </View>
                                <View>
                                    <Text style={styles.textHeader}>I </Text>
                                    <Text style={styles.textContent}>Thứ cấp </Text>
                                </View>
                            </View>
                        </View>

                    </View>
                </Animatable.View>

            </ScrollView>

        </SafeAreaView>
    )
}

export default Home
