var mongoose = require('mongoose');
const func = require("../../middlewares/func.Middleware")
const funcMqtt = require("../../middlewares/mqtt.Middleware")
var Schema = mongoose.Schema;

var cabinRelaySchema = new Schema({

    device_id :{
        type: String,
        unique :true,
        required :true
    },
    samples:[{
        name : String ,
        mode : {
            type :String ,
            enum :['Auto' ,'Manual'],
            default : "manual"
        } ,
        timeOn :String ,
        timeOff : String ,
        status : {
            type : Boolean ,
            default:false
        }
      
    }]
})

var cabinRelay = module.exports= mongoose.model("cabinRelay", cabinRelaySchema)


module.exports.addCabinRelay= async ( device_id,samplesRelay ) =>{
    await cabinRelay.updateOne({device_id:device_id},
        {$push:{samples :samplesRelay},
    },{ upsert: true } )
}


module.exports.getCabinRelay= async ( device_id ,cb) =>{
    await cabinRelay.find({device_id:device_id},cb)
}


module.exports.findCabinRelay= async ( device_id ,cb) =>{
    await cabinRelay.find({device_id:device_id},cb)
}