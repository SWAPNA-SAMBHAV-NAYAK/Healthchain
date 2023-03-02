const initialState = {
  patients: []
};


const patientReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'get_patient':
      return { ...state, patients: action.payload.patients };
    default:
      return { ...state }
  }
}

export default patientReducer;
