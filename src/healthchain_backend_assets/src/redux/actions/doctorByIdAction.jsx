import { healthchain_backend } from "../../../../declarations/healthchain_backend";


export const loadDoctorById = (id, doctorList) => async (dispatch) => {
    const filtered_doctor = doctorList.filter((doctor) => {
        if (doctor.doctor_id == id) {
            return doctor;
        }
        
    })
    dispatch({
        type: "get_doctor_by_id",
        payload: filtered_doctor,
    });
}