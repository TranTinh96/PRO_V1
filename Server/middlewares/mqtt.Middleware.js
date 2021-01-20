var func =require("./func.Middleware")

module.exports.dataSummary = (payloadSplit) => {
  var time = new Date().toLocaleString();
    return  {
        VLN     :   func.getKeyValue(payloadSplit,"VLN"),
        VLL     :   func.getKeyValue(payloadSplit,"VLL"),
        I       :   func.getKeyValue(payloadSplit,"I"),
        KW      :   func.getKeyValue(payloadSplit,"KW") ,
        KVAR    :   func.getKeyValue(payloadSplit,"KVAR") ,
        KVA     :   func.getKeyValue(payloadSplit,"KVA"),
        PF      :   func.getKeyValue(payloadSplit,"PF"),
        F       :   func.getKeyValue(payloadSplit,"FREQUENCY"),
        KWH     :   func.getKeyValue(payloadSplit,"KWH"),
        time    :   new Date().getTime(),
        timeCreate : time
      }
      
 }

 module.exports.dataPhaseOne = (payloadSplit) => {
  var time = new Date().toLocaleString();
  return  {
      V1N     :   func.getKeyValue(payloadSplit,"V1N"),
      V12     :   func.getKeyValue(payloadSplit,"V12"),
      I1       :   func.getKeyValue(payloadSplit,"I1"),
      KW1      :   func.getKeyValue(payloadSplit,"KW1") ,
      KVAR1    :   func.getKeyValue(payloadSplit,"KVAR1") ,
      KVA1     :   func.getKeyValue(payloadSplit,"KVA1"),
      PF1      :   func.getKeyValue(payloadSplit,"PF1"),
      time    :   new Date().getTime(),
      timeCreate : time
    }
    
}

module.exports.dataPhaseTwo = (payloadSplit) => {
  var time = new Date().toLocaleString();
  return  {
      V2N     :   func.getKeyValue(payloadSplit,"V2N"),
      V23    :   func.getKeyValue(payloadSplit,"V23"),
      I2       :   func.getKeyValue(payloadSplit,"I2"),
      KW2      :   func.getKeyValue(payloadSplit,"KW2") ,
      KVAR2    :   func.getKeyValue(payloadSplit,"KVAR2") ,
      KVA2     :   func.getKeyValue(payloadSplit,"KVA2"),
      PF2      :   func.getKeyValue(payloadSplit,"PF2"),
      time    :   new Date().getTime(),
      timeCreate : time
    }
    
}

module.exports.dataPhaseThree = (payloadSplit) => {
  var time = new Date().toLocaleString();
  return  {
      V3N     :    func.getKeyValue(payloadSplit,"V3N"),
      V31    :     func.getKeyValue(payloadSplit,"V31"),
      I3       :   func.getKeyValue(payloadSplit,"I3"),
      KW3      :   func.getKeyValue(payloadSplit,"KW3") ,
      KVAR3    :   func.getKeyValue(payloadSplit,"KVAR3") ,
      KVA3     :   func.getKeyValue(payloadSplit,"KVA3"),
      PF3      :   func.getKeyValue(payloadSplit,"PF3"),
      time    :   new Date().getTime(),
      timeCreate : time
    }
    
}

module.exports.getDay = () => {
  var today = new Date();
  return  today.toLocaleDateString();

}

module.exports.dataRelay = (payloadSplit) => {
  return [
    {
      name: "RLA",
      mode:  func.getKeyValue(payloadSplit,"RLAmode"),
      timeOn:  func.getKeyValue(payloadSplit,"RLAonTime"),
      timeOff:  func.getKeyValue(payloadSplit,"RLAoffTime"),
      status:  func.getKeyValue(payloadSplit,"RLAstatus"),
    },
    {
      name: "RLB",
      mode:  func.getKeyValue(payloadSplit,"RLBmode"),
      timeOn:  func.getKeyValue(payloadSplit,"RLBonTime"),
      timeOff:  func.getKeyValue(payloadSplit,"RLBoffTime"),
      status:  func.getKeyValue(payloadSplit,"RLBstatus"),
    },
  ];
};


