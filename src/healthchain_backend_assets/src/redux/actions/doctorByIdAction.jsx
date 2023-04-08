
export const loadDoctorById = (id, authCannister) => async (dispatch) => {

    if (authCannister) {
        const filtered_doctor = await authCannister.getDoctorById(id);

        if (filtered_doctor.length < 1) {
            dispatch({
                type: "get_doctor_by_id",
                payload: {},
            });
        } else {
            dispatch({
                type: "get_doctor_by_id",
                payload: filtered_doctor[0],
            });
        }

    }
    
    
}