const initialState = {
  patientById: []
};

const patientByIdReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'get_patient_by_id':
      return { ...state, patientById: action.payload };
    default:
      return { ...state }
  }
}

export default patientByIdReducer;
