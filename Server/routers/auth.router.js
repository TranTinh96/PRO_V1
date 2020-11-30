var express = require('express');
var router = express.Router();
var authController = require("../controllers/authController");


router.post("/register/token-project" ,authController.postTokenProject)
router.post("/register", authController.postRegister)
router.post("/login",authController.postLogin)
router.post("/confirmation",authController.postConfirmationEmail)
router.post("/resend",authController.postResendConfirmEmail)

//Exports
module.exports = router;