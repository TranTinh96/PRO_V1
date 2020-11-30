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
function setUserJWT(user){
    return {
            type :"SET_USER" ,
            user : user
    };
}


module.exports={toggleMenu ,toggleMenuElement ,setProjectID,setUserJWT};