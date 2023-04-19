const initialState = {
  heartReports: []
};


const heartReportReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'get_heart_report':
      return { ...state, heartReports: action.payload.heartReports };
    default:
      return { ...state }
  }
}

export default heartReportReducer;
