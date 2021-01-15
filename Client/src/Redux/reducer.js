import { combineReducers } from "redux";
import {
  isMenu,
  isMenuElement,
  isLoaddingDashboard,
  isLoaddingTable,
  isLoaddingAlarm,
  isLoaddingDataAlarm,
  isLoaddingAccoutManage,
} from "./state/isToggle.state";
import { projectID, setUserJWT, idTopicProject } from "./state/value.state";
import {
  VLNArray,
  V1NArray,
  V2NArray,
  V3NArray,
  CURRENT,
  FArray,
  EArray,
  SUMMARY,
  PhaseOne,
  PhaseTwo,
  PhaseThree,
  RL,
} from "./state/selec.state";
var reducer = combineReducers({
  isMenu,
  isMenuElement,
  isLoaddingDashboard,
  isLoaddingTable,
  isLoaddingAlarm,
  isLoaddingDataAlarm,
  isLoaddingAccoutManage,
  projectID,
  setUserJWT,
  idTopicProject,
  VLNArray,
  V1NArray,
  V2NArray,
  V3NArray,
  CURRENT,
  FArray,
  EArray,
  SUMMARY,
  PhaseOne,
  PhaseTwo,
  PhaseThree,
  RL,
});

export default reducer;
