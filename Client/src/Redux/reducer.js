import { combineReducers } from "redux";
import {isMenu,isMenuElement,isLoaddingDashboard ,isLoaddingTable ,isLoaddingAlarm,isLoaddingDataAlarm} from './state/isToggle.state'
import {projectID ,setUserJWT ,idTopicProject} from "./state/value.state"
import {VLNArray,V1NArray,V2NArray,V3NArray,CURRENT,FArray,EArray,SUMMARY,PhaseOne,PhaseTwo,PhaseThree,RLA,RLB ,RL} from './state/selec.state'
var reducer = combineReducers({
   isMenu , isMenuElement,isLoaddingDashboard ,isLoaddingTable,isLoaddingAlarm,isLoaddingDataAlarm, projectID ,setUserJWT ,idTopicProject ,VLNArray,V1NArray,V2NArray,V3NArray,CURRENT,FArray,EArray,SUMMARY,PhaseOne,PhaseTwo,PhaseThree,RLA,RLB,RL
});


export default reducer;