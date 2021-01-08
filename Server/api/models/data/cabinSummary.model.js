var mongoose = require('mongoose');

var Schema = mongoose.Schema;
const func = require("../../../middlewares/func.Middleware")
const funcMqtt = require("../../../middlewares/mqtt.Middleware")

var cabinSummarySchema = new Schema({

    device_id :{
        type: String,
        required :true

    },
    nSamplesSummary:{
        type:Number ,
        required:true
    },
    day :{
        type:String ,
        required:true
    },
    first:Schema.Types.Decimal128,
    last:Schema.Types.Decimal128,
    samplesSummary:[{
        VLN     :   Number,
        VLL     :   Number,
        I       :   Number,
        KW      :   Number,
        KVAR    :   Number,
        KVA     :   Number,
        PF      :   Number,
        F       :   Number,
        KWH     :   Number,
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

var cabinSummary = module.exports= mongoose.model("cabinSummary", cabinSummarySchema)

module.exports.findDocumentCabinSummary = async( topic,cb ) =>{
    var day =funcMqtt.getDay();
    await cabinSummary.findOne({device_id:topic ,day:day } ,cb)
}
module.exports.createDocumentCabinSummary = async(topic,dataSummary,cb ) =>{
    var day =funcMqtt.getDay();
    var date = new Date()
    var newSummary = new cabinSummary( {
        device_id : topic ,
        nSamplesSummary:1,
        day : day,
        first :date.getTime(),
        last :date.getTime(),
        samplesSummary:[
            dataSummary
        ]

      })
    newSummary.save(cb)
}
module.exports.addDocumentCabinSummary = async ( topic,samplesSummary ) =>{
var day =funcMqtt.getDay();
    await cabinSummary.updateOne({device_id: topic , day:day},
        {$push:{samplesSummary:samplesSummary},
        $min: { first: samplesSummary.time},
        $max: { last: samplesSummary.time},
        $inc: { nSamplesSummary: 1} 
    } )
}

module.exports.findSumaryOneHours = async (device_id) =>{
    var dataSummary =[];
    var date = new Date()
    const minHours = parseFloat(date.getTime()-3600*1000);
    var day =funcMqtt.getDay();
    const data = await cabinSummary.find({device_id :device_id, day: day}).exec();
    if( ! func.checkArray(data))
    {
        var timeData =data[0].samplesSummary;
        for (let i = 0; i < timeData.length; i++) {
            let time =parseFloat(timeData[i].time)
            if(minHours <= time)
            {
                dataSummary.push(timeData[i]);
            }
             
         }
         
    }
     

    return dataSummary;
}

module.exports.findSumaryDays = async (device_id) =>{
    var day =funcMqtt.getDay();
    const data = await cabinSummary.find({device_id :device_id, day: day}).exec();
    if( ! func.checkArray(data))
    {
        return  data[0].samplesSummary
    }
    else
    {
        return []
    }
    
}

module.exports.findSumaryWeeks = async (device_id) =>{

    var dataSummary =[];
    var date = new Date()
    const minHours = parseFloat(date.getTime()-7*24*3600*1000);
    const data = await cabinSummary.find({device_id :device_id});
    for (let i = 0; i < data.length; i++) {
        var timeData =data[i].samplesSummary;
        for (let i = 0; i < timeData.length; i++) {
            let time =parseFloat(timeData[i].time)
            if(minHours <= time)
            {
                dataSummary.push(timeData[i]);
            }
             
        }  
    }
     
    return dataSummary;
}