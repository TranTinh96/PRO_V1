import {Dimensions} from "react-native"

const {width,height} = Dimensions.get("screen")

const Forms = {
    container :{
        flex :1 ,
        backgroundColor: '#F4F4F4',
        position : 'relative'
    },
    main:{
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    formContainer :{
        padding :8,
        shadowColor: 'gray',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    formContainerAlarm :{
        
        padding :8,
        shadowColor: 'gray',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    wrapper:{
    },
    containerScreen:{
        
    },
   
    screenChart:{
        borderRadius: 10,
       
    },
    chartViewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    chartView:{
        width:"50%",
        padding :8
    },
    /*-----Dashboard ---*/
    containerControl :{
        flex :1 ,
        backgroundColor: '#F4F4F4',
        position : 'relative',
       
    },
    mainControl:{
        flex:1,
        backgroundColor: '#F4F4F4',
        position : 'relative',
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    
    dashboardContainer:{
        margin :16,
        marginBottom :0,
        flexDirection: 'column',
        borderRadius:10,
        backgroundColor:"#FFF",
        padding :10
     
    },
    dashboardContainerRelayOn:{
        margin :16,
        marginBottom :0,
        flexDirection: 'column',
        borderRadius:10,
        backgroundColor:"#efe9ae",
        padding :10
     
    },
    dashboardControl:{
        flexDirection: 'row',
        alignContent:"stretch",
        justifyContent: 'space-between',
        alignItems: 'stretch',
        marginBottom :10,
        width :width-54
        
    },
    border:{
        borderWidth :1,
        borderColor:"#f6bd60",
        margin :5

    },

    bulbContainer:{
        padding :8,
        borderColor:"#727cf5",
        justifyContent: 'center',
        alignItems: 'center',
        margin :5,
        marginBottom :0
    },
    bulbContainerOn:{
        padding :8,
        borderColor:"#727cf5",
        justifyContent: 'center',
        alignItems: 'center',
        margin :5,
        marginBottom :0
    },
    controlContainer:{
        padding :5,
       
        
    },
    controlContainerRelayB:{
        padding :5,
    },
    textHeader:{
        fontFamily: "OpenSans-Bold",
        fontSize:14,
        color:"#E48762",
        justifyContent: 'center',
        marginTop:20,
        marginLeft:5
       
    },
    screenBetween:{
        flexDirection: 'row',
        alignContent:"stretch",
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    screenLeft:{
        marginTop:15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    screenRight:{
        width :80,
        marginTop:5,
    },
  
  
    containerManual:{
        marginRight :5,
        paddingBottom :10
    },
    viewPower:{
        padding :6,
        backgroundColor:"#a5ffd6",
        borderRadius:50
    },
    powerImage:{
        height:28,
        width :28,
        
    },




    
    
}

export default Forms