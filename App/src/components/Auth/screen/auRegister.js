import React, { useState, useEffect } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, StatusBar, TextInput, Dimensions, ScrollView ,TouchableOpacity} from "react-native"
import Icon from 'react-native-vector-icons/Feather';
import IconFa from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import CheckBox from '@react-native-community/checkbox';
import Modal from "react-native-modalbox"
import styles from "../../../assets/formCss"
import axios from "axios"
import { useSelector } from 'react-redux';
import { checkNull, checkUndefined } from "../../services/fucCheck"


function AuRegister() {

    //THEM
    const { colors } = useTheme();
    //Navigator
    const navigation = useNavigation();
    //Value
    const [temp, setTemp] = useState(false)
    const [userName, setUserName] = useState()
    const [errName, setErrName] = useState()
    const [email, setEmail] = useState()
    const [errEM, setErrEM] = useState()
    const [password, setPassword] = useState()
    const [errPW, setErrPW] = useState()
    const [rePassword, setRePassword] = useState()
    const [errRPW, setErrRPW] = useState()
    const [modalVisible, setModalVisible] = useState(false);
    //Redux
    var projectID = useSelector(state => state.projectID);
    //FUNCTION
    const onSubmit = () => {
        var isUserName = checkUndefined(userName)
        var isEmail = checkUndefined(email)
        var isPasword = checkUndefined(password)
        var isRePasword = checkUndefined(rePassword)
        //User
        if (isUserName) setErrName("Enter a valid Full Name")
        else setErrName(" ")

        //Mail
        if (isEmail) setErrEM("Enter a valid address Email")
        else setErrEM('')
        //Password
        if (isPasword) setErrPW("Enter a valid password")
        else setErrPW(" ")
        //Repassword
        if (isRePasword) setErrRPW("Those password didn't match. Try again")
        else setErrRPW(" ")

        //IF
        if (!isEmail && !isUserName && !isPasword && !isRePasword) {
            if (password == rePassword) {
                var dataUser = {
                    userName: userName,
                    email: email,
                    password: password,
                    project_id: projectID
                }
                axios.post('/profile/register', dataUser)
                    .then(res => {
                        var Res = res.data;
                        if (Res.success && Res.isEmail) {
                            setErrEM(" ")
                            setErrName(" ")
                            setErrPW(" ")
                            setErrName(" ")
                            setModalVisible(true);
                            if (!modalVisible) {
                                navigation.navigate('Login')
                            }
                        } else if (!Res.success && !Res.isEmail) {
                            setErrEM(Res.message)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            else {
                setErrEM(" ")
                setErrPW(" ")
                setErrRPW("Those password didn't match. Try again")
                setErrName(" ")
            }

        }
        //END


    }

    useEffect(() => {
        if (checkNull(projectID))
            navigation.navigate('Project')
        
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
                        <Text style={styles.textLogin}>REGISTER </Text>
                        <Text style={styles.textinfoLogin}>Please register to continue using our app. </Text>
                    </View>
                    <View style={styles.loginFormContanier}>
                        <View style={styles.LoginContanier}>
                            <View style={{ marginTop: 0, position: "relative" }}>
                                <TextInput style={styles.inputForm} autoCompleteType="username" onChangeText={(text) => setUserName(text)} placeholder="Enter your full name"></TextInput>
                                <Icon name="user" size={17} color="#0074FE" style={styles.iconAuth} />
                                <Text style={styles.textValidtion}>{errName}</Text>
                            </View>
                            <View style={{  position: "relative" }}>
                                <TextInput style={styles.inputForm} onChangeText={(text) => setEmail(text)} placeholder="Enter your email"></TextInput>
                                <Icon name="mail" size={17} color="#0074FE" style={styles.iconAuth} />
                                <Text style={styles.textValidtion}>{errEM}</Text>
                            </View>
                            <View style={{ position: "relative" }}>
                                <TextInput style={styles.inputForm} autoCompleteType="password" secureTextEntry={true} onChangeText={(text) => setPassword(text)} placeholder="Enter your password"></TextInput>
                                <Icon name="lock" size={17} color="#0074FE" style={styles.iconAuth} />
                                <Text style={styles.textValidtion}>{errPW}</Text>
                            </View>
                            <View style={{position: "relative" }}>
                                <TextInput style={styles.inputForm} secureTextEntry={true} autoCompleteType="password" onChangeText={(text) => setRePassword(text)} placeholder="Enter your congfirm password"></TextInput>
                                <Icon name="unlock" size={17} color="#0074FE" style={styles.iconAuth} />
                                <Text style={styles.textValidtion}>{errRPW}</Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <View style={styles.formBetweenContent}>
                                    <View style={styles.checkboxContainer}>
                                        <CheckBox
                                            value={temp}
                                            onValueChange={(newValue) => setTemp(newValue)}
                                            styles={styles.checkbox}
                                        />
                                        <Text style={styles.lableFormCheckBox2}>Please chose agree Temps</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: 0 }}>
                                <TouchableOpacity onPress={onSubmit}>
                                    <LinearGradient
                                        colors={['#15c39a', '#15c39a']}
                                        style={styles.buttonLogin}
                                    >
                                        <Text style={styles.textSign}>Signup to my accout</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
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
            <Modal
                style={styles.modalView}
                position="center"
                backdrop={true}
                onClosed={() => setModalVisible(false)}
                isOpen={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalCancel} >
                        <Icon name="x" size={18} color="#1F9EFF" onPress={() => setModalVisible(false)} />
                    </View>
                    <View style={styles.modalView}>
                        <IconFa name="check" size={35} color="#1F9EFF" style={styles.modalIcon} onPress={() => navigation.navigate('Home')} />
                        <Text style={styles.modalText}>You register success </Text>
                        <Text style={styles.modalText2}>Please check your email for verification</Text>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    )
}

export default AuRegister
