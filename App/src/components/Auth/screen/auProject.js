import React, { useState, useEffect } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { View, Text, StatusBar, Image, TextInput, ScrollView } from "react-native"
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios"
import { checkNull } from "../../services/fucService"
import styles from "../../../assets/formCss"


function AuProject() {
    var projectID = useSelector(state => state.projectID);
    //Value
    const [tokenID, setTokenID] = useState()
    const [errProject, setErrProject] = useState()
    //THEM
    const { colors } = useTheme();
    //Navigator
    const navigation = useNavigation();
    //Redux
    const dispatch = useDispatch();
    //Submit
    const onSubmit = () => {
        axios.post('/profile/register/token-project', { tokenID: tokenID })
            .then(res => {
                var resData = res.data
                if (resData.success) {
                    dispatch({
                        type: "PROJECT_ID",
                        projectID: resData.projectID
                    })
                    setErrProject(" ")
                    navigation.navigate('Register')

                } else {
                    setErrProject("You Incorrect . Please Enter Project ID Again")
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    useEffect(() => {
        if (!checkNull(projectID))
            navigation.navigate('Signup')
        return () => {

        }
    }, [])
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <Animatable.View
                style={[styles.mainRegister, {

                }]}
                animation="fadeInDownBig"
            >
                <View style={styles.formContainer} >
                    <View>
                        <MaterialIcons name="keyboard-backspace" size={27} color="#01ab9d" style={styles.loginLink} onPress={() => navigation.navigate('Home')} />
                        <Text style={styles.textLogin}>TOKEN</Text>
                        <Text style={styles.textinfoLogin}>Please enter TOKEN ID project. </Text>
                    </View>
                    <View style={styles.loginFormContanier}>
                        <View style={styles.LoginContanier}>
                            <View style={styles.formCenter} >
                                <Image source={require("../../../assets/image/backgroud_login_2.png")}
                                    resizeMode="stretch"
                                    style={styles.formImage} />
                            </View>

                            <View style={{ marginTop: 30, position: "relative" }}>
                                <TextInput style={styles.inputForm03} autoCompleteType="name" onChangeText={(text) => setTokenID(text)} placeholder="Enter your token project"></TextInput>
                                <Text style={styles.textValidtion}>{errProject}</Text>
                            </View>
                            <View style={styles.borderCenter}>
                                <Button
                                    icon={
                                        <Icon
                                            name="arrow-right"
                                            size={20}
                                            color="white"
                                        />
                                    }
                                    type="outline"
                                    titleStyle={{
                                        fontFamily: "Montserrat-Bold",
                                        color: "white",
                                        fontSize: 14,
                                    }}
                                    buttonStyle={{
                                        borderRadius: 6,
                                        backgroundColor: "#15c39a",
                                        height: 50,
                                        marginTop: 10,
                                        width: 50,
                                        borderRadius: 25,

                                    }}
                                    onPress={onSubmit}
                                />
                            </View>
                        </View>
                    </View>
                </View>


            </Animatable.View>
            <View style={styles.screenSecondRegister}>
                <View style={styles.formLinkSign}>
                    <View style={styles.formCenter}>
                        <View style={styles.formLinkAuth}>
                            <Text style={styles.textExiting}>Exitings user ?</Text>
                            <Text style={styles.textLink} onPress={() => navigation.navigate('Login')}>Login Now </Text>
                        </View>
                    </View>
                </View>

            </View>

        </ScrollView>
    )
}



export default AuProject;
