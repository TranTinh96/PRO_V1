var initialStateChartLineVLN = [
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    220.5,
  ];
  
  var initialStateChartLineV1N = [
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    218.2,
  ];
  
  var initialStateChartLineV2N = [
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    219.5,
  ];
  
  var initialStateChartLineV3N = [
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    Math.round(Math.random() * 220),
    225.3,
  ];

  //VOLTAGE LN Array
var VLNArray = (state = initialStateChartLineVLN, action) => {
    switch (action.type) {
      case "ADD_DATA_VLNArray":
        var newState = [...state];
        newState.shift();
        newState.push(action.VLNArray);
        initialStateChartLineV1N = newState;
        return newState
      default:
        return state;
    }
  };
  
  var V1NArray = (state = initialStateChartLineV1N, action) => {
    switch (action.type) {
      case "ADD_DATA_V1NArray":
        var newSatate = [...state];
        newSatate.shift();
        newSatate.push(action.V1NArray);
        initialStateChartLineV1N = newSatate;
        return newSatate;
      default:
        return state;
    }
  };
  
  var V2NArray = (state = initialStateChartLineV2N, action) => {
    switch (action.type) {
      case "ADD_DATA_V2NArray":
        var newSatate = [...state];
        newSatate.shift();
        newSatate.push(action.V2NArray);
        initialStateChartLineV2N = newSatate;
        return newSatate;
      default:
        return state;
    }
  };
  
  var V3NArray = (state = initialStateChartLineV3N, action) => {
    switch (action.type) {
      case "ADD_DATA_V3NArray":
        var newSatate = [...state];
        newSatate.shift();
        newSatate.push(action.V3NArray);
        initialStateChartLineV3N = newSatate;
        return newSatate;
      default:
        return state;
    }
  };

  
export  {VLNArray ,V1NArray ,V2NArray,V3NArray}
  