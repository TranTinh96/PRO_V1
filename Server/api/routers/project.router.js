var express = require('express');
var router = express.Router();

var projectController = require("../controllers/projectController")
var userController = require("../controllers/userController")


//Admin setting
router.get("/setting" ,projectController.getDataProject)
router.post("/setting",projectController.postSetting)
router.post("/setting/delete", projectController.deleteProject);

// Admin Accout
router.get("/open-accout",userController.getUser)
router.post("/open-accout",userController.createAccout)
router.post("/open-accout/edit",userController.updateAccout)
router.post("/open-accout/delete",userController.deleteUserAdmin)

// Manager Accout
router.post("/project/infomation" ,projectController.postInfoProject)
router.post("/project/get-user",userController.getUserManage)
router.post("/project/open-accout",userController.createAccoutManage)
router.post("/project/edit",userController.updateAccoutManage)
router.post("/project/delete",userController.deleteUserManage)


module.exports = router;