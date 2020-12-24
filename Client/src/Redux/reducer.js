import { combineReducers } from "redux";
import {isMenu,isMenuElement} from './state/isToggle.state'
import {projectID ,setUserJWT ,idTopicProject } from "./state/value.state"

var reducer = combineReducers({
   isMenu , isMenuElement , projectID ,setUserJWT ,idTopicProject 
});


export default reducer;