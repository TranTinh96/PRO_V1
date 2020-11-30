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

 module.exports= {isMenu,isMenuElement};