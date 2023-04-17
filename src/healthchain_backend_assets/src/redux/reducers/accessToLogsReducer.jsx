const initialState = {
  hasAccessToLogs: false
};


const accessToLogsReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'get_status_of_access_to_medical_logs':
      return { ...state, hasAccessToLogs: action.payload.hasAccessToLogs };
    default:
      return { ...state }
  }
}

export default accessToLogsReducer;
