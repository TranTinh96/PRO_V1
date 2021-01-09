var User = require("../../models/user.model")
const { options } = require("../routers/project.router")
var Project = require("../models/project.model")


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
    User.updateUser(req.body.record.email , req.body.role ,(err ,user)=>{
        if(!err){
            res.json({
                status :true
            })
        }
        else
        {
            res.json({
                status :false
            })
        }
    })
}
//Delete Project
module.exports.deleteUserAdmin = async(req,res)=>{
    var userEmail =  req.body.email;
    User.deleteUserAdmin( userEmail ,(err,user)=>{
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
//-----------------------------------------------------------------------------------------------------
/**
 *  Manage
 */
module.exports.createAccoutManage = async(req,res,next) =>{
    var reqGmail = req.body.email ;
    var _idProject = req.body.project_id ;
    var newUser;
    Project.getByTokenProject(_idProject ,(err,project)=>{
        if(!err){
            newUser = new User({
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password,
                role : req.body.role ,
                project_id : project._id
            })
        }
       
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

 module.exports.getUserManage = (req,res,next) =>{
   
    var _idProject = req.body._idProject;
    Project.getByTokenProject(_idProject ,(err,project) =>{
            if(! err){
                  User.getUserManage(project._id ,(err,user)=>{
                    if( !err){
                        res.json({
                            status :true ,
                            users : user
                        })
                    }
                    else{
                        res.json({
                            status : false
                        })
                    }
                  });

            }
            else
            {
                res.json({
                    status : false
                })
            }
        })
    }


module.exports.deleteUserManage = async(req,res)=>{
   User.deleteUserByEmail(req.body.email , (err ,user)=>{
   })
} 
//Update Accout
module.exports.updateAccoutManage = async(req,res)=>{
    User.updateUser(req.body.record.email , req.body.role ,(err ,user)=>{
        if(!err){
            res.json({
                status :true
            })
        }
        else
        {
            res.json({
                status :false
            })
        }
    })
}