import { combineReducers } from "redux";
import {isMenu,isMenuElement} from './state/isToggle.state'
import {projectID , User ,RLA,RLB ,I ,I1,I2,I3} from "./state/value.state"

var reducer = combineReducers({
   isMenu , isMenuElement , projectID , User ,RLA , RLB ,I ,I1,I2,I3
});


export default reducer;