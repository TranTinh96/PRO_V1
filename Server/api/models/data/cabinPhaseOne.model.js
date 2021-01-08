var mongoose = require('mongoose');
const func = require("../../../middlewares/func.Middleware")
const funcMqtt = require("../../../middlewares/mqtt.Middleware")
var Schema = mongoose.Schema;
var date = new Date()

var cabinPhaseOneSchema = new Schema({

    device_id :{
        type: String,
        required :true

    },
    nSamplesPhaseOne:{
        type:Number ,
        required:true
    },
    day :{
        type:String ,
        required:true
    },
    first:Schema.Types.Decimal128,
    last:Schema.Types.Decimal128,
    samplesPhaseOne:[{
        V1N     :   Number,
        V12     :   Number,
        I1      :   Number,
        KW1      :   Number,
        KVAR1    :   Number,
        KVA1     :   Number,
        PF1      :   Number,
        time    :   Schema.Types.Decimal128 ,
        timeCreate : String
    }],
    createdAt: { 
        type: Date,
         required: true, 
         default: Date.now, 
         expires: 60*60*24*7 
    }
})

var cabinPhaseOne = module.exports= mongoose.model("cabinPhaseOne", cabinPhaseOneSchema)
module.exports.findDocumentCabinPhaseOne = async( topic,cb ) =>{
    
    await cabinPhaseOne.findOne({device_id:topic ,day : day} ,cb)
}
module.exports.createDocumentCabinPhaseOne = async(topic,dataPhaseOne,cb ) =>{
    var day =funcMqtt.getDay();
    var newPhaseOne = new cabinPhaseOne( {
        device_id : topic ,
        nSamplesPhaseOne:1,
        day : day,
        first :date.getTime(),
        last :date.getTime(),
        samplesPhaseOne:[
            dataPhaseOne
        ]

      })
    newPhaseOne.save(cb)
}
module.exports.addDocumentCabinPhaseOne = async ( topic,samplesPhaseOne ) =>{
    var day =funcMqtt.getDay();
     await cabinPhaseOne.updateOne({device_id: topic ,day:day},
        {$push:{samplesPhaseOne:samplesPhaseOne},
        $min: { first: samplesPhaseOne.time},
        $max: { last: samplesPhaseOne.time},
        $inc: { nSamplesPhaseOne: 1} 
    } )
}

module.exports.findPhaseOne_OneHours = async (device_id) =>{
    var dataPhaseOne =[];
    var day =funcMqtt.getDay();
    const minHours = parseFloat(date.getTime()-3600*1000);
    const data = await cabinPhaseOne.find({device_id :device_id, day: day}).exec();
    if( ! func.checkArray(data))
    {
        var timeData =data[0].samplesPhaseOne;
        for (let i = 0; i < timeData.length; i++) {
            let time =parseFloat(timeData[i].time)
            if(minHours <= time)
            {
                dataPhaseOne.push(timeData[i]);
            }
             
         }
         
    }
     

    return dataPhaseOne;
}


module.exports.findPhaseOneDays = async (device_id) =>{
    var day =funcMqtt.getDay();
    const data = await cabinPhaseOne.find({device_id :device_id, day: day}).exec();
    if( ! func.checkArray(data))
    {
        return  data[0].samplesPhaseOne
    }
    else
    {
        return []
    }
}

module.exports.findPhaseOneWeeks = async (device_id) =>{

    var dataPhaseOne =[];
    var date = new Date()
    const minHours = parseFloat(date.getTime()-7*24*3600*1000);
    const data = await cabinPhaseOne.find({device_id :device_id});
    for (let i = 0; i < data.length; i++) {
        var timeData =data[i].samplesPhaseOne;
        for (let i = 0; i < timeData.length; i++) {
            let time =parseFloat(timeData[i].time)
            if(minHours <= time)
            {
                dataPhaseOne.push(timeData[i]);
            }
             
        }  
    }
     
    return dataPhaseOne;
}