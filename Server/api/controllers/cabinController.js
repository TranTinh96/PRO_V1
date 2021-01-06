var cabinSummary = require("../models/data/cabinSummary.model")
var cabinPhaseOne = require("../models/data/cabinPhaseOne.model")
var cabinPhaseTwo = require("../models/data/cabinPhaseTwo.model")
var cabinPhaseThree = require("../models/data/cabinPhaseThree.model")
var cabinAlarm = require("../models/cabinAlarms.model")

var func =require("../../middlewares/func.Middleware")

/**
 *  Data Table
 */


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
    var dataSummary = await cabinSummary.findSumaryWeeks(device_id);
  
    res.json({
        dataSummary :dataSummary ,
    })
 }


 
/**
 *  Alarm
 */
 module.exports.postCreateTagAlarm = async(req,res,next) =>{
     var reqBody = req.body
    let device_id = reqBody._idProject;
    var samplesAlarm ={
        name :reqBody.nameTag ,
        HH :reqBody.HH,
        H : reqBody.H,
        L :reqBody.L ,
        LL : reqBody.LL,
        Rate : reqBody.Rate,
    }
    cabinAlarm.addCabinAlarm(device_id ,samplesAlarm);
    res.json ({
        status : "Success"
    })
 }

 module.exports.getTagAlarm = async(req,res,next) =>{
   let device_id = req.body._idProject;
   cabinAlarm.getCabinAlarm(device_id ,(err, dataAlarm)=>{
    if( !err && !func.checkNull(dataAlarm)){
         res.json({
             dataAlarm : dataAlarm[0].samples ,
             status : true
         })
    }
    else
    {
        res.json({
            status : false
        })
    }
   });
  
}

module.exports.updateTagAlarm = async(req,res,next) =>{
    var reqBody = req.body
    let device_id = reqBody._idProject;
    var index = reqBody .index ,
    var dataEditAlarm = reqBody.dataEditAlarm 
    cabinAlarm.getCabinAlarm(device_id ,(err, dataAlarm)=>{
        if( !err && !func.checkNull(dataAlarm)){
             var arrDataAlarm = dataAlarm.samples ;
             

        }
        else
        {
            res.json({
                status : false
            })
        }
       });
 }