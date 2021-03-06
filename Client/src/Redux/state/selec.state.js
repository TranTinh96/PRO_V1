const initialStateCurrent = {
  I: 0,
  I1: 0,
  I2: 0,
  I3: 0,
};



const initialStateRLA = {
  RLAstatus: "off",
  RLAmode: "manual",
};

const initialStateRLB = {
  RLBstatus: "off",
  RLBmode: "manual",
};

const initialStateRLSelec = {
  RLBstatus: "off",
  RLBmode: "manual",
  RLAstatus: "off",
  RLAmode: "manual",
};

var initialStateChartLineF = [
  Math.round(Math.random() * 50),
  Math.round(Math.random() * 50),
  Math.round(Math.random() * 50),
  Math.round(Math.random() * 50),
  Math.round(Math.random() * 50),
  Math.round(Math.random() * 50),
];

var initialStateChartLineE = [
  Math.round(Math.random() * 300),
  Math.round(Math.random() * 300),
  Math.round(Math.random() * 300),
  Math.round(Math.random() * 300),
  Math.round(Math.random() * 300),
  Math.round(Math.random() * 300),
  Math.round(Math.random() * 300),
  Math.round(Math.random() * 300),
  Math.round(Math.random() * 300),
  Math.round(Math.random() * 300),
  Math.round(Math.random() * 300),
  Math.round(Math.random() * 300),
  Math.round(Math.random() * 300),
  Math.round(Math.random() * 300),
  Math.round(Math.random() * 300),
];

var initialStateSummary = [];
var initialStatePhaseOne = [];

var initialStatePhaseTwo = [];

var initialStatePhaseThree = [];
var initialStateTable = [];

//*----------------------------------------------------------



//CURRENT
var CURRENT = (state = initialStateCurrent, action) => {
  switch (action.type) {
    case "ADD_DATA_I":
      return {
        I: action.I,
        I1: action.I1,
        I2: action.I2,
        I3: action.I3,
      };
    default:
      return state;
  }
};

//Array F&E
var FArray = (state = initialStateChartLineF, action) => {
  switch (action.type) {
    case "ADD_DATA_FArray":
      var newSatate = [...state];
      newSatate.shift();
      newSatate.push(action.FArray);
      initialStateChartLineF = newSatate;
      return newSatate;
    default:
      return state;
  }
};

var EArray = (state = initialStateChartLineE, action) => {
  switch (action.type) {
    case "ADD_DATA_EArray":
      var newSatate = [...state];
      newSatate.shift();
      newSatate.push(action.EArray);
      initialStateChartLineE = newSatate;
      return newSatate;
    default:
      return state;
  }
};

//SUMMARY
var SUMMARY = (state = initialStateSummary, action) => {
  switch (action.type) {
    case "TABLE_SUMMARY":
      var newState = initialStateSummary;
      newState.push(action.summaryData);
      initialStateSummary = newState;
      return newState;
    case "TABLE_SUMMARY_STATE":
      return initialStateTable;
    default:
      return state;
  }
};

//Phase One
var PhaseOne = (state = initialStatePhaseOne, action) => {
  switch (action.type) {
    case "TABLE_PHASE_ONE":
      var newState = initialStatePhaseOne;
      newState.push(action.phaseOneData);
      initialStatePhaseOne = newState;
      return newState;
    case "TABLE_PHASE_ONE_STATE":
      return initialStateTable;
    default:
      return state;
  }
};
//Phase Two
var PhaseTwo = (state = initialStatePhaseTwo, action) => {
  switch (action.type) {
    case "TABLE_PHASE_TWO":
      var newState = initialStatePhaseTwo;
      newState.push(action.phaseTwoData);
      initialStatePhaseTwo = newState;
      return newState;
    case "TABLE_PHASE_TWO_STATE":
      return initialStateTable;
    default:
      return state;
  }
};

//Phase Three
var PhaseThree = (state = initialStatePhaseThree, action) => {
  switch (action.type) {
    case "TABLE_PHASE_THREE":
      var newState = initialStatePhaseThree;
      newState.push(action.phaseThreeData);
      initialStatePhaseThree = newState;
      return newState;
    case "TABLE_PHASE_THREE_STATE":
      return initialStateTable;
    default:
      return state;
  }
};


//RL
var RL = (state = initialStateRLSelec, action) => {
  switch (action.type) {
    case "ADD_RL_SELEC":
      return {
        ...state,
        RLBstatus: action.RLBstatus,
        RLBmode: action.RLBmode,
        RLAstatus: action.RLAstatus,
        RLAmode: action.RLAmode,
      };

    default:
      return state;
  }
};

export  {
  CURRENT,
  FArray,
  EArray,
  SUMMARY,
  PhaseOne,
  PhaseTwo,
  PhaseThree,
  RL
};
