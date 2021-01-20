var func =require("./func.Middleware")

module.exports.dataSummary = (payload) => {
  console.log(payload)
  var time = new Date().toLocaleString();
    return  {
        VLN     :   func.getKeyValue(payload,"VLN"),
        VLL     :   func.getKeyValue(payload,"VLL"),
        I       :   func.getKeyValue(payload,"I"),
        KW      :   func.getKeyValue(payload,"KW") ,
        KVAR    :   func.getKeyValue(payload,"KVAR") ,
        KVA     :   func.getKeyValue(payload,"KVA"),
        PF      :   func.getKeyValue(payload,"PF"),
        F       :   func.getKeyValue(payload,"FREQUENCY"),
        KWH     :   func.getKeyValue(payload,"KWH"),
        time    :   new Date().getTime(),
        timeCreate : time
      }
      
 }

 module.exports.dataPhaseOne = (payload) => {
  var time = new Date().toLocaleString();
  return  {
      V1N     :   func.getKeyValue(payload,"V1N"),
      V12     :   func.getKeyValue(payload,"V12"),
      I1       :   func.getKeyValue(payload,"I1"),
      KW1      :   func.getKeyValue(payload,"KW1") ,
      KVAR1    :   func.getKeyValue(payload,"KVAR1") ,
      KVA1     :   func.getKeyValue(payload,"KVA1"),
      PF1      :   func.getKeyValue(payload,"PF1"),
      time    :   new Date().getTime(),
      timeCreate : time
    }
    
}

module.exports.dataPhaseTwo = (payload) => {
  var time = new Date().toLocaleString();
  return  {
      V2N     :   func.getKeyValue(payload,"V2N"),
      V23    :   func.getKeyValue(payload,"V23"),
      I2       :   func.getKeyValue(payload,"I2"),
      KW2      :   func.getKeyValue(payload,"KW2") ,
      KVAR2    :   func.getKeyValue(payload,"KVAR2") ,
      KVA2     :   func.getKeyValue(payload,"KVA2"),
      PF2      :   func.getKeyValue(payload,"PF2"),
      time    :   new Date().getTime(),
      timeCreate : time
    }
    
}

module.exports.dataPhaseThree = (payload) => {
  var time = new Date().toLocaleString();
  return  {
      V3N     :    func.getKeyValue(payload,"V3N"),
      V31    :     func.getKeyValue(payload,"V31"),
      I3       :   func.getKeyValue(payload,"I3"),
      KW3      :   func.getKeyValue(payload,"KW3") ,
      KVAR3    :   func.getKeyValue(payload,"KVAR3") ,
      KVA3     :   func.getKeyValue(payload,"KVA3"),
      PF3      :   func.getKeyValue(payload,"PF3"),
      time    :   new Date().getTime(),
      timeCreate : time
    }
    
}

module.exports.getDay = () => {
  var today = new Date();
  return  today.toLocaleDateString();

}

module.exports.dataRelay = (payload) => {
  return [
    {
      name: "RLA",
      mode:  func.getKeyValue(payload,"RLAmode"),
      timeOn:  func.getKeyValue(payload,"RLAonTime"),
      timeOff:  func.getKeyValue(payload,"RLAoffTime"),
      status:  func.getKeyValue(payload,"RLAstatus"),
    },
    {
      name: "RLB",
      mode:  func.getKeyValue(payload,"RLBmode"),
      timeOn:  func.getKeyValue(payload,"RLBonTime"),
      timeOff:  func.getKeyValue(payload,"RLBoffTime"),
      status:  func.getKeyValue(payload,"RLBstatus"),
    },
  ];
};


