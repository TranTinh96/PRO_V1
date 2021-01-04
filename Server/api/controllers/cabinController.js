var cabinSummary = require("../models/data/cabinSummary.model")
var cabinPhaseOne = require("../models/data/cabinPhaseOne.model")
var cabinPhaseTwo = require("../models/data/cabinPhaseTwo.model")
var cabinPhaseThree = require("../models/data/cabinPhaseThree.model")
var date = new Date()
var day = date.toISOString().substring(0, 10)

module.exports.postDataHours = async(req,res,next) =>{
    let device_id = req.body._idProject;
    var dataSummary = await cabinSummary.findSumaryOneHours(device_id);
    var dataPhaseOne = await cabinPhaseOne.findPhaseOne_OneHours(device_id);
    var dataPhaseTwo = await cabinPhaseTwo.findPhaseTwo_OneHours(device_id);
    var dataPhaseThree = await cabinPhaseThree.findPhaseThree_OneHours(device_id);
    res.json({
        dataSummary :dataSummary ,
        dataPhaseOne : dataPhaseOne ,
        dataPhaseTwo : dataPhaseTwo ,
        dataPhaseThree : dataPhaseThree
    })
 }

 module.exports.postDataDays = async(req,res,next) =>{
    let device_id = req.body._idProject;
    var dataSummary = await cabinSummary.findSumaryDays(device_id);
    var dataPhaseOne = await cabinPhaseOne.findPhaseOneDays(device_id);
    var dataPhaseTwo = await cabinPhaseTwo.findPhaseTwoDays(device_id);
    var dataPhaseThree = await cabinPhaseThree.findPhaseThreeDays(device_id);
    res.json({
        dataSummary :dataSummary ,
        dataPhaseOne : dataPhaseOne ,
        dataPhaseTwo : dataPhaseTwo ,
        dataPhaseThree : dataPhaseThree
    })
 }

 module.exports.postDataWeeks = async(req,res,next) =>{
    let device_id = req.body._idProject;
    var dataSummary = await cabinSummary.findSumaryOneHours(device_id);
    var dataPhaseOne = await cabinPhaseOne.findPhaseOne_OneHours(device_id);
    var dataPhaseTwo = await cabinPhaseTwo.findPhaseTwo_OneHours(device_id);
    var dataPhaseThree = await cabinPhaseThree.findPhaseThree_OneHours(device_id);
    res.json({
        dataSummary :dataSummary ,
        dataPhaseOne : dataPhaseOne ,
        dataPhaseTwo : dataPhaseTwo ,
        dataPhaseThree : dataPhaseThree
    })
 }