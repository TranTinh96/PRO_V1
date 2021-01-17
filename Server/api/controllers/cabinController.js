var cabinSummary = require("../models/data/cabinSummary.model");
var cabinPhaseOne = require("../models/data/cabinPhaseOne.model");
var cabinPhaseTwo = require("../models/data/cabinPhaseTwo.model");
var cabinPhaseThree = require("../models/data/cabinPhaseThree.model");
var cabinAlarm = require("../models/cabinAlarms.model");
var cabinRelay = require("../models/cabinRelay.model");

var Project = require("../models/project.model");

var func = require("../../middlewares/func.Middleware");

/**
 *  Data Table
 */

module.exports.postDataHours = async (req, res, next) => {
  let device_id = req.body._idProject;
  var dataSummary = await cabinSummary.findSumaryOneHours(device_id);
  var dataPhaseOne = await cabinPhaseOne.findPhaseOne_OneHours(device_id);
  var dataPhaseTwo = await cabinPhaseTwo.findPhaseTwo_OneHours(device_id);
  var dataPhaseThree = await cabinPhaseThree.findPhaseThree_OneHours(device_id);
  res.json({
    dataSummary: dataSummary,
    dataPhaseOne: dataPhaseOne,
    dataPhaseTwo: dataPhaseTwo,
    dataPhaseThree: dataPhaseThree,
  });
};

module.exports.postDataDays = async (req, res, next) => {
  let device_id = req.body._idProject;
  var dataSummary = await cabinSummary.findSumaryDays(device_id);
  var dataPhaseOne = await cabinPhaseOne.findPhaseOneDays(device_id);
  var dataPhaseTwo = await cabinPhaseTwo.findPhaseTwoDays(device_id);
  var dataPhaseThree = await cabinPhaseThree.findPhaseThreeDays(device_id);
  res.json({
    dataSummary: dataSummary,
    dataPhaseOne: dataPhaseOne,
    dataPhaseTwo: dataPhaseTwo,
    dataPhaseThree: dataPhaseThree,
  });
};

module.exports.postDataWeeks = async (req, res, next) => {
  let device_id = req.body._idProject;
  var dataSummary = await cabinSummary.findSumaryWeeks(device_id);
  var dataPhaseOne = await cabinPhaseOne.findPhaseOneWeeks(device_id);
  var dataPhaseTwo = await cabinPhaseTwo.findPhaseTwoWeeks(device_id);
  var dataPhaseThree = await cabinPhaseThree.findPhaseThrewwWeeks(device_id);
  res.json({
    dataSummary: dataSummary,
    dataPhaseOne: dataPhaseOne,
    dataPhaseTwo: dataPhaseTwo,
    dataPhaseThree: dataPhaseThree,
  });
};

module.exports.postInitData = async (req, res, next) => {
  let device_id = req.body._idProject;
  var dataSummary = await cabinSummary.findOneInitSummary(device_id);
  var dataPhaseOne = await cabinPhaseOne.findOneInitPhaseOne(device_id);
  var dataPhaseTwo = await cabinPhaseTwo.findOneInitPhaseTwo(device_id);
  var dataPhaseThree = await cabinPhaseThree.findOneInitPhaseThree(device_id);
  res.json({
    dataSummary: dataSummary,
    dataPhaseOne: dataPhaseOne,
    dataPhaseTwo: dataPhaseTwo,
    dataPhaseThree: dataPhaseThree,
  });
};

/**
 *  Alarm
 */
module.exports.postCreateTagAlarm = async (req, res, next) => {
  var reqBody = req.body;
  let device_id = reqBody._idProject;
  var samplesAlarm = {
    name: reqBody.nameTag,
    HH: reqBody.HH,
    H: reqBody.H,
    L: reqBody.L,
    LL: reqBody.LL,
    Rate: reqBody.Rate,
  };
  cabinAlarm.addCabinAlarm(device_id, samplesAlarm);
  res.json({
    status: "Success",
  });
};

module.exports.getTagAlarm = async (req, res, next) => {
  let device_id = req.body._idProject;
  cabinAlarm.getCabinAlarm(device_id, (err, dataAlarm) => {
    if (!err && !func.checkNull(dataAlarm)) {
      res.json({
        dataAlarm: dataAlarm[0].samples,
        status: true,
      });
    } else {
      res.json({
        status: false,
      });
    }
  });
};

module.exports.updateTagAlarm = async (req, res, next) => {
  var reqBody = req.body;
  var device_id = reqBody._idProject;
  var index = reqBody.index;
  var dataEditAlarm = reqBody.dataEditAlarm;
  cabinAlarm.getCabinAlarm(device_id, (err, dataAlarm) => {
    if (!err && !func.checkNull(dataAlarm)) {
      var arrDataAlarm = dataAlarm[0].samples;
      for (let i = 0; i < arrDataAlarm.length; i++) {
        if (i == index) {
          arrDataAlarm[i].HH = dataEditAlarm.HH;
          arrDataAlarm[i].H = dataEditAlarm.H;
          arrDataAlarm[i].L = dataEditAlarm.L;
          arrDataAlarm[i].LL = dataEditAlarm.LL;
          arrDataAlarm[i].Rate = dataEditAlarm.Rate;
        }
      }
      cabinAlarm.editCabinAlarm(device_id, arrDataAlarm);
    } else {
      res.json({
        status: false,
      });
    }
  });
};

module.exports.deleteTagAlarm = async (req, res, next) => {
  var reqBody = req.body;
  var device_id = reqBody._idProject;
  var index = reqBody.index;
  cabinAlarm.getCabinAlarm(device_id, (err, dataAlarm) => {
    if (!err && !func.checkNull(dataAlarm)) {
      var arrDataAlarm = dataAlarm[0].samples;
      arrDataAlarm.splice(index, 1);
      cabinAlarm.editCabinAlarm(device_id, arrDataAlarm);
    } else {
      res.json({
        status: false,
      });
    }
  });
};

/**
 * Accout
 */
module.exports.infoAccout = async (req, res, next) => {
  var reqBody = req.body;
  var tokenProject = reqBody._idProject;
  Project.getByTokenProject(tokenProject, (err, project) => {
    if (!err && !func.checkNull(project)) {
      res.json({
        status: true,
        project: project,
      });
    } else {
      res.json({
        status: false,
      });
    }
  });
};

/**
 * Relay
 */

module.exports.postUpdateCabinRelay = async (req, res, next) => {
  var reqBody = req.body;
  let device_id = reqBody._idProject;
  console.log(reqBody)
  cabinRelay.editCabinRelay(device_id ,"online",reqBody.arrayRelay);
  res.json({
    status: true,
  });
};


module.exports.getCabinRelay = async (req, res, next) => {
  var topic = req.body._idProject;
  const samplesRelayInit = [
    {
      name: "RLA",
      mode: "manual",
      timeOn: "00:00",
      timeOff: "00:00",
      status: "off",
    },
    {
      name: "RLB",
      mode: "manual",
      timeOn: "00:00",
      timeOff: "00:00",
      status: "off",
    },
  ];
  if(! func.checkNull(topic)){
    cabinRelay.findCabinRelay(topic, (err, dataRelay) => {
      if (!err && !func.checkArray(dataRelay)) {
        cabinRelay.getCabinRelay(topic, (err, dataRelay) => {
          if (!err && !func.checkUndefined(dataRelay) && dataRelay.length >0) {
            res.json({
              success: true,
              dataRelay: dataRelay[0].samples,
              status: true,
            });
          } else {
            res.json({
              success: true,
              status: false,
            });
          }
        });
      } else {
        cabinRelay.addCabinRelay(topic, "offline", samplesRelayInit);
      }
    });
  }
  
};