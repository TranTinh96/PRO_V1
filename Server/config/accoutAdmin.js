
var User = require("../models/user.model");
var func = require("../middlewares/func.Middleware")

    
//Check create admin accout yes ? no
exports.checkAccoutAdmin= async()=>{
    var reqGmail = process.env.ADMIN_MAIL;
    var resultGmail =   await User.findOne({ email: reqGmail })
    if(func.checkNull(resultGmail)){
        return true;
    }   
    return false;
},

//Create accout admin
exports.createAccoutAdmin=()=>{
    var newUser = new User({
        userName: process.env.ADMIN_NAME,
        email: process.env.ADMIN_MAIL,
        password: process.env.ADMIN_PASSWORD,
        isVerified :true ,
        role:"ROLE_ADMIN"
    })
    User.createUser(newUser, function(err, user) {
        if (err) throw err;
        console.log("Create Accout Admin Sucess !")
    })
   
}



