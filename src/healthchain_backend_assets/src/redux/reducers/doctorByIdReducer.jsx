const initialState = {
  doctorById: {}
};

const doctorByIdReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'get_doctor_by_id':
      return { ...state, doctorById: action.payload };
    default:
      return { ...state }
  }
}

export default doctorByIdReducer;
