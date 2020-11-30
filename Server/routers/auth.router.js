var express = require('express');
var router = express.Router();
var authController = require("../controllers/authController");


//Token Verification
router.post("/register/token-project" ,authController.postTokenProject)

//Create User
router.post("/register", authController.postRegister)
 
//Login 
router.post("/login",authController.postLogin)


router.post("/confirmation",authController.postConfirmationEmail)

router.post("/resend",authController.postResendConfirmEmail)


//Exports
module.exports = router;