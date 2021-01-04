
const initialStateCurrent = {
    I:0,
    I1 :0 ,
    I2 :0,
    I3 :0
}

  
  
var initialStateChartLineVLN = [
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    220.5
  ]
  
  var initialStateChartLineV1N = [
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    218.2
  ]
  
  var initialStateChartLineV2N = [
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    219.5
  ]
  
  var initialStateChartLineV3N= [
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    225.3
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
  
  

  var initialStateSummary =  [
      {
        VLN :0,
        VLL:0,
        I :0,
        KW :0 ,
        KVAR :0 ,
        KVA :0 ,
        PF :0,
        F :0 ,
        KWH :0
      }
    ]
  
  

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
      case "TABLE_SUMMARY":
        var newState = initialStateSummary
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

      module.exports= {VLNArray,V1NArray,V2NArray,V3NArray,CURRENT,FArray,EArray,SUMMARY,RLA,RLB ,RL};