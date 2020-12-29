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

  

 module.exports= {projectID ,setUserJWT,idTopicProject ,RLA,RLB};