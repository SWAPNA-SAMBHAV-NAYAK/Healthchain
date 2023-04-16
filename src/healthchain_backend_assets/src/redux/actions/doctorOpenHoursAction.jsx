
export const saveDoctorOpenHours = (updatedList) => async (dispatch) => {

    if (!updatedList) {
        dispatch({
            type: "save_doctor_open_hours",
            payload: {
                openHoursDates: [],
                openHoursTime: [],
            },
        });
    } else {
        dispatch({
            type: "save_doctor_open_hours",
            payload: updatedList,
        });
    }
}