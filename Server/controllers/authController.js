var jwt = require('jsonwebtoken');
var Project = require("../api/models/project.model");
var User = require("../models/user.model");
var tokenVerification = require("../models/tokenVerification.model.js")
var func = require("../middlewares/func.Middleware")
var mailer = require("../config/sendGmail")
var crypto = require("crypto")
var _idProject = null

//Post Token Project
module.exports.postTokenProject = async (req, res) => {
    var tokenID = req.body.tokenID;
    Project.getByTokenProject(tokenID, (err, project) => {
        if (err || func.checkNull(project)) {
            res.json({
                success: false,
                message: "You don't access register accout"
            })
            console.log(err)
        } else {
            res.json({
                success: true,
                message: "You access register accout",
                projectID :project._id
            })
        }
    })
}

//Post Register
module.exports.postRegister = async (req, res) => {
    var reqGmail = req.body.email
    var newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        project_id: req.body.project_id
    })
    User.getUserByEmail(reqGmail, (err, email) => {
        if (err) throw err;
        if (!email) {
            User.createUser(newUser, (err, user) => {
                if (err) throw err
                if (!user) {
                    res.json({
                        success: false,
                        isEmail :true ,
                        message: "New User Register Fail"
                    })
                } else {
                    // Create a verification token for this user
                    var token = new tokenVerification({ user_id: user._id, token: crypto.randomBytes(16).toString('hex') });
                    // Save the verification token
                    token.save(async (err) => {
                        if (err) {
                            res.json({
                                success: false,
                                isEmail :true ,
                                message: "Create don't token"
                            })
                        }
                        else {
                            await mailer.sendMail(user, req, token, (err, info) => {
                                if (err) {
                                    console.log(err)
                                    res.json({
                                        success: false,
                                        isEmail :true ,
                                        message: "Send don't success"
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
                    })
                    //End token
                }
            })
        }
        else {
            res.json({
                success: false,
                isEmail :false ,
                message: "Email already exits . Please enter a vaild others"
            })
        }
    })

}

//Post Login
module.exports.postLogin = async (req, res) => {
    var reqGmail = req.body.email
    var passwordBefore = req.body.password
    var jwtToken  ;
    User.getUserByEmail(reqGmail, (err, user) => {
        if (err) throw err;
        if (user) {
            if (user.isVerified) {
                User.comparePassword(user, passwordBefore, (err, vaildPassword) => {
                    if (err) throw err;
                    if (!vaildPassword) {
                        res.json({
                            success: false,
                            message: "Invalid password",
                            email: true
                        })
                    } else {
                        if(!(user.role == "ROLE_ADMIN"))
                        {
                            Project.getProjectById(user.project_id ,(err,project)=> {
                               if (err) throw err;
                               if(project){
                                   _idProject = project.tokenProject
                               }
                               
                            })
                        
                            jwtToken = jwt.sign({
                                id: user._id,
                                user: user.userName,
                                email: user.email,
                                role: user.role,
                                project_id :_idProject,
                                expires: "1"
                            }, process.env.JWT_KEY_SECRET, {
                                expiresIn: "1h"
                            });
                        }
                        else{
                            jwtToken = jwt.sign({
                                id: user._id,
                                user: user.userName,
                                email: user.email,
                                role: user.role,
                                expires: "1"
                            }, process.env.JWT_KEY_SECRET, {
                                expiresIn: "1h"
                            });
                        }
                        res.json({
                            success: true,
                            message: "User Login Success",
                            email: true,
                            token: jwtToken
             
                        })
                        
                    }
                })
            }
            else {
                res.json({
                    success: false,
                    message: "You don't verification email",
                    email: true
                })
            }

        } else {
            res.json({
                success: false,
                message: "Email don't found . Please enter a vaild email other",
                email: false
            })
        }
    })


}

//Post Confirmation Email
module.exports.postConfirmationEmail = async (req, res) => {
    var reqToken = req.body.token;
    console.log(reqToken)
    tokenVerification.getByToken(reqToken, (err, token) => {
        if (err) throw err;
        if (!func.checkNull(token)) {
            User.getUserById(token.user_id, (err, user) => {
                if (err) throw err;
                if (!func.checkNull(user)) {
                    user.isVerified = true;
                    user.save(err => {
                        if (!err) {
                            res.json({
                                success: true,
                                message: "Code verifid and Update Users success "
                            })
                        }
                    })
                } else {
                    res.json({
                        success: false,
                        message: "User don't search "
                    })
                }
            })

        } else {
            res.json({
                success: false,
                message: "Code expire or Fail ! Please resending code  "
            })
        }
    })
}


//Resend Token
module.exports.postResendConfirmEmail = async (req, res) => {
    var reqGmail = req.body.email
    User.getUserByEmail(reqGmail, (err, user) => {
        if (err) throw err;
        if (user) {
            // Create a verification token for this user
            var token = new tokenVerification({ user_id: user._id, token: crypto.randomBytes(16).toString('hex') });
            // Save the verification token
            token.save(async (err) => {
                if (err) {
                    res.json({
                        success: false,
                        message: "Create don't token",
                        isEmail :true
                    })
                }
                else {
                    await mailer.sendMail(user, req, token, (err, info) => {
                        if (err) {
                            console.log(err)
                            res.json({
                                success: false,
                                message: "Send don't success",
                                isEmail :true
                            })
                        } else {
                            res.json({
                                success: true,
                                message: "New user register success",
                                isEmail :true
                            })
                        }
                    })
                }
            })
            //End token
        }
        else {
            res.json({
                success: false,
                message: "Address email don't exits",
                isEmail :false
            })
        }
    })

}


