import { healthchain_backend } from "../../../../declarations/healthchain_backend";


export const loadDoctorMetaDataById = (id) => async (dispatch) => {
    const filtered_doctor = await healthchain_backend.getDoctorMetaDataById(id);

    if (filtered_doctor.length < 1) {
        dispatch({
            type: "get_doctor_meta_data_by_id",
            payload: {},
        });
    } else {
        dispatch({
            type: "get_doctor_meta_data_by_id",
            payload: filtered_doctor[0],
        });
    }
    
    
}