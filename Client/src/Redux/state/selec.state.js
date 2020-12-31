
const initialStateValue = 0;

   
const initialStateVLN = {
     VLN:0,
     V1N :0 ,
     V2N :0,
     V3N :0
    
}

const initialStateCurrent = {
    I:0,
    I1 :0 ,
    I2 :0,
    I3 :0
}

const initialStateKW = {
    KW:0,
    KW1 :0 ,
    KW2 :0,
    KW3 :0
}

const initialStateKVA = {
    KVA:0,
    KVA1 :0 ,
    KVA2 :0,
    KVA3 :0
}
  
const initialStateKVAR = {
    KVAR:0,
    KVAR1 :0 ,
    KVAR2 :0,
    KVAR3 :0
}

const initialStatePF = {
    PF:0,
    PF1 :0 ,
    PF2 :0,
    PF3 :0
}
  
  
var initialStateChartLineVLN = [
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220)
  ]
  
  var initialStateChartLineV1N = [
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220)
  ]
  
  var initialStateChartLineV2N = [
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220)
  ]
  
  var initialStateChartLineV3N= [
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220)
  ]

  
  const initialStateRLA = {
      RLAstatus: "off",
      RLAmode: "manual",
      
  }
  
  const initialStateRLB = {
      RLBstatus: "off",
      RLBmode: "manual",
  }

  const initialStateRLSelec = {
    RLBstatus: "off",
    RLBmode: "manual",
    RLAstatus: "off",
    RLAmode: "manual",
}

  

  
  var initialStateChartLineF = [
    Math.round(Math.random() * 50),
    Math.round(Math.random() * 50),
    Math.round(Math.random() * 50),
    Math.round(Math.random() * 50),
    Math.round(Math.random() * 50),
    Math.round(Math.random() * 50)
  ]
  
  var initialStateChartLineE = [
    Math.round(Math.random() * 300),
    Math.round(Math.random() * 300),
    Math.round(Math.random() * 300),
    Math.round(Math.random() * 300),
    Math.round(Math.random() * 300),
    Math.round(Math.random() * 300),
    Math.round(Math.random() * 300),
    Math.round(Math.random() * 300),
    Math.round(Math.random() * 300),
    Math.round(Math.random() * 300),
    Math.round(Math.random() * 300),
    Math.round(Math.random() * 300),
    Math.round(Math.random() * 300),
    Math.round(Math.random() * 300),
    Math.round(Math.random() * 300)
  ]
  
  

  var initialStateSummary = {
    summaryData: [
    
    ],
  };
  

  //*----------------------------------------------------------

//VOLTAGE LN Array
  var  VLNArray = (state = initialStateChartLineVLN, action) => {
    switch (action.type) {
      case "ADD_DATA_VLNArray":
        var newSatate = [...state]
          newSatate.shift();
          newSatate.push(action.VLNArray);
          initialStateChartLineVLN = newSatate;
         return newSatate;
      default:
        return state;
    }
  };
  
  var V1NArray = (state = initialStateChartLineV1N, action) => {
    switch (action.type) {
      case "ADD_DATA_V1NArray":
        var newSatate = [...state]
          newSatate.shift();
          newSatate.push(action.V1NArray);
          initialStateChartLineV1N= newSatate;
         return newSatate;
      default:
        return state;
    }
  };

  var V2NArray = (state = initialStateChartLineV2N, action) => {
    switch (action.type) {
      case "ADD_DATA_V2NArray":
        var newSatate = [...state]
          newSatate.shift();
          newSatate.push(action.V2NArray);
          initialStateChartLineV2N= newSatate;
         return newSatate;
      default:
        return state;
    }
  };

  
  var V3NArray = (state = initialStateChartLineV3N, action) => {
    switch (action.type) {
      case "ADD_DATA_V3NArray":
        var newSatate = [...state]
          newSatate.shift();
          newSatate.push(action.V3NArray);
          initialStateChartLineV3N= newSatate;
         return newSatate;
      default:
        return state;
    }
  };

  //VOLTAGE LN
  
  var VLN = (state =initialStateVLN, action) => {
    switch (action.type) {
      case "ADD_DATA_VLN":
         return {...state, 
            VLN :action.VLN ,
            V1N :action.V1N ,
            V2N :action.V2N,
            V3N :action.V3N
        }  ;
      default:
        return state;
    }
  };



  //CURRENT
  var CURRENT = (state =initialStateCurrent, action) => {
    switch (action.type) {
      case "ADD_DATA_I":
        return {...state, 
            I :action.I ,
            I1 :action.I1 ,
            I2 :action.I2,
            I3 :action.I3
        }  ;
      default:
        return state;
    }
  };




  //KW
  var KW = (state =initialStateKW, action) => {
    switch (action.type) {
      case "ADD_DATA_KW":
        return {...state, 
            KW :action.KW ,
            KW1 :action.KW1 ,
            KW2 :action.KW2,
            KW3 :action.KW3
        }  ;
      default:
        return state;
    }
  };


  //KVA
  var KVA = (state =initialStateKVA, action) => {
    switch (action.type) {
      case "ADD_DATA_KVA":
        return {...state, 
            KVA :action.KVA ,
            KVA1 :action.KVA1 ,
            KVA2 :action.KVA2,
            KVA3 :action.KVA3
        }  ;
      default:
        return state;
    }
  };

    //KVAR
    var KVAR = (state =initialStateKVAR, action) => {
        switch (action.type) {
          case "ADD_DATA_KVAR":
            return {...state, 
                KVAR :action.KVAR ,
                KVAR1 :action.KVAR1 ,
                KVAR2 :action.KVAR2,
                KVAR3 :action.KVAR3
            }  ;
          default:
            return state;
        }
      };
    

    //PF
    var PF = (state =initialStatePF, action) => {
        switch (action.type) {
          case "ADD_DATA_PF":
            return {...state, 
                PF :action.PF ,
                PF1 :action.PF1 ,
                PF2 :action.PF2,
                PF3 :action.PF3
            }  ;
           
          default:
            return state;
        }
      };
    
//F&E
var F = (state =initialStateValue, action) => {
    switch (action.type) {
      case "ADD_DATA_F":
        
        return action.F ;
      default:
        return state;
    }
  };


  var E = (state =initialStateValue, action) => {
    switch (action.type) {
      case "ADD_DATA_E":
        
         return action.E ;
      default:
        return state;
    }
  };

 //Array F&E
  var FArray = (state = initialStateChartLineF, action) => {
    switch (action.type) {
      case "ADD_DATA_FArray":
        var newSatate = [...state]
          newSatate.shift();
          newSatate.push(action.FArray);
          initialStateChartLineF= newSatate;
         return newSatate;
      default:
        return state;
    }
  };

  var EArray = (state = initialStateChartLineE, action) => {
    switch (action.type) {
      case "ADD_DATA_EArray":
        var newSatate = [...state]
          newSatate.shift();
          newSatate.push(action.EArray);
          
         return newSatate;
      default:
        return state;
    }
  };

   //SUMMARY
   var SUMMARY = (state = initialStateSummary, action) => {
    switch (action.type) {
      case "SUMMARY":
        var newState = [...state]
          newState.push(action.summaryData);
          initialStateSummary = newState;
         return newState
  
      default:
        return state;
    }
  };

  

     //RLA
     var  RLA = (state = initialStateRLA, action) => {
        switch (action.type) {
          case "RLAmodeAuto":
             return { 
               ...state,
               RLAmode : "auto"
              };
          case "RLAmodeManual":
             return { 
              ...state,
               RLAmode : "manual"
            };
          case "RLAstatusON":
              return {
                ...state,
                RLAstatus : "on"
              };
          case "RLAstatusOFF":
              return {
                ...state,
                RLAstatus : "off"
              };
          default:
            return state;
        }
      };
    
      //RLB
      var  RLB = (state = initialStateRLB, action) => {
        switch (action.type) {
          case "RLBmodeAuto":
             return {
              ...state,
               RLBmode : "auto"
              };
          case "RLBmodeManual":
             return { 
              ...state,
               RLBmode : "manual"
            };
          case "RLBstatusON":
              return {
                ...state,
                RLBstatus : "on"
              };
          case "RLBstatusOFF":
              return {
                ...state,
                RLBstatus : "off"
              };
          default:
            return state;
        }
      };

    //RL
    var RL = (state =initialStateRLSelec, action) => {
        switch (action.type) {
          case "ADD_RL_SELEC":
            return {...state, 
                RLBstatus: action.RLBstatus,
                RLBmode: action.RLBmode,
                RLAstatus: action.RLAstatus,
                RLAmode: action.RLAmode,
            }  ;
           
          default:
            return state;
        }
    }

      module.exports= {VLNArray,V1NArray,V2NArray,V3NArray,VLN,CURRENT,KW,KVA,KVAR,PF,E ,F,FArray,EArray,SUMMARY,RLA,RLB ,RL};