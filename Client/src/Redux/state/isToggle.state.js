/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */

var isMenu = (state = true, action) => {
    switch (action.type) {
      case "TOGGLE_IS_MENU":
        return !state;
      default:
        return state;
    }
  };
  var isMenuElement = (state = true, action) => {
    switch (action.type) {
      case "TOGGLE_IS_MENU_ELEMENT":
        return !state;
      default:
        return state;
    }
  };

  var isLoaddingDashboard = (state = false, action) => {
    switch (action.type) {
      case "LOADDING_DASHBOARD":
        return true;
      default:
        return false;
    }
  };

  var isLoaddingTable  = (state = false, action) => {
    switch (action.type) {
      case "LOADDING_TABLE":
        return true;
      default:
        return false;
    }
  };
  var isLoaddingAlarm  = (state = false, action) => {
    switch (action.type) {
      case "LOADDING_ALARM":
        return true;
      default:
        return false;
    }
  };

  var isLoaddingDataAlarm  = (state = false, action) => {
    switch (action.type) {
      case "LOADDING_DATA_ALARM":
        return true;
      case "NO_LOADDING_DATA_ALARM":
        return false;
      default:
        return false;
    }
  };




 module.exports= {isMenu,isMenuElement ,isLoaddingDashboard ,isLoaddingTable ,isLoaddingAlarm ,isLoaddingDataAlarm};