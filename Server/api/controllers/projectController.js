var Project = require("../models/project.model")
var User = require("../../models/user.model")

/*
* ADMIN
*/
module.exports.postSetting = async(req,res,next) =>{
   var newProject =new Project({
       nameProject : req.body.nameProject,
       addressProject :  req.body.addressDetail + "-" + req.body.district + "-" +req.body.provincial 
   });
   Project.createProject(newProject,(err,project)=>{
       if(err){
           res.json({
               success :false ,
               message : "New Project Add Fail"
           })
       }else{
        Project.getAllProject((err,project)=>{
            if(err){
                res.json({
                    success :false ,
                    message : "New Project Add Fail"
                })
            }else{
             res.json({
                 success :true ,
                 message : "New Project Add Success",
                 data : project
             })
            }
        })
       }
   })

}
module.exports.getDataProject = async(req,res,next) =>{
  
    Project.getAllProject((err,project)=>{
        if(err){
            res.json({
                success :false ,
                message : "New Project Add Fail",
            })
        }else{
         res.json({
             success :true ,
             message : "New Project Add Success",
             data : project
         })
        }
    })
 
 }

//Delete Project

module.exports.deleteProject = async(req,res)=>{
    var projectID =  req.params.id;
    Project.deleteProject( projectID ,(err,project)=>{
        if(err){

            res.json({
                success :false ,
                message : "Project delete Fail",
                isUser: false
            })
        }else{
            User.deleteAllUser(projectID,(err,user)=>{
                if(err){
                    res.json({
                        success :true ,
                        message : "Project delete Success but User delet Fail",
                        isUser :false
                    })

                }else{
                    res.json({
                        success :true ,
                        message : "Project and User delete Success",
                        isUser :true ,
                        data : project

                    })
                }
            })
        
        }
    })
 

} 
/**
 * MANAGE
 */

module.exports.postInfoProject = async(req,res,next) =>{
    var reqBody = req.body
    var tokenProject = reqBody._idProject;
    Project.getByTokenProject(tokenProject ,(err, project)=>{
        if( !err && !func.checkNull(project)){
            res.json({
                status: true ,
                project : project
            })
        }
        else
        {
            res.json({
                status : false
            })
        }
       });
    
 }

 


