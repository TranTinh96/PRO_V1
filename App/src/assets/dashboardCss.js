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
    /*-----------------------*/
    screenChart:{
        marginLeft: 10,  
        marginRight: 10, 
    
        borderRadius: 10,
        marginTop: 20,
    }
}

export default Forms