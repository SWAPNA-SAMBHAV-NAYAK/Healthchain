const initialState = {
  doctors: []
};


const doctorReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'get_doctor':
      return { ...state, doctors: action.payload.doctors };
    default:
      return { ...state }
  }
}

export default doctorReducer;
