var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cabinSummarySchema = new Schema({
    _id : Schema.Types.ObjectId,
    deviceID :{
        type: String,
        unique :true,
        required :true

    },
    day :{
        type:Date ,
        required:true
    },

    summaryData:[{
        data :{
            type:String,
            unique :true ,
            required :true
        },
        time :{
            type : Date,
            required :true
        }
    }]

   
})

var cabinSummary = module.exports= mongoose.model("cabinSummary", cabinSummarySchema)