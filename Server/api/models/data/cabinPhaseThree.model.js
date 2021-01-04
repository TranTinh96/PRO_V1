var mongoose = require('mongoose');
const func = require("../../../middlewares/func.Middleware")

var Schema = mongoose.Schema;
var date = new Date()
var day = date.toISOString().substring(0, 10)

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
        time    :   Schema.Types.Decimal128
    }]
})

var cabinPhaseThree = module.exports= mongoose.model("cabinPhaseThree", cabinPhaseThreeSchema)

module.exports.findDocumentCabinPhaseThree = async( deviceID,cb ) =>{
    await cabinPhaseThree.findOne({device_id:deviceID} ,cb)
}
module.exports.createDocumentCabinPhaseThree = async(topic,dataPhaseThree,cb ) =>{
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
 var res= await cabinPhaseThree.updateOne({device_id:topic ,day:day},
        {$push:{samplesPhaseThree:samplesPhaseThree},
        $min: { first: samplesPhaseThree.time},
        $max: { last: samplesPhaseThree.time},
        $inc: { nSamplesPhaseThree: 1} 
    })
}

module.exports.findPhaseThree_OneHours = async (device_id) =>{
    var dataPhaseThree =[];
    const minHours = parseFloat(date.getTime()-3600*1000);
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