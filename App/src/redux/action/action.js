function toggleMenu(){
    return {type :"TOGGLE_IS_MENU"};
}
function toggleMenuElement(){
    return {type :"TOGGLE_IS_MENU_ELEMENT"};
}
function setProjectID(projectID){
    return {
            type :"PROJECT_ID" ,
            projectID :projectID
    };
}
function setUser(user){
    return {
            type :"SET_USER" ,
            user : user
    };
}

function setJWT(jwt){
    return {
            type :"SET_JWT" ,
            jwt : jwt
    };
}


module.exports={toggleMenu ,toggleMenuElement ,setProjectID,setUser ,setJWT };