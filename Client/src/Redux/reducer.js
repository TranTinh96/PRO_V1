import { combineReducers } from "redux";
import {isMenu,isMenuElement} from './state/isToggle.state'
import {projectID ,setUserJWT ,idTopicProject,RLA,RLB,VLN,V1N,V2N,V3N,F,E,SUMMARY} from "./state/value.state"

var reducer = combineReducers({
   isMenu , isMenuElement , projectID ,setUserJWT ,idTopicProject ,RLA,RLB ,VLN,V1N,V2N,V3N ,F,E ,SUMMARY
});


export default reducer;