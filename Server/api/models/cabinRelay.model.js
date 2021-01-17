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

    cabinStatus :{
        type  :String ,
        enum :['online' ,'offline'] ,
        default :"offline"
    },
    samples:[{
        name : {
            type :String ,
            enum :['RLA' ,'RLB']
        } ,
        mode : {
            type :String ,
            enum :['auto' ,'manual'],
            default : "manual"
        } ,
        timeOn :{
           type:  String ,
           default : "00:00"
        } ,
        timeOff :{
            type:  String ,
            default : "00:00"
         } ,
        status : {
            type : String ,
            enum :['on','off'],
            default:'off'
        }
      
    }]
})

var cabinRelay = module.exports= mongoose.model("cabinRelay", cabinRelaySchema)


module.exports.addCabinRelay= async ( device_id ,cabinStatus,samplesRelay ) =>{
    await cabinRelay.updateOne({device_id:device_id ,cabinStatus:cabinStatus},
        {$push:{samples :samplesRelay},
    },{ upsert: true } )
}

module.exports.editCabinRelay= async ( device_id, cabinStatus , samplesRelay) =>{
    await cabinRelay.deleteOne({device_id:device_id})
    await cabinRelay.updateOne({device_id:device_id ,cabinStatus :cabinStatus},
        {$push:{samples :samplesRelay},
    },{ upsert: true } )
}

module.exports.getCabinRelay= async ( device_id ,cb) =>{
    await cabinRelay.find({device_id:device_id},cb)
}


module.exports.findCabinRelay= async ( device_id ,cb) =>{
    await cabinRelay.find({device_id:device_id},cb)
}