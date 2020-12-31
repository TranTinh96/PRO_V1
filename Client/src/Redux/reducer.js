import { combineReducers } from "redux";
import {isMenu,isMenuElement} from './state/isToggle.state'
import {projectID ,setUserJWT ,idTopicProject} from "./state/value.state"
import {VLNArray,V1NArray,V2NArray,V3NArray,VLN,CURRENT,KW,KVA,KVAR,PF,E ,F,FArray,EArray,SUMMARY,RLA,RLB ,RL} from './state/selec.state'
var reducer = combineReducers({
   isMenu , isMenuElement , projectID ,setUserJWT ,idTopicProject ,VLNArray,V1NArray,V2NArray,V3NArray,VLN,CURRENT,KW,KVA,KVAR,PF,E,F,FArray,EArray,SUMMARY,RLA,RLB,RL
});


export default reducer;