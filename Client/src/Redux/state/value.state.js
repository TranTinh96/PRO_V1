const initialStateJWT = {
  isAuthenticated: false,
  user: {
    email: " ",
    userName: " ",
    role: "User"
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
  var JWT = (state = initialStateJWT, action) => {
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

  

  

 module.exports= {projectID ,JWT,idTopicProject};