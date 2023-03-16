const initialState = {
  appointments: []
};


const appointmentReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'get_appointment':
      return { ...state, appointments: action.payload.appointments };
    default:
      return { ...state }
  }
}

export default appointmentReducer;
