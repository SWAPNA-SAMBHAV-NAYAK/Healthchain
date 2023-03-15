const initialState = {
    openHours: []
  };
  
  
  const doctorAppointmentOpenHourReducer = (state = initialState, action) => {
  
    switch (action.type) {
      case 'get_open_hours':
        return { ...state, openHours: action.payload.openHours };
      default:
        return { ...state }
    }
  }
  
  export default doctorAppointmentOpenHourReducer;
  