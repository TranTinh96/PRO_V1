var User = require("../../models/user.model")
const { options } = require("../routers/project.router")


module.exports.createAccout = async(req,res,next) =>{
    var reqGmail = req.body.email
    var newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        role : req.body.role ,
        project_id: req.body.project_id
    })
    User.getUserByEmail(reqGmail, (err, email) => {
        if (err) throw err;
        if (!email) {
            User.createAccout(newUser, (err, user) => {
                if (err) throw err
                if (!user) {
                    res.json({
                        success: false,
                        isEmail :true ,
                        message: "New User Register Fail"
                        
                    })
                } else {
                    res.json({
                        success: true,
                        isEmail :true ,
                        message: "New user register success"
                    })
                }
            })
        }
        else {
            res.json({
                success: false,
                isEmail :false ,
                message: "Email Already Exits . Please enter a vaild others"
            })
        }
    })
 
 }
 //Get All User
 module.exports.getUser = async(req,res,next) =>{
   
     User.getAllUser((err,user)=>{
         if(err){
             res.json({
                 success :false ,
                 message : " Data user get success !",
             })
         }else{
          res.json({
              success :true ,
              message : "Data user get fail !",
              data : user
          })
         }
     })
  
  }
//Update Accout
module.exports.updateAccout = async(req,res)=>{
    var _id =  req.params.id;
    var role =  req.params.role;
    User.findByIdAndUpdate(_id ,{role :role} ,options,(err,user)=>{
        if(err){
            res.json({
                success :false ,
                message : "User edit Fail"
            })
        }else{
            res.json({
                success :true ,
                message : "User edit success",
            })
        
        }
    })
}
//Delete Project
module.exports.deleteUser = async(req,res)=>{
    var userID =  req.params.id;
    User.deleteUser( userID ,(err,user)=>{
        if(err){
            res.json({
                success :false ,
                message : "Project delete Fail"
            })
        }else{
            res.json({
                success :true ,
                message : "User delete Success",
            })
        
        }
    })
 

} 