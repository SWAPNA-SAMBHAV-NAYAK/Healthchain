const initialState = [
]

const doctorOpenHoursReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'save_doctor_open_hours':
            return action.payload;
        default:
            return [ ...state ]
    }
}

export default doctorOpenHoursReducer;
