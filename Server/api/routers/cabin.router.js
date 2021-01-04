var express = require('express');
var router = express.Router();

var cabinController = require("../controllers/cabinController")

router.post("/dataTimeHours" ,cabinController.postDataHours)


module.exports = router;