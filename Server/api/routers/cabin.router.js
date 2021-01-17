var express = require('express');
var router = express.Router();

var cabinController = require("../controllers/cabinController")


/**
 * Data Table
 */
router.post("/dataTimeHours" ,cabinController.postDataHours)
router.post("/dataTimeDays" ,cabinController.postDataDays)
router.post("/dataTimeWeeks" ,cabinController.postDataWeeks)

/**
 * Alarm
 */
 
 router.post ("/alarm/create-tag" ,cabinController.postCreateTagAlarm);
 router.post ("/alarm/get-tag" ,cabinController.getTagAlarm);
 router.post ("/alarm/edit-tag" ,cabinController.updateTagAlarm);
 router.post ("/alarm/delete-tag" ,cabinController.deleteTagAlarm);

 //Accouts
router.post("/accouts/information",cabinController.infoAccout)

//Relay
router.post ("/relay/update" ,cabinController.postUpdateCabinRelay);
router.post ("/relay/info" ,cabinController.getCabinRelay);


module.exports = router;