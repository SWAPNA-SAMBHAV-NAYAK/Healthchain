import { healthchain_backend } from "../../../../declarations/healthchain_backend";


export const loadDoctorById = (id) => async (dispatch) => {
    // const filtered_doctor = doctorList.filter((doctor) => {
    //     if (doctor.doctor_id == id) {
    //         return doctor;
    //     }
        
    // })

    // console.log(id);

    const filtered_doctor = await healthchain_backend.getDoctorById(id);

    console.log(filtered_doctor)

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