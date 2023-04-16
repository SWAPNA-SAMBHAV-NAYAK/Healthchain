const initialState = {
    openHoursById: []
  };
  
  
  const doctorOpenHourByIdReducer = (state = initialState, action) => {
  
    switch (action.type) {
      case 'get_open_hours_by_id':
        return { ...state, openHoursById: action.payload.openHoursById };
      default:
        return { ...state }
    }
  }
  
  export default doctorOpenHourByIdReducer;
  