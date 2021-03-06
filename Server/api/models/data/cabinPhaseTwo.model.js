var mongoose = require('mongoose');
const func = require("../../../middlewares/func.Middleware")
var date = new Date()

var Schema = mongoose.Schema;
const funcMqtt = require("../../../middlewares/mqtt.Middleware")

var cabinPhaseTwoSchema = new Schema({

    device_id :{
        type: String,
        required :true

    },
    nSamplesPhaseTwo:{
        type:Number ,
        required:true
    },
    day :{
        type:String ,
        required:true
    },

    first:Schema.Types.Decimal128,
    last:Schema.Types.Decimal128,
    samplesPhaseTwo:[{
        V2N     :   Number,
        V23     :   Number,
        I2      :   Number,
        KW2      :   Number,
        KVAR2    :   Number,
        KVA2     :   Number,
        PF2      :   Number,
        time    :   Schema.Types.Decimal128,
        timeCreate : String
    }],
    createdAt: { 
        type: Date,
         required: true, 
         default: Date.now, 
         expires: 60*60*24*7 
    }
})

var cabinPhaseTwo = module.exports= mongoose.model("cabinPhaseTwo", cabinPhaseTwoSchema)

module.exports.findDocumentCabinPhaseTwo = async( topic,cb ) =>{
    var day =funcMqtt.getDay();
    await cabinPhaseTwo.findOne({device_id:topic,day:day} ,cb)
}
module.exports.createDocumentCabinPhaseTwo = async(topic,dataPhaseTwo,cb ) =>{
    var day =funcMqtt.getDay();
    var newPhaseTwo = new cabinPhaseTwo( {
        device_id : topic ,
        nSamplesPhaseTwo:1,
        day : day,
        first :date.getTime(),
        last :date.getTime(),
        samplesPhaseTwo:[
            dataPhaseTwo
        ]

      })
    newPhaseTwo.save(cb)
}
module.exports.addDocumentCabinPhaseTwo = async ( topic,samplesPhaseTwo ) =>{
    var day =funcMqtt.getDay();
    await cabinPhaseTwo.updateOne({device_id: topic ,day:day},
        {$push:{samplesPhaseTwo:samplesPhaseTwo},
        $min: { first: samplesPhaseTwo.time},
        $max: { last: samplesPhaseTwo.time},
        $inc: { nSamplesPhaseTwo: 1} 
    } )
}

module.exports.findPhaseTwo_OneHours = async (device_id) =>{
    var dataPhaseTwo =[];
    const minHours = parseFloat(date.getTime()-3600*1000);
    var day =funcMqtt.getDay();
    const data = await cabinPhaseTwo.find({device_id :device_id, day: day}).exec();
   
    if( ! func.checkArray(data))
    {
        var timeData =data[0].samplesPhaseTwo;
        for (let i = 0; i < timeData.length; i++) {
            let time =parseFloat(timeData[i].time)
            if(minHours <= time)
            {
                dataPhaseTwo.push(timeData[i]);
            }
             
         }
         
    }
     

    return dataPhaseTwo;
}

module.exports.findPhaseTwoDays = async (device_id) =>{;
    var day =funcMqtt.getDay();
    const data = await cabinPhaseTwo.find({device_id :device_id, day: day}).exec();
    if( ! func.checkArray(data))
    {
        return  data[0].samplesPhaseTwo
    }
    else
    {
        return []
    }
}

module.exports.findPhaseTwoWeeks = async (device_id) =>{

    var dataPhaseTwo =[];
    var date = new Date()
    const minHours = parseFloat(date.getTime()-7*24*3600*1000);
    const data = await cabinPhaseTwo.find({device_id :device_id});
    for (let i = 0; i < data.length; i++) {
        var timeData =data[i].samplesPhaseTwo;
        for (let i = 0; i < timeData.length; i++) {
            let time =parseFloat(timeData[i].time)
            if(minHours <= time)
            {
                dataPhaseTwo.push(timeData[i]);
            }
             
        }  
    }
     
    return dataPhaseTwo;
}

module.exports.findOneInitPhaseTwo = async (device_id) =>{

    var dataPhaseTwo ={
        "V2N" : 0,
        "V23" : 0,
        "I2" : 0,
        "KW2" : 0,
        "KVAR2" : 0,
        "KVA2" : 0,
        "PF2" : 0,
    };
    const data = await cabinPhaseTwo.find({device_id :device_id,day :funcMqtt.getDay()});
    if( data.length >0 && ! func.checkNull(device_id) )
    {
        let length =data[0].samplesPhaseTwo.length
        let dataArray = data[0].samplesPhaseTwo;
        dataPhaseTwo = dataArray
        return dataPhaseTwo[length-1];
    }
    return dataPhaseTwo

    
}