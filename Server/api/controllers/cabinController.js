var cabinSummary = require("../models/data/cabinSummary.model")
var cabinPhaseOne = require("../models/data/cabinPhaseOne.model")
var cabinPhaseTwo = require("../models/data/cabinPhaseTwo.model")
var cabinPhaseThree = require("../models/data/cabinPhaseThree.model")
var date = new Date()
var day = date.toISOString().substring(0, 10)

module.exports.getDataSummary = async(req,res,next) =>{
    var dataSummary = await cabinSummary.findSumaryOneHours();
    res.send(dataSummary)
 }