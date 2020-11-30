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
        paddingTop:0 ,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    containerHeader:{
        marginLeft: 10,
        marginBottom: 20,
        fontFamily: "Quicksand-SemiBold",
        color: "#E48762",
        fontSize:17,
        marginTop: 0,
      
    },
   
    containerHeader2:{
        marginLeft: 10,
        fontFamily: "Quicksand-SemiBold",
        color: "#E48762",
        fontSize:17,
        marginTop: 0,
      
    },
    paddingScreen:{
        paddingTop:20,
    },
    screenOne:{
        marginTop: 20,
        marginLeft: 10,
        borderWidth: 2,
        borderColor: "#F8F8F7",
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        width: Math.floor(width) - 40,
        
    },
    screenBetween:{
        flexDirection: 'row',
        position : 'relative',
        alignContent:"stretch",
        justifyContent: 'center',
        alignItems: 'stretch'
        
    },
    screenDataOne:{
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#E7ECEE",
        paddingBottom: 15,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        width: Math.floor((width-20)/ 2) - 20,
        position: "relative",
        
        
    },
    screenDataTwo:{
        marginLeft: 10,
        borderWidth: 1,
        borderColor: "#E7ECEE",
        paddingBottom: 10,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        width: Math.floor((width-20)/ 2) - 20,
        position: "relative",
        
    },
    progressContainer:{
       flexDirection: 'row-reverse',
       right:0,
       top: 0,
        
    },
    textprogress:{
        fontSize: 18 ,
        color:"#FCAF45"
    },
    textHeader:{
        fontFamily: "Quicksand-SemiBold",
        color: "#727CF5",
        fontSize: 14.5
    },
    textContent:{
        marginTop: 3,
        fontFamily: "Quicksand-Medium",
        color: "#A09DB0",
        fontSize: 14,

    },
    /*-----------------------*/
    screenChart:{
        marginLeft: 10,  
        marginRight: 10, 
    
        borderRadius: 10,
        marginTop: 20,
    }
}

export default Forms