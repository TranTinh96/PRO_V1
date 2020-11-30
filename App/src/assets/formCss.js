import { Dimensions } from "react-native"

const { width, height } = Dimensions.get("screen")
var heightImg = height * 0.24
var widthImg = heightImg * 336 / 254

const Forms = {
    container: {
        flex: 1,
        backgroundColor: '#0C0D34',
    },
    formContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    formHeader: {
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 60
    },
    formText: {
        fontFamily: "Montserrat-Bold",
        fontSize: 20,
        paddingBottom: 50
    },
    formCenter: {
        alignItems: "center",
        justifyContent: "center",
    },
    formImage: {
        width: widthImg,
        height: heightImg,

    },


    formAuthSignUp: {
        marginTop: 30
    },
    formLoginAuth: {

        flexDirection: "row",
        borderWidth: 1,
        borderColor: "white",
        marginTop: 13,

    },
    formLoginAuthSignup: {
        width: width - 110,
        height: 45,
        backgroundColor: "#1DA1F2",
        borderRadius: 100,
        flexDirection: "row",
        marginTop: 10,


    },
    formLoginContanier: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",

    },
    formImageLogin: {
        width: 20,
        height: 18
    },
    //Link

    
    formLinkSign: {
        flexDirection: "row",
        marginTop: 15,
        marginBottom: 10

    },

    formLinkContanier: {
        width: width - 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
   
    /*------------------------ Login ------------------------*/
    mainLogin: {
        flex: 1,
        padding: 20,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        paddingBottom: 60,
        backgroundColor: "#FFF",
        height:height - 215
        
      
    },
    mainRegister: {
        flex: 1,
        padding: 20,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        paddingBottom: 60,
        backgroundColor: "#FFF",
        height:height - 140
       
        
      
    },
    loginFormContanier: {
        padding: 10,
    },
    
    textinfoLogin: {
        fontFamily: "Quicksand-Medium",
        color: "#292929",
        fontSize: 15,
        marginTop: 8
    },
    formLinkAuth: {
        width: width,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonLogin:{
        borderRadius: 30,
        backgroundColor: "#0857ab",
        height: 50,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textSign:{
        fontFamily: "Montserrat-Bold",
        color: "white",
        fontSize: 16,
       
    },
 
  
    textLogin: {
        fontFamily: "Quicksand-Bold",
        color: "#15c39a",
        fontSize: 20,
        marginTop: 20

    },
    //-------------- Second Register -----------
    screenSecondRegister:{
        height:60,
        
    },
    //-------------- Second Screen -----------
    screenSecond:{
        height:120,
        
    },
    formGoogleFacebook:{
        marginBottom: 10,
    },
    loginAuthLink: {
        flexDirection: 'row',
        marginTop: 25,

    },
    iconFaceGoogle: {
       borderWidth: 10,
       borderColor: "#FFF",
       borderRadius: 50,
    

    },
    imageFG:{
        width: 22,
        height: 22,
        resizeMode: 'stretch',
        backgroundColor: "#FFF",
    },
    iconGF: {
        paddingTop: 5,
        paddingBottom: 5,
    },
    paddingLoginG: {
       marginLeft: 15,
    },

    LoginContanier: {
        marginTop: 40
    },

    formLinkSignUp: {
        flexDirection: "row",
        marginTop: 15,
        marginBottom: 10

    },
    textExiting: {
        fontFamily: "Quicksand-SemiBold",
        color: "white",
        fontSize: 15,
    },
    textLink: {
        fontFamily: "Quicksand-Bold",
        color: "#15c39a",
        fontSize: 16,
        marginLeft: 8,
    },
    //INPUT
    inputForm: {
        height: 48,
        borderRadius:10,
        borderBottomWidth: 1,
        borderColor: '#01ab9d',
        fontFamily: "Quicksand-SemiBold",
        color: "#0074FE",
        fontSize: 15,
        paddingLeft: 45,
        paddingRight: 20,
        marginTop: 8 ,
    
    },
    inputForm02: {
        height: 48,
        borderRadius: 3,
        borderWidth: 0.8,
        borderColor: '#01ab9d',
        fontFamily: "Quicksand-SemiBold",
        color: "#0074FE",
        fontSize: 15,
        paddingLeft: 40,
        paddingRight: 20,
        marginTop: 8
    },
    inputForm03: {
        height: 48,
        borderRadius:10,
        borderBottomWidth: 1,
        borderColor: '#01ab9d',
        fontFamily: "Quicksand-SemiBold",
        color: "#0074FE",
        fontSize: 15,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 8 ,
    },
    lableForm: {
        fontFamily: "Quicksand-SemiBold",
        color: "#0074FE",
        fontSize: 15,
        marginTop: 10
    },
    formBetweenContent: {
        flexDirection: 'row',
        justifyContent: "space-between",

    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    checkbox: {
        borderRadius: 3,
        alignSelf: "flex-start",
        borderColor: '#01ab9d',
        borderWidth: 1,

    },
    lableFormCheckBox: {
        fontFamily: "Quicksand-SemiBold",
        color: "#0074FE",
        fontSize: 15,
        margin: 8,
        marginLeft: 2
    },
    lableFormCheckBox2: {
        fontFamily: "Quicksand-SemiBold",
        color: "#0074FE",
        fontSize: 14,
        margin: 8,
        marginLeft: 2
    },
    iconAuth: {
        position: 'absolute',
        marginTop: 23,
        marginLeft: 5
    },
    textValidtion: {
        color: "red",
        marginTop: 5,
        fontSize: 13,
        marginLeft: 5
    },
    line: {
        marginTop: 20,


    }
    , borderCenter: {
        alignItems: "center",
        justifyContent: "center",

    },
    /*--------------Modal -------------*/
    modalView: {
        justifyContent: "center",
        alignItems: "center",
        width: width - 100,
        height: width - 200,
        borderRadius: 30
    },
    modalText: {
        fontFamily: "Quicksand-Bold",
        color: "#727CF5",
        fontSize: 17,
        marginTop: 10
    },
    modalText2: {
        fontFamily: "Quicksand-Medium",
        fontSize: 14,
        marginTop: 10,
    },
    centeredView: {
        position: "relative",
    },
    modalCancel: {
        position: 'absolute',
        right: 20,
        top: 10
    }

}

export default Forms