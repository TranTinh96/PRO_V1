import React, { useState } from 'react'
import { Text, View, StyleSheet, Dimensions, SafeAreaView, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';

//Height , Width Screen
const { width, height } = Dimensions.get("screen")

function Map() {
    const [lat, setLat] = useState(10.773558)
    const [lgn, setLgn] = useState(106.659476)
    _zoomIn = () => {

    }

    _zoomOut = () => {


    }
    return (
        <SafeAreaView style={styles.container}>
           <StatusBar backgroundColor='#1F9EFF' barStyle="light-content" />
                <MapView style={styles.mapView}
                    provider={PROVIDER_GOOGLE}
                    mapType="standard"
                    ref={ref => this.map = ref}
                    zoomEnabled={true}
                    initialRegion={{
                        latitude: lat,
                        longitude: lgn,
                        latitudeDelta: 0.25,
                        longitudeDelta: 0.25 * (width / height),
                    }} >
                    <Marker coordinate={{ latitude: lat, longitude: lgn }} title="Back Khoa University" />
                </MapView>
                <View style={styles.buttonZoom} >
                    <Button
                        icon={
                            <Icon
                                name="zoom-in"
                                size={20}
                                color="white"
                            />
                        }
                        buttonStyle={{
                            borderWidth: 0,
                            borderRadius: 6,
                            backgroundColor: "#727CF5"
                        }}
                        onPress={this._zoomIn}
                    />
                    <Button
                        icon={
                            <Icon
                                name="zoom-out"
                                size={20}
                                color="white"
                            />
                        }
                        buttonStyle={{
                            borderWidth: 0,
                            borderRadius: 6,
                            marginTop: 5,
                            backgroundColor: "#727CF5"

                        }}
                        onPress={this._zoomOut}
                    />
                </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',


    },
    mapView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    buttonZoom: {
        position: 'absolute',
        bottom: 10,
        right: 10
    }


})

export default Map
