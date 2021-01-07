var mongoose = require('mongoose');
const Project = require('../api/models/project.model');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var crypto = require("crypto")
var validator = require('validator');

const bcryptSalt = parseInt(process.env.BCRYPT_SALT)


var userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    role: {
        type: String,
        enum: [
            "ROLE_ADMIN",
            "ROLE_SEE",
            "ROLE_CONTROL" ,
            "ROLE_MANAGER"
        ],
        default: "ROLE_SEE"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    password: { 
        type: String ,
        required :true
    },
    /*
    passwordResetToken : String,
    passwordResetExpires : Date ,
    */
    project_id :{
        type : mongoose.Schema.Types.ObjectId ,
        ref : Project ,
    },
 

})

var User = module.exports = mongoose.model("User", userSchema)

module.exports.getUserById = async (id, cb) => {
    await User.findById(id, cb)
};

module.exports.getUserByEmail = async (email, cb) => {
    await User.findOne({ email: email }, cb)
};
module.exports.createUser = async (newUser, cb) => {
    bcrypt.genSalt(bcryptSalt, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(cb)
        })
    });

};

module.exports.createAccout = async (newUser, cb) => {
    bcrypt.genSalt(bcryptSalt, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.isVerified =true ;
            newUser.save(cb)
        })
    });

};

module.exports.comparePassword = (user, passwordBefore, cb)=> {
    bcrypt.compare(passwordBefore,user.password,(err, vaildPassword) => {
        if (err) throw err;
        cb(null, vaildPassword)
    })

}

module.exports.deleteAllUser =async (projectID, cb)=>{
     await User.deleteMany({project_id : projectID},cb)
}


module.exports.getAllUser =async( cb ) =>{
    await User.find(cb);
}
module.exports.deleteUser = async(id,cb)=>{
    await User.deleteOne({_id : id},cb);
}

module.exports.getUserManage =async( project_id ,cb ) =>{
   await User.find({project_id:project_id} ,cb);
}