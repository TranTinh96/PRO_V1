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

const initialStateChartLineI = [
    Math.random() * 5,
    Math.random() * 5,
    Math.random() * 5,
    Math.random() * 5,
    Math.random() * 5,
    Math.random() * 5
  ]

  const initialStateChartLineI1 = [
    Math.random() * 10,
    Math.random() * 10,
    Math.random() * 10,
    Math.random() * 10,
    Math.random() * 10,
    Math.random() * 10
]

const initialStateChartLineI2 = [
  Math.random() * 2,
  Math.random() * 2,
  Math.random() * 2,
  Math.random() * 2,
  Math.random() * 2,
  Math.random() * 2
]

const initialStateChartLineI3= [
  Math.random() * 7,
  Math.random() * 7,
  Math.random() * 7,
  Math.random() * 7,
  Math.random() * 7,
  Math.random() * 7
]


//Project
var projectID = (state = null, action) => {
    switch (action.type) {
      case "PROJECT_ID":
        return action.projectID;

      default:
        return state;
    }
  };
  //User
  var User = (state = initialStateJWT, action) => {
    switch (action.type) {
      case "SET_USER":
         return {
           isAuthenticated : action.users ? true:false,
           users : action.users
         }
  
      default:
        return state ;
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


    var  I = (state = initialStateChartLineI, action) => {
      switch (action.type) {
        case "ADD_DATA_I":
          var newSatate = [...state]
            newSatate.shift();
            newSatate.push(action.I);
             [...sate]= newSatate;
           return newSatate;
        default:
          return state;
      }
    };

    
    var  I1 = (state = initialStateChartLineI1, action) => {
      switch (action.type) {
        case "ADD_DATA_I1":
          var newSatate = [...state]
            newSatate.shift();
            newSatate.push(action.I1);
             [...sate]= newSatate;
           return newSatate;
        default:
          return state;
      }
    };

    
    var  I2 = (state = initialStateChartLineI2, action) => {
      switch (action.type) {
        case "ADD_DATA_I2":
          var newSatate = [...state]
            newSatate.shift();
            newSatate.push(action.I2);
             [...sate]= newSatate;
           return newSatate;
        default:
          return state;
      }
    };


    
    var  I3 = (state = initialStateChartLineI3, action) => {
      switch (action.type) {
        case "ADD_DATA_I3":
          var newSatate = [...state]
            newSatate.shift();
            newSatate.push(action.I3);
             [...sate]= newSatate;
           return newSatate;
        default:
          return state;
      }
    };
  
    
  
    

  

 module.exports= {projectID ,User,RLA,RLB,I ,I1,I2,I3 };