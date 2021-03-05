var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User =require("./user.model")

var tokenVerificationSchema = new Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
         ref: User 
        },
    token: { 
        type: String,
         required: true
         },
    createdAt: { 
        type: Date,
         required: true, 
         default: Date.now, 
         expires: '24h' 
        }

})

var tokenVerification = module.exports = mongoose.model("tokenVerification", tokenVerificationSchema)


module.exports.getByToken = async (token, cb) => {
    await tokenVerification.findOne({ token: token }, cb)
};