import { combineReducers } from "redux";
import {isMenu,isMenuElement} from './state/isToggle.state'
import {projectID ,setUserJWT} from "./state/value.state"

var reducer = combineReducers({
   isMenu , isMenuElement , projectID ,setUserJWT
});


export default reducer;