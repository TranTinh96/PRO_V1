import React, { useState ,useContext } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native';
import axios from "axios"
import jwt_decode from "jwt-decode";
import { View, Text, StatusBar, TextInput, TouchableOpacity,Image ,ScrollView } from "react-native"
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import styles from "../../../assets/formCss"
import { useDispatch } from 'react-redux';
import checkRole from "../../services/fucRole"
import { checkUndefined } from "../../services/fucService"
import CheckBox from '@react-native-community/checkbox';
//Context
import { AuthContext } from '../../../context/authContext';

function AuLogin() {
    //Context
    const { signIn } = useContext(AuthContext);
    //THEM
    const { colors } = useTheme();
    //Navigator
    const navigation = useNavigation();
    //Redux
    const dispatch = useDispatch();
    //FORM
    const [email, setEmail] = useState()
    const [password, setPassword] = useState();
    const [remember, setRemember] = useState(false)
    //ERROR
    const [errPW, setErrorPW] = useState()
    const [errEM, setErrorEM] = useState()
    //FUNCTION
    const onSubmit = () => {
        var isEmail = checkUndefined(email)
        var isPassword = checkUndefined(password)
        if (isEmail && isPassword) {
            setErrorEM("Enter a valid email address")
            setErrorPW("Enter a valid password")
        } else if (isEmail && !isPassword) {
            setErrorEM("Enter a valid email address")
            setErrorPW(" ")
        } else if (!isEmail && isPassword) {
            setErrorPW("Enter a valid password")
            setErrorEM(" ")
        } else {
            //Main True
            var user = {
                email: email,
                password: password
            }
            axios.post('/profile/login', user)
                .then(async res => {
                    var resData = res.data
                    
                    if (resData.success) {
                        var authJWT = resData.token;
                        var role = checkRole(resData.role);
                        var users = {
                            email: resData.addressEmail,
                            userName: resData.userName,
                            role: role
                        }
                        //SignIN context -Set JWT AsyncStorage 
                         signIn(authJWT);
                        //Redux User JWT
                        dispatch({ type: "SET_USER", users: users })
                        dispatch({ type: "PROJECT_ID", projectID: jwt_decode(authJWT).project_id })
                        //ERR
                        setErrorEM(" ")
                        setErrorPW(" ")

                    } else {
                        if (!resData.email) {
                            setErrorEM(resData.message)
                        } else {
                            setErrorPW(resData.message)
                        }
                    }
                })
                .catch(err => {

                });
        }

    }
    return (
        <ScrollView style={styles.container}  showsVerticalScrollIndicator={false}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <Animatable.View
                style={[styles.mainLogin, {
                    
                }]}
                animation="fadeInDownBig"
            >
                <View style={styles.formContainer} >
                    <View>
                        <MaterialIcons name="keyboard-backspace" size={27} color="#01ab9d" style={styles.loginLink} onPress={() => navigation.navigate('Home')} />
                        <Text style={styles.textLogin}>LOGIN</Text>
                        <Text style={styles.textinfoLogin}>Please login to continue using our app. </Text>
                    </View>
                    <View style={styles.loginFormContanier}>
                        <View style={styles.LoginContanier}>
                            <View style={{ marginTop: 10, position: "relative" }}>
                                <TextInput style={styles.inputForm} autoCompleteType="email" onChangeText={(text) => setEmail(text)} placeholder="Enter your email"></TextInput>
                                <Icon name="mail" size={20} color="#0074FE" style={styles.iconAuth} />
                                <Text style={styles.textValidtion}>{errEM}</Text>

                            </View>
                            <View style={{ marginTop: 10, position: "relative" }}>

                                <TextInput style={styles.inputForm} autoCompleteType="password" secureTextEntry={true} onChangeText={(text) => setPassword(text)} placeholder="Enter your password"></TextInput>
                                <Icon name="lock" size={20} color="#0074FE" style={styles.iconAuth} />
                                <Text style={styles.textValidtion}>{errPW}</Text>
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <View style={styles.formBetweenContent}>
                                    <View style={styles.checkboxContainer}>
                                        <CheckBox
                                            value={remember}
                                            onValueChange={(newValue) => setRemember(newValue)}
                                            styles={styles.checkbox}
                                        />
                                        <Text style={styles.lableFormCheckBox}>Remember me</Text>
                                    </View>
                                    <Text style={styles.lableForm}>Forgot password ?</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <TouchableOpacity onPress={onSubmit}>
                                    <LinearGradient
                                        colors={['#15c39a', '#15c39a']}
                                        style={styles.buttonLogin}
                                    >
                                        <Text style={styles.textSign}>Login to my accout</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </View>
            </Animatable.View>
            <View style={styles.screenSecond}>
                <View style={styles.formGoogleFacebook}>
                    <View style={styles.formCenter}>
                        <View style={styles.loginAuthLink}>
                            <View style={[styles.iconFaceGoogle, styles.paddingLoginG]}>
                                <Image
                                    style={styles.imageFG}
                                    source={require('../../../assets/image/logo_facebook.png')}
                                />
                            </View>
                            <View style={[styles.iconFaceGoogle, styles.paddingLoginG]}>
                                <Image
                                    style={styles.imageFG}
                                    source={require('../../../assets/image/logo_google.png')}
                                />
                            </View>
                            <View style={[styles.iconFaceGoogle, styles.paddingLoginG]}>
                                <Image
                                    style={styles.imageFG}
                                    source={require('../../../assets/image/logo_instagram.png')}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.formLinkSign}>
                    <View style={styles.formCenter}>
                        <View style={styles.formLinkAuth}>
                            <Text style={styles.textExiting}>Don't have an accout ?</Text>
                            <Text style={styles.textLink} variant="button" onPress={() => navigation.navigate('Project')}>Register Now </Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default AuLogin
