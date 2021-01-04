var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var date = new Date()
var day = date.toISOString().substring(0, 10)

var cabinPhaseTwoSchema = new Schema({

    device_id :{
        type: String,
        unique :true,
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
        time    :   Schema.Types.Decimal128
    }]
})

var cabinPhaseTwo = module.exports= mongoose.model("cabinPhaseTwo", cabinPhaseTwoSchema)

module.exports.findDocumentCabinPhaseTwo = async( deviceID,cb ) =>{
    await cabinPhaseTwo.findOne({device_id:deviceID} ,cb)
}
module.exports.createDocumentCabinPhaseTwo = async(topic,dataPhaseTwo,cb ) =>{
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
 var res= await cabinPhaseTwo.updateOne({device_id:topic ,day:day},
        {$push:{samplesPhaseTwo:samplesPhaseTwo},
        $min: { first: samplesPhaseTwo.time},
        $max: { last: samplesPhaseTwo.time},
        $inc: { nSamplesPhaseTwo: 1} 
    })
}