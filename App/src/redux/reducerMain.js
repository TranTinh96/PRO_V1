import { combineReducers } from "redux";
import {isMenu,isMenuElement} from './state/isToggle.state'
import {projectID , User } from "./state/value.state"

var reducer = combineReducers({
   isMenu , isMenuElement , projectID , User
});


export default reducer;