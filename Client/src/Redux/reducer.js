import { combineReducers } from "redux";
import {isMenu,isMenuElement,isLoaddingDashboard ,isLoaddingTable} from './state/isToggle.state'
import {projectID ,setUserJWT ,idTopicProject} from "./state/value.state"
import {VLNArray,V1NArray,V2NArray,V3NArray,CURRENT,FArray,EArray,SUMMARY,RLA,RLB ,RL} from './state/selec.state'
var reducer = combineReducers({
   isMenu , isMenuElement,isLoaddingDashboard ,isLoaddingTable, projectID ,setUserJWT ,idTopicProject ,VLNArray,V1NArray,V2NArray,V3NArray,CURRENT,FArray,EArray,SUMMARY,RLA,RLB,RL
});


export default reducer;