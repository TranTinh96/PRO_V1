import {Dimensions} from "react-native"

const {width,height} = Dimensions.get("screen")

const Forms = {
    container :{
        flex :1 ,
        backgroundColor: "white",
        position : 'relative'
    },
    main:{
        flex: 1,
        backgroundColor: "white",
    },
    formContainer :{
        padding :10
    },
    logoheader:{
        width :20,
        height:20
    },
    containerScreenTow:{

    },
    containerHeader:{
        flexDirection: 'row',
      
    },
    containerHeaderTwo:{
        flexDirection: 'row',
        marginLeft:10
      
    },
    containerHeaderTop:{
        marginTop :10
    },
    textHeader:{
        marginBottom: 5,
        fontFamily: "Quicksand-Bold",
        color: "#E48762",
        fontSize:14,
        marginLeft: 8,
       
      
    },
    screenChart:{
        borderRadius: 10,
        marginTop: 10,
    },
    ///////////////////////////
    screenBetween:{
        flexDirection: 'row',
        position : 'relative',
        alignContent:"stretch",
        justifyContent: 'center',
        alignItems: 'stretch',
        padding :5,
        paddingTop :5
        
    },
    screenTop:{
        marginTop:12
    },
    box1:{
        width:"50%",
        borderWidth: 2,
        borderColor: "#f6f6f6",
        borderRadius:25,
        marginRight :5,
    },
    box2:{
        width:"50%",
        borderWidth: 1,
        borderColor: "#f6f6f6",
        borderRadius:15,
        marginLeft :5,
    }
    
    
}

export default Forms