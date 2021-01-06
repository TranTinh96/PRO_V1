var mongoose = require('mongoose');
const func = require("../../middlewares/func.Middleware")
const funcMqtt = require("../../middlewares/mqtt.Middleware")
var Schema = mongoose.Schema;

var cabinAlarmSchema = new Schema({

    device_id :{
        type: String,
        unique :true,
        required :true
    },
    samples:[{
        name : String ,
        HH : Number ,
        H : Number ,
        L : Number ,
        LL : Number ,
        Rate : Number ,
        valueTag :{
            type :Number ,
            default :0
        },
        status :{
            type : String ,
            enum: [
                "HH",
                "H",
                "L" ,
                "L",
                "OK"
            ],
            default :"OK"
        }
      
    }]
    
})

var cabinAlarm = module.exports= mongoose.model("cabinAlarm", cabinAlarmSchema)


module.exports.addCabinAlarm= async ( device_id,samplesAlarm ) =>{
    await cabinAlarm.updateOne({device_id:device_id},
        {$push:{samples :samplesAlarm},
    },{ upsert: true } )
}

module.exports.editCabinAlarm= async ( device_id,samplesAlarm ) =>{
    await cabinAlarm.deleteOne({device_id:device_id})
    await cabinAlarm.updateOne({device_id:device_id},
        {$push:{samples :samplesAlarm},
    },{ upsert: true } )
}

module.exports.editCabinAlarmTag= async ( device_id,samplesAlarm ) =>{
    await cabinAlarm.deleteOne({device_id:device_id})
    await cabinAlarm.updateOne({device_id:device_id , samples :samplesAlarm},{ upsert: true } )
}


module.exports.deleteCabinAlarm= async ( device_id,samplesAlarm ) =>{
    await cabinAlarm.updateOne({device_id:device_id},
        {$push:{samples :samplesAlarm},
    },{ upsert: true } )
}

module.exports.getCabinAlarm= async ( device_id ,cb) =>{
    await cabinAlarm.find({device_id:device_id},cb)
}


module.exports.findCabinAlarm= async ( device_id ,cb) =>{
    await cabinAlarm.find({device_id:device_id},cb)
}


