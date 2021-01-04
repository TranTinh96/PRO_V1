var express = require('express');
var router = express.Router();

var cabinController = require("../controllers/cabinController")

router.post("/dataTimeHours" ,cabinController.postDataHours)
router.post("/dataTimeDays" ,cabinController.postDataDays)
router.post("/dataTimeWeeks" ,cabinController.postDataWeeks)


module.exports = router;