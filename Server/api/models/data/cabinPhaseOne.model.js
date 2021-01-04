var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var date = new Date()
var day = date.toISOString().substring(0, 10)

var cabinPhaseOneSchema = new Schema({

    device_id :{
        type: String,
        unique :true,
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
        time    :   Schema.Types.Decimal128
    }]
})

var cabinPhaseOne = module.exports= mongoose.model("cabinPhaseOne", cabinPhaseOneSchema)

module.exports.findDocumentCabinPhaseOne = async( deviceID,cb ) =>{
    await cabinPhaseOne.findOne({device_id:deviceID} ,cb)
}
module.exports.createDocumentCabinPhaseOne = async(topic,dataPhaseOne,cb ) =>{
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
 var res= await cabinPhaseOne.updateOne({device_id:topic ,day:day},
        {$push:{samplesPhaseOne:samplesPhaseOne},
        $min: { first: samplesPhaseOne.time},
        $max: { last: samplesPhaseOne.time},
        $inc: { nSamplesPhaseOne: 1} 
    })
}