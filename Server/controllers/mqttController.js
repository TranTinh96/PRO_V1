var Project = require("../api/models/project.model");
var cabinSummary = require("../api/models/data/cabinSummary.model");
var cabinPhaseOne = require("../api/models/data/cabinPhaseOne.model");
var cabinPhaseTwo = require("../api/models/data/cabinPhaseTwo.model");
var cabinPhaseThree = require("../api/models/data/cabinPhaseThree.model");
var cabinAlarm = require("../api/models/cabinAlarms.model");
var cabinRelay = require("../api/models/cabinRelay.model");

var middlewareAlarm = require("../api/middlewares/alarm.Middleware");
var func = require("../middlewares/func.Middleware");
var mqtt = require("../middlewares/mqtt.Middleware");

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

module.exports = (clientMQTT) => {
  clientMQTT.on("message", function (topic, message, packet) {
    if (topic) {
       


      Project.getByTokenProject(topic, (err, project) => {
        if (!err && !func.checkNull(project)) {
          var payloadSplit = message.toString().split("&");
          var dataSummary = mqtt.dataSummary(payloadSplit);
          var dataPhaseOne = mqtt.dataPhaseOne(payloadSplit);
          var dataPhaseTwo = mqtt.dataPhaseTwo(payloadSplit);
          var dataPhaseThree = mqtt.dataPhaseThree(payloadSplit);
          //Value Relay
          let sampleRelay  = [
            {
              name: "RLA",
              mode:  func.getKeyValueString(payloadSplit,"RLAmode",'manual'),
              timeOn:  func.getKeyValueStringTime(payloadSplit,"RLAonTime",'00:00'),
              timeOff:  func.getKeyValueStringTime(payloadSplit,"RLAoffTime",'00:00'),
              status:  func.getKeyValueString(payloadSplit,"RLAstatus","off"),
            },
            {
              name: "RLB",
              mode:  func.getKeyValueString(payloadSplit,"RLBmode",'manual'),
              timeOn:  func.getKeyValueStringTime(payloadSplit,"RLBonTime",'00:00'),
              timeOff:  func.getKeyValueStringTime(payloadSplit,"RLBoffTime",'00:00'),
              status:  func.getKeyValueString(payloadSplit,"RLBstatus","off"),
            },
          ];
          /**
           * SUMMARY
           */
          cabinSummary.findDocumentCabinSummary(topic, (err, summary) => {
            if (!err) {
              if (func.checkNull(summary)) {
                cabinSummary.createDocumentCabinSummary(
                  topic,
                  dataSummary,
                  (err, newsummary) => {
                    if (err) {
                      console.log(err);
                    }
                  }
                );
              } else {
                cabinSummary.addDocumentCabinSummary(topic, dataSummary);
              }
            }
          });

          /**
           * PhaseOne
           */
          cabinPhaseOne.findDocumentCabinPhaseOne(topic, (err, phaseOne) => {
            if (!err) {
              if (func.checkNull(phaseOne)) {
                cabinPhaseOne.createDocumentCabinPhaseOne(
                  topic,
                  dataPhaseOne,
                  (err, newsPhaseOne) => {
                    if (err) {
                      console.log(err);
                    }
                  }
                );
              } else {
                cabinPhaseOne.addDocumentCabinPhaseOne(topic, dataPhaseOne);
              }
            }
          });

          /**
           * PhaseTwo
           */
          cabinPhaseTwo.findDocumentCabinPhaseTwo(topic, (err, phaseTwo) => {
            if (!err) {
              if (func.checkNull(phaseTwo)) {
                //If exits create Document
                cabinPhaseTwo.createDocumentCabinPhaseTwo(
                  topic,
                  dataPhaseTwo,
                  (err, newsPhaseTwo) => {
                    console.log(err);
                  }
                );
              } else {
                cabinPhaseTwo.addDocumentCabinPhaseTwo(topic, dataPhaseTwo);
              }
            }
          });

          /**
           * PhaseThree
           */
          cabinPhaseThree.findDocumentCabinPhaseThree(
            topic,
            (err, phaseThree) => {
              if (!err) {
                if (func.checkNull(phaseThree)) {
                  //If exits create Document
                  cabinPhaseThree.createDocumentCabinPhaseThree(
                    topic,
                    dataPhaseThree,
                    (err, newsPhaseThree) => {}
                  );
                } else {
                  cabinPhaseThree.addDocumentCabinPhaseThree(
                    topic,
                    dataPhaseThree
                  );
                }
              }
            }
          );
          /*
           * Alarms
           */
          var arrLastAlarm = [];
          cabinAlarm.findCabinAlarm(topic, (err, dataAlarm) => {
            if (!err && !func.checkArray(dataAlarm)) {
              var arrDataAlarm = dataAlarm[0].samples;
              //Task : Lấy dữ liệu mới
              for (let i = 0; i < arrDataAlarm.length; i++) {
                var statusAlarm = middlewareAlarm.checkStatusAlarm(
                  payloadSplit,
                  arrDataAlarm[i]
                );
                var valueTagAlarm = middlewareAlarm.getValueTagAlarm(
                  payloadSplit,
                  arrDataAlarm[i]
                );
                let newAlarm = {
                  name: arrDataAlarm[i].name,
                  HH: arrDataAlarm[i].HH,
                  H: arrDataAlarm[i].H,
                  L: arrDataAlarm[i].L,
                  LL: arrDataAlarm[i].LL,
                  Rate: arrDataAlarm[i].Rate,
                  valueTag: valueTagAlarm,
                  status: statusAlarm,
                };
                console.log(statusAlarm);
                arrLastAlarm.push(newAlarm);
              }
              cabinAlarm.editCabinAlarm(topic, arrLastAlarm);
            }
          });

          /*
           * Relay
           */
          cabinRelay.findCabinRelay(topic, (err, dataRelay) => {
            if (!err && !func.checkArray(dataRelay)) {
              console.log(sampleRelay)
               cabinRelay.editCabinRelay(topic ,"online",sampleRelay);
            }

            else {
              cabinRelay.addCabinRelay(topic, "offline", samplesRelayInit);
            }
          });
        }
      });
    }
  });
};
