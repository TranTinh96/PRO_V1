const initialStateJWT = {
  isAuthenticated: false,
  user: {
    email: " ",
    userName: " ",
    role: "User"
  }
}




//Project
var projectID = (state = null, action) => {
    switch (action.type) {
      case "PROJECT_ID":
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

  

  

 module.exports= {projectID ,JWT};