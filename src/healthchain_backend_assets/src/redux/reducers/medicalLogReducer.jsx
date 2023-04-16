const initialState = {
  medicalLogs: []
};


const medicalLogReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'get_medical_log':
      return { ...state, medicalLogs: action.payload.medicalLogs };
    default:
      return { ...state }
  }
}

export default medicalLogReducer;
