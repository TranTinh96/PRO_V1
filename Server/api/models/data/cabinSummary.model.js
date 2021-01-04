var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var date = new Date()
var day = date.toISOString().substring(0, 10)

var cabinSummarySchema = new Schema({

    device_id :{
        type: String,
        unique :true,
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
        time    :   Schema.Types.Decimal128
    }]
})

var cabinSummary = module.exports= mongoose.model("cabinSummary", cabinSummarySchema)

module.exports.findDocumentCabinSummary = async( deviceID,cb ) =>{
    await cabinSummary.findOne({device_id:deviceID} ,cb)
}
module.exports.createDocumentCabinSummary = async(topic,dataSummary,cb ) =>{
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
 var res= await cabinSummary.updateOne({device_id:topic ,day:day},
        {$push:{samplesSummary:samplesSummary},
        $min: { first: samplesSummary.time},
        $max: { last: samplesSummary.time},
        $inc: { nSamplesSummary: 1} 
    })
}