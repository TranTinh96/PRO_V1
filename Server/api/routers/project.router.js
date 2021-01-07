var express = require('express');
var router = express.Router();

var projectController = require("../controllers/projectController")
var userController = require("../controllers/userController")


//Admin setting
router.get("/setting" ,projectController.getDataProject)
router.post("/setting",projectController.postSetting)
router.delete("/setting/:id", projectController.deleteProject);

// Admin Accout
router.get("/open-accout",userController.getUser)
router.post("/open-accout",userController.createAccout)
router.put("/open-accout/:id/:role",userController.updateAccout)
router.delete("/open-accout/:id",userController.deleteUser)

// Manager Accout
router.post("/project/infomation" ,projectController.postInfoProject)
router.post("/project/get-user",userController.getUserManage)
router.post("/project/open-accout",userController.createAccoutManage)
router.put("/project/:id/:role",userController.updateAccout)
router.delete("/project/:id",userController.deleteUser)


module.exports = router;