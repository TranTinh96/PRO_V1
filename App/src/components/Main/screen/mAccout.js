import React, { useState, useContext } from 'react'
import { Text, View, ScrollView, StyleSheet, SafeAreaView,StatusBar , TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Avatar, Title, Caption } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
//Context
import { AuthContext } from '../../../context/authContext';


function Accouts() {
    //Redux
    var User = useSelector(state => state.User);
    const [listUser, setListUser] = useState(User.users)
    //THEM

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
                <StatusBar backgroundColor='#1F9EFF' barStyle="light-content" />
                <Animatable.View style={[styles.main ]} animation="fadeInLeft">
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: "column" ,marginTop:10}}>
                            <Animatable.Image
                            animation="bounceIn"
                            duraton="1500"
                            source={require('../../../assets/image/user.png')}
                            style={styles.userImage}
                            resizeMode="stretch"
                          />
                            <View style={{ flexDirection: 'column' , marginTop:10 }}>
                                <Title style={styles.title}>John Doe</Title>
                                <Caption style={styles.caption}>@j_doe</Caption>
                            </View>
                        </View>
                    </View>
                    {/*------------------------*/}
                    <View style={styles.statsContainer}>
                        <View style={styles.backgroundaccout}>
                            {/*--------------START----------*/}
                            <View style={styles.contentList}>
                                <View style={styles.leftList}>
                                    <Ionicons name="person-outline" size={20} color="#2061d6" style={styles.iconRight} />
                                </View>
                                <View style={styles.rightList}>
                                    <Text style={styles.textRight}>Profile</Text>
                                    <Feather name="chevron-right" size={18} color="#9FABC0" style={styles.iconRight} />
                                </View>
                            </View>
                            <View style={styles.borderToList}></View>
                            <View style={styles.contentList}>
                                <View style={styles.leftList}>
                                    <Feather name="shield" size={20} color="#0DFDB1" style={styles.iconRight} />
                                </View>
                                <View style={styles.rightList}>
                                    <Text style={styles.textRight}>Chane Password</Text>
                                    <Feather name="chevron-right" size={18} color="#9FABC0" style={styles.iconRight} />
                                </View>
                            </View>
                            {/*-------------END-----------*/}
                            <View style={styles.lineToList}></View>
                            {/*--------------START----------*/}
                             <View style={styles.contentList}>
                                <View style={styles.leftList}>
                                    <Ionicons name="brush-outline" size={20} color="#02DE99" style={styles.iconRight} />
                                </View>
                                <View style={styles.rightList}>
                                    <Text style={styles.textRight}>Theme</Text>
                                    <Feather name="chevron-right" size={18} color="#9FABC0" style={styles.iconRight} />
                                </View>
                            </View>
                            <View style={styles.borderToList}></View>
                            <View style={styles.contentList}>
                                <View style={styles.leftList}>
                                    <Ionicons name="notifications-outline" size={20} color="#FF7075" style={styles.iconRight} />
                                </View>
                                <View style={styles.rightList}>
                                    <Text style={styles.textRight}>Notifications</Text>
                                    <Feather name="chevron-right" size={18} color="#9FABC0" style={styles.iconRight} />
                                </View>
                            </View>
                            <View style={styles.borderToList}></View>
                            <View style={styles.contentList}>
                                <View style={styles.leftList}>
                                    <FontAwesome name="language" size={20} color="#479A65" style={styles.iconRight} />
                                </View>
                                <View style={styles.rightList}>
                                    <Text style={styles.textRight}>Language</Text>
                                    <Feather name="chevron-right" size={18} color="#9FABC0" style={styles.iconRight} />
                                </View>
                            </View>
                            <View style={styles.borderToList}></View>
                            <View style={styles.contentList}>
                                <View style={styles.leftList}>
                                    <Feather name="alert-circle" size={20} color="#6484CE" style={styles.iconRight} />
                                </View>
                                <View style={styles.rightList}>
                                    <Text style={styles.textRight}>About Us</Text>
                                    <Feather name="chevron-right" size={18} color="#9FABC0" style={styles.iconRight} />
                                </View>
                            </View>
                            <View style={styles.borderToList}></View>
                            <View style={styles.contentList}>
                                <View style={styles.leftList}>
                                    <Feather name="help-circle" size={20} color="#4AD3BA" style={styles.iconRight} />
                                </View>
                                <View style={styles.rightList}>
                                    <Text style={styles.textRight}>Help & Support</Text>
                                    <Feather name="chevron-right" size={18} color="#9FABC0" style={styles.iconRight} />
                                </View>
                            </View>
                             {/*--------------  END----------*/}
                            <View style={styles.lineToList}></View>
                             {/*--------------START----------*/}
                             < TouchableOpacity style={styles.contentList} onPress={onLogout}>
                                <View style={styles.leftList}>
                                    <Feather name="log-out" size={20} color="#02DE99" style={styles.iconRight} />
                                </View>
                                <View style={styles.rightList}>
                                    <Text style={styles.textRight}>Logout</Text>
                                </View>
                            </ TouchableOpacity>
                             {/*--------------END----------*/}
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
        backgroundColor:"#FFF"
    },
    main: {
        flex: 1,
        backgroundColor:"#FFF"
    },
    userImage:{

    },
    userInfoSection:{
        justifyContent:"center",
        alignItems:"center",
        height:180 ,
        backgroundColor:"#FFF"

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
    statsContainer: {
      
       

    },
     backgroundaccout:{
        
     } ,
     contentList:{
        
        paddingLeft: 58,
        position:"relative",
        paddingTop:14,
        paddingBottom:14,
        paddingRight:5,
     },
     leftList:{
        position:"absolute",
        marginLeft: 25,
        marginTop:15

     },
     rightList:{
        flexDirection:"row",
        justifyContent:'space-between',
     },
  
     textRight:{
        fontFamily: "Quicksand-SemiBold",
        color: "#0A0A0A",
        fontSize:16,
     },
     iconRight:{
        paddingRight:25,
     },
     borderToList:{
        marginLeft:58,
        borderTopWidth:0.8,
        borderTopColor:"#EAECEF",
        marginRight:20
    },
     lineToList:{
         backgroundColor:"#FAFAFA",
         height:18
     }

   
})


export default Accouts

