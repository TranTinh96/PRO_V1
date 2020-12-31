const initialStateJWT = {
  isAuthenticated: false,
  user: {
    email: " ",
    userName: " ",
    role: "User"
  }
}

const initialStateRLA = {
    RLAstatus: "off",
    RLAmode: "manual",
    
}

const initialStateRLB = {
    RLBstatus: "off",
    RLBmode: "manual",
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
  Math.round(Math.random() * 300)
]

const initialStateSummary = {
  modeReport: "readTime",
  summaryData: {
    VLN :0,
    VLL :0,
    I :0,
    KW :0 ,
    KVA :0 ,
    KVAR : 0,
    PE : 0,
    F :0 ,
    KWH :0
  }
}





//Project Register
var projectID = (state = null, action) => {
    switch (action.type) {
      case "PROJECT_ID_REGISTER":
        return action.projectID;

      default:
        return state;
    }
  };
  //JWT
  var setUserJWT = (state = initialStateJWT, action) => {
    switch (action.type) {
      case "SET_USER":
         return {
           isAuthenticated : action.users ? true:false,
           users : action.users
         }
  
      default:
        return state;
    }
  };

  var idTopicProject = (state = null, action) => {
    switch (action.type) {
      case "ID_TOPIC_PROJECT":
        return action._idProject;

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

  var  VLN = (state = initialStateChartLineVLN, action) => {
    switch (action.type) {
      case "ADD_DATA_VLN":
        var newSatate = [...state]
          newSatate.shift();
          newSatate.push(action.VLN);
          initialStateChartLineVLN = newSatate;
         return newSatate;
      default:
        return state;
    }
  };
  
  var V1N = (state = initialStateChartLineV1N, action) => {
    switch (action.type) {
      case "ADD_DATA_V1N":
        var newSatate = [...state]
          newSatate.shift();
          newSatate.push(action.V1N);
          initialStateChartLineV1N= newSatate;
         return newSatate;
      default:
        return state;
    }
  };

  
  var V2N = (state = initialStateChartLineV2N, action) => {
    switch (action.type) {
      case "ADD_DATA_V2N":
        var newSatate = [...state]
          newSatate.shift();
          newSatate.push(action.V2N);
          initialStateChartLineV2N= newSatate;
         return newSatate;
      default:
        return state;
    }
  };


  
  var V3N = (state = initialStateChartLineV3N, action) => {
    switch (action.type) {
      case "ADD_DATA_V3N":
        var newSatate = [...state]
          newSatate.shift();
          newSatate.push(action.V3N);
          initialStateChartLineV3N= newSatate;
         return newSatate;
      default:
        return state;
    }
  };

  var F = (state = initialStateChartLineF, action) => {
    switch (action.type) {
      case "ADD_DATA_F":
        var newSatate = [...state]
          newSatate.shift();
          newSatate.push(action.F);
          initialStateChartLineF= newSatate;
         return newSatate;
      default:
        return state;
    }
  };

  var E = (state = initialStateChartLineE, action) => {
    switch (action.type) {
      case "ADD_DATA_E":
        var newSatate = [...state]
          newSatate.shift();
          newSatate.push(action.E);
          initialStateChartLineE= newSatate;
         return newSatate;
      default:
        return state;
    }
  };

   //JWT
   var SUMMARY = (state = initialStateSummary, action) => {
    switch (action.type) {
      case "SUMMARY":
         return {
           modeReport : action.mode,
           summaryData : action.summaryData
         }
  
      default:
        return state;
    }
  };
  


 module.exports= {projectID ,setUserJWT,idTopicProject ,RLA,RLB ,VLN,V1N,V2N,V3N ,F,E,SUMMARY};