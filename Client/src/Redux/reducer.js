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
import {CURRENT,FArray,EArray,SUMMARY,PhaseOne,PhaseTwo,PhaseThree,RL} from "./state/selec.state";

import {VLNArray ,V1NArray ,V2NArray,V3NArray}  from "./state/voltage.state"

export default combineReducers({
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

