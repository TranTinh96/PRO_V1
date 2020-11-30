import React, { useState, useContext } from 'react'
import { Text, View, ScrollView, StyleSheet, SafeAreaView, Image, Switch, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Avatar, Title, Caption } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';
import { Button } from "react-native-elements"
import Feather from 'react-native-vector-icons/Feather';

//Context
import { AuthContext } from '../../../context/authContext';


function Accouts() {
    //Redux
    var User = useSelector(state => state.User);
    const [listUser, setListUser] = useState(User.users)
    //THEM
    console.log(listUser)

    const paperTheme = useTheme();
    //Context
    const { signOut, toggleTheme } = useContext(AuthContext);
    //Notification
    const [isNotification, setIsNotification] = useState(false);
    const toggleNotification = () => setIsNotification(pre => !pre);
    //Them
    const toggleThem = () => {
        toggleTheme()
    };
    //Logout
    onLogout = () => {
        signOut()
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar backgroundColor='#009387' barStyle="light-content" />
                <Animatable.View style={[styles.main ,{  backgroundColor: paperTheme.background}]} animation="fadeInLeft">
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: "column" ,marginTop:10}}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://scontent.fdad3-1.fna.fbcdn.net/v/t1.0-9/117877160_1007000939759713_3134007040104332026_n.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=EBJIMLMxKYcAX-BkjPo&_nc_ht=scontent.fdad3-1.fna&oh=a1e9c3df756baa2915fa9a3533149b26&oe=5F697C93'
                                }}
                                size={65}
                            />
                            <View style={{ flexDirection: 'column' , marginTop:10 }}>
                                <Title style={styles.title}>John Doe</Title>
                                <Caption style={styles.caption}>@j_doe</Caption>
                            </View>
                        </View>
                    </View>
                    {/*------------------------*/}
                    <View>
                        {/*------------ Accout ------------*/}
                        <View style={styles.statsContainerTop}>
                            <View style={styles.userAccout}>
                                <Feather name="user" size={18} color="#0A0A0A" style={styles.iconHeader} />
                                <Text style={styles.header}>Accout</Text>
                            </View>
                            <View style={styles.contentND_1}>
                                <Text style={styles.textND}>Edit Profile</Text>
                                <Feather name="chevron-right" size={18} color="#9FABC0" />
                            </View>
                            <View style={styles.contentND}>
                                <Text style={styles.textND}>Change password</Text>
                                <Feather name="chevron-right" size={18} color="#9FABC0" />
                            </View>

                        </View>
                        {/*------------ Notifications ------------*/}
                        <View style={[styles.statsContainer]}>
                            <View style={styles.userAccout}>
                                <Feather name="bell" size={18} color="#0A0A0A" style={styles.iconHeader} />
                                <Text style={styles.header}>Notifications</Text>
                            </View>
                            <View style={styles.contentND_1}>
                                <Text style={styles.textND}>Notification</Text>
                                <Switch
                                    trackColor={{ false: "#DAE7DE", true: "#15c39a" }}
                                    thumbColor={isNotification ? "#f4f3f4" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleNotification}
                                    value={isNotification}
                                />
                            </View>
                        </View>
                        {/*------------ More ------------*/}
                        <View style={[styles.statsContainer]}>
                            <View style={styles.userAccout}>
                                <Feather name="plus" size={18} color="#0A0A0A" style={styles.iconHeader} />
                                <Text style={styles.header}>More</Text>
                            </View>
                            <View style={styles.contentND_1}>
                                <Text style={styles.textND}>Language</Text>
                                <Feather name="chevron-right" size={18} color="#9FABC0" />
                            </View>
                            <View style={styles.contentND}>
                                <Text style={styles.textND}>Dark Them</Text>
                                <Switch
                                    trackColor={{ false: "#DAE7DE", true: "#15c39a" }}
                                    thumbColor={paperTheme.dark ? "#f4f3f4" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleThem}
                                    value={paperTheme.dark}
                                />
                            </View>
                        </View>

                    </View>


                    <View style={styles.containerLogout}  >
                        <View style={styles.borderLogout}>
                            <Button
                                icon={
                                    <Feather name="log-out" size={16} color="white" />
                                }
                                iconLeft
                                title="Logout"
                                buttonStyle={{
                                    borderRadius: 30,
                                    backgroundColor: "#15c39a",
                                    paddingTop: 8,
                                    paddingBottom: 8,
                                    paddingLeft: 15,
                                    paddingRight: 15
                                }}
                                titleStyle={{
                                    marginLeft: 5
                                }}

                                onPress={onLogout}
                            />
                        </View>

                    </View>

                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    main: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    userInfoSection:{
        justifyContent:"center",
        alignItems:"center",
        height:180 ,
    },
    title: {
        fontSize: 16,
        marginTop: 0,
        fontFamily: "Quicksand-Bold"
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,

    },

    ///////////////
    statsContainerTop: {
        paddingLeft: 25,
        paddingRight:25,

    },
    statsContainer: {
        marginTop:15,
        paddingLeft: 25,
        paddingRight:25,
    
    },
    userAccout: {

        paddingBottom: 15,
        borderBottomColor: "#f3f3f4",
        borderBottomWidth: 2,
        position: "relative"
    },

    header: {
        fontFamily: "Quicksand-SemiBold",
        color: "#0A0A0A",
        marginLeft: 26,
        fontSize: 16,
        marginBottom: 2,

    },
    iconHeader: {
        position: "absolute",
        marginTop: 3
    },  
     contentND_1: {

        paddingTop:15,
        paddingBottom:12,
        position: "relative",
        flexDirection: "row",
        justifyContent: "space-between",
    },

    contentND: {

        paddingTop:12,
        paddingBottom:12,
        position: "relative",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textND: {
        color: "#B8C6CA",
        fontFamily: "Quicksand-Medium",
        fontSize: 16
    },
    containerLogout: {
        marginTop: 25,
        alignItems: "center",

    },

    textLogout: {
        marginLeft: 5,
        color: "white",
        fontFamily: "Quicksand-Bold",
        fontSize: 16,


    },
    iconLogout: {

        position: "absolute",
        marginTop: 10,
        marginLeft: 12
    }

})


export default Accouts

