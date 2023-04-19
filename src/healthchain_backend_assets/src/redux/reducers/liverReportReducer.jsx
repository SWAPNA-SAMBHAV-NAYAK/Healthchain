const initialState = {
  liverReports: []
};


const liverReportReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'get_liver_report':
      return { ...state, liverReports: action.payload.liverReports };
    default:
      return { ...state }
  }
}

export default liverReportReducer;
