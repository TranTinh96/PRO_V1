var express = require('express');
var router = express.Router();

var projectController = require("../controllers/projectController")
var userController = require("../controllers/userController")


//Project
router.get("/setting" ,projectController.getDataProject)
router.post("/setting",projectController.postSetting)
router.delete("/setting/:id", projectController.deleteProject);
// User
router.get("/open-accout",userController.getUser)
router.post("/open-accout",userController.createAccout)
router.put("/open-accout/:id/:role",userController.updateAccout)
router.delete("/open-accout/:id",userController.deleteUser)


module.exports = router;