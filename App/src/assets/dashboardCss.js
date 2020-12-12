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
    }
    /*-----Card ---*/

    
}

export default Forms