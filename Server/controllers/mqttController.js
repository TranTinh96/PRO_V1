
var cabinSummary = require("../api/models/data/cabinSummary.model");
var cabinPhaseOne = require("../api/models/data/cabinPhaseOne.model");
var cabinPhaseTwo = require("../api/models/data/cabinPhaseTwo.model");
var cabinPhaseThree = require("../api/models/data/cabinPhaseThree.model");

var func  = require("../middlewares/func.Middleware")
var mqtt  = require("../middlewares/mqtt.Middleware")


module.exports = (clientMQTT) => {
  clientMQTT.on("message", function (topic, message, packet) {
    if(topic){
      
  
    
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
                  cabinSummary.createDocumentCabinSummary(topic,dataSummary, (err,newsummary)=>{})
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
              cabinPhaseOne.createDocumentCabinPhaseOne(topic,dataPhaseOne, (err,newsPhaseOne)=>{})
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
              cabinPhaseTwo.createDocumentCabinPhaseTwo(topic,dataPhaseTwo, (err,newsPhaseTwo)=>{})
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
    }
  });
};
