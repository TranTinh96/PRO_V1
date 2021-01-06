var express = require('express');
var router = express.Router();

var cabinController = require("../controllers/cabinController")


/**
 * Data Table
 */
router.post("/dataTimeHours" ,cabinController.postDataHours)
router.post("/dataTimeDays" ,cabinController.postDataDays)
//router.get("/dataTimeWeeks" ,cabinController.postDataWeeks)

/**
 * Alarm
 */
 
 router.post ("/alarm/create-tag" ,cabinController.postCreateTagAlarm);
 router.post ("/alarm/get-tag" ,cabinController.getTagAlarm);
 router.post ("/alarm/edit-tag" ,cabinController.updateTagAlarm);
 router.post ("/alarm/delete-tag" ,cabinController.deleteTagAlarm);




module.exports = router;