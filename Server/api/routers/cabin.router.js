var express = require('express');
var router = express.Router();

var cabinController = require("../controllers/cabinController")

router.get("/summary" ,cabinController.getDataSummary)


module.exports = router;