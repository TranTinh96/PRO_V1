var Project = require("../api/models/project.model")
var cabinSummary = require("../api/models/data/cabinSummary.model");
var cabinPhaseOne = require("../api/models/data/cabinPhaseOne.model");
var cabinPhaseTwo = require("../api/models/data/cabinPhaseTwo.model");
var cabinPhaseThree = require("../api/models/data/cabinPhaseThree.model");
var cabinAlarm = require("../api/models/cabinAlarms.model")

var middlewareAlarm =  require("../api/middlewares/alarm.Middleware")
var func  = require("../middlewares/func.Middleware")
var mqtt  = require("../middlewares/mqtt.Middleware")


module.exports = (clientMQTT) => {
  clientMQTT.on("message", function (topic, message, packet) {
    if(topic){
        Project.getByTokenProject(topic ,(err,project) =>{
           if(!err && ! func.checkNull(project)){
            var payloadSplit = message.toString().split('&');
            var dataSummary =mqtt.dataSummary(payloadSplit);
            var dataPhaseOne =mqtt.dataPhaseOne(payloadSplit);
            var dataPhaseTwo =mqtt.dataPhaseTwo(payloadSplit);
            var dataPhaseThree =mqtt.dataPhaseThree(payloadSplit);
            /**
             * SUMMARY
             */
            cabinSummary.findDocumentCabinSummary(topic,(err,summary)=>{
                  if(!err){
                    if(func.checkNull(summary)){
                      //If exits create Document
                      cabinSummary.createDocumentCabinSummary(topic,dataSummary, (err,newsummary)=>{
                        if(err){
                          console.log(err)
                        }
                      })
                    }
                    else
                    {
                      cabinSummary.addDocumentCabinSummary(topic,dataSummary)
                    }
                  }
            })
    
            /**
             * PhaseOne
             */
            cabinPhaseOne.findDocumentCabinPhaseOne(topic,(err,phaseOne)=>{
              if(!err){
                if(func.checkNull(phaseOne)){
                  //If exits create Document
                  cabinPhaseOne.createDocumentCabinPhaseOne(topic,dataPhaseOne, (err,newsPhaseOne)=>{
                    if (err)
                    {
                      console.log(err)
                    }
                    
                  })
                }
                else
                {
                  cabinPhaseOne.addDocumentCabinPhaseOne(topic,dataPhaseOne)
                }
              }
          })
          
            /**
             * PhaseTwo
             */
            cabinPhaseTwo.findDocumentCabinPhaseTwo(topic,(err,phaseTwo)=>{
              if(!err){
                if(func.checkNull(phaseTwo)){
                  //If exits create Document
                  cabinPhaseTwo.createDocumentCabinPhaseTwo(topic,dataPhaseTwo, (err,newsPhaseTwo)=>{
                    console.log(err)
                  })
                }
                else
                {
                  cabinPhaseTwo.addDocumentCabinPhaseTwo(topic,dataPhaseTwo)
                }
              }
          })
          
            /**
             * PhaseThree
             */
            cabinPhaseThree.findDocumentCabinPhaseThree(topic,(err,phaseThree)=>{
              if(!err){
                if(func.checkNull(phaseThree)){
                  //If exits create Document
                  cabinPhaseThree.createDocumentCabinPhaseThree(topic,dataPhaseThree, (err,newsPhaseThree)=>{})
                }
                else
                {
                  cabinPhaseThree.addDocumentCabinPhaseThree(topic,dataPhaseThree)
                }
              }
          })
          /*
          * Alarms
          */
         var arrLastAlarm =[];
         cabinAlarm.findCabinAlarm(topic,(err, dataAlarm)=>{
          if( !err && !func.checkArray(dataAlarm)){
            var arrDataAlarm = dataAlarm[0].samples ;

            //Task : Lấy dữ liệu mới
            for (let i = 0; i < arrDataAlarm.length; i++) {
                var statusAlarm = middlewareAlarm.checkStatusAlarm(payloadSplit , arrDataAlarm[i]);
                var valueTagAlarm = middlewareAlarm.getValueTagAlarm(payloadSplit, arrDataAlarm[i]);
                let newAlarm ={
                  name : arrDataAlarm[i].name ,
                  HH :  arrDataAlarm[i].HH ,
                  H :  arrDataAlarm[i].H ,
                  L :  arrDataAlarm[i].L ,
                  LL :  arrDataAlarm[i].LL ,
                  Rate :  arrDataAlarm[i].Rate ,
                  valueTag : valueTagAlarm ,
                  status : statusAlarm
                }
                console.log(statusAlarm)
                arrLastAlarm.push(newAlarm)
            }

            
          //Task : Update dữ liệu
            cabinAlarm.editCabinAlarm(topic,arrLastAlarm)
          
           //Task : Gửi dữ liệu MQTT
             //clientMQTT.publish("1122331", "1232")
          }

         });         
    }})}
  });
};
