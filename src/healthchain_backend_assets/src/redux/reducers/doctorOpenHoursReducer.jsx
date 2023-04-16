const initialState = {
    openHoursDates: [],
    openHoursTime: [],
}

const doctorOpenHoursReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'save_doctor_open_hours':
            return {
                ...state,
                openHoursDates: action.payload.openHoursDates,
                openHoursTime: action.payload.openHoursTime
            };
        default:
            return { ...state }
    }
}

export default doctorOpenHoursReducer;
