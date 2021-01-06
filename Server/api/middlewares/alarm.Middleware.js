
var func = require("../../middlewares/func.Middleware")

module.exports.checkStatusAlarm= (payloadSplit,dataTag) =>{

    var valuePresentTag = 0;
    var nameTag = dataTag.name;
    var value = dataTag.valueTag ;
    var highHigh = dataTag.HH ;
    var High = dataTag.H ;
    var Low = dataTag.L ;
    var LowLow = dataTag.LL ;
    var deadband = dataTag.Rate;
    var status = "OK" ;

    //Lấy tên Tag 
    var splitStr = nameTag.split("(")
    var splitTag = splitStr[1].replace(/\s/g, '') 
    var findName = splitTag.split(")")[0] ;
    valuePresentTag = func.getKeyValue(payloadSplit,findName)
    
    // Kiểm tra khi biểu đồ đi lên (valuePresentTag lớn hơn  giá trị củ)
     if(valuePresentTag > value)
     {
         console.log("UP TREND" )
         if(valuePresentTag <= (LowLow + deadband))
         {
             return status ="LL"
         }
         else if(valuePresentTag <= (Low + deadband))
         {
             return status ="L"
         }
         else if( (valuePresentTag >=High) && (valuePresentTag < highHigh))
         {
             return status ="H"
         }
         else if(valuePresentTag >= highHigh)
         {
             return status ="HH"
         }
         else
         {
             return status = "OK"
         }
     }
     //Kiểm tra khi biểu đồ đi xuống
     else
     {
        console.log("DOWN TREND")
        if(valuePresentTag <= LowLow)
        {
            return status ="LL"
        }
        else if( (LowLow < valuePresentTag)&&(valuePresentTag <= Low ))
        {
            return status ="L"
        }
        else if( (valuePresentTag > (High -deadband))&&(valuePresentTag<= (highHigh-deadband)))
        {
            return status ="H"
        }
        else if(valuePresentTag > (highHigh - deadband ))
        {
            return status ="HH"
        }
        else
        {
            return status = "OK"
        }  
     }
}


module.exports.getValueTagAlarm= (payloadSplit,dataTag) =>{

    var valuePresentTag = 0;
    var nameTag = dataTag.name;
    //Lấy tên Tag 
    var splitStr = nameTag.split("(")
    var splitTag = splitStr[1].replace(/\s/g, '') 
    var findName = splitTag.split(")")[0] ;
    valuePresentTag = func.getKeyValue(payloadSplit,findName)
    return valuePresentTag ;

}

