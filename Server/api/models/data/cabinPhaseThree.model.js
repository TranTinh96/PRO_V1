var mongoose = require('mongoose');
const func = require("../../../middlewares/func.Middleware")
const funcMqtt = require("../../../middlewares/mqtt.Middleware")
var Schema = mongoose.Schema;
var date = new Date()

var cabinPhaseThreeSchema = new Schema({

    device_id :{
        type: String,
        unique :true,
        required :true

    },
    nSamplesPhaseThree:{
        type:Number ,
        required:true
    },
    day :{
        type:String ,
        required:true
    },
    first:Schema.Types.Decimal128,
    last:Schema.Types.Decimal128,
    samplesPhaseThree:[{
        V3N     :   Number,
        V31     :   Number,
        I3      :   Number,
        KW3      :   Number,
        KVAR3    :   Number,
        KVA3     :   Number,
        PF3      :   Number,
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

var cabinPhaseThree = module.exports= mongoose.model("cabinPhaseThree", cabinPhaseThreeSchema)

module.exports.findDocumentCabinPhaseThree = async( deviceID,cb ) =>{
    await cabinPhaseThree.findOne({device_id:deviceID} ,cb)
}
module.exports.createDocumentCabinPhaseThree = async(topic,dataPhaseThree,cb ) =>{
    var day =funcMqtt.getDay();
    var newPhaseThree = new cabinPhaseThree( {
        device_id : topic ,
        nSamplesPhaseThree:1,
        day : day,
        first :date.getTime(),
        last :date.getTime(),
        samplesPhaseThree:[
            dataPhaseThree
        ]

      })
    newPhaseThree.save(cb)
}
module.exports.addDocumentCabinPhaseThree = async ( topic,samplesPhaseThree ) =>{
    var day =funcMqtt.getDay();
    var res= await cabinPhaseThree.updateOne({device_id:topic ,day:day},
        {$push:{samplesPhaseThree:samplesPhaseThree},
        $min: { first: samplesPhaseThree.time},
        $max: { last: samplesPhaseThree.time},
        $inc: { nSamplesPhaseThree: 1} 
    },{ upsert: true } )
}

module.exports.findPhaseThree_OneHours = async (device_id) =>{
    var dataPhaseThree =[];
    const minHours = parseFloat(date.getTime()-3600*1000);
    var day =funcMqtt.getDay();
    const data = await cabinPhaseThree.find({device_id :device_id, day: day}).exec();
    var timeData =data[0].samplesPhaseThree;
    if( ! func.checkUndefined(timeData))
    {
        for (let i = 0; i < timeData.length; i++) {
            let time =parseFloat(timeData[i].time)
            if(minHours <= time)
            {
                dataPhaseThree.push(timeData[i]);
            }
             
         }
         
    }
     

    return dataPhaseThree;
}

module.exports.findPhaseThreeDays = async (device_id) =>{
    var day =funcMqtt.getDay();
    const data = await cabinPhaseThree.find({device_id :device_id, day: day}).exec();
    return  data[0].samplesPhaseThree
}