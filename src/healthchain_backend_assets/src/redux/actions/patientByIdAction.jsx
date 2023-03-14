import { healthchain_backend } from "../../../../declarations/healthchain_backend";


export const loadPatientById = (id,patientList) => async (dispatch) => {
    const filtered_patient = patientList.filter((patient) => {
        if (patient.patient_id == id) {
            return patient;
        }
     
    })
    
    dispatch({
        type: "get_patient_by_id",
        payload: filtered_patient,
    });
}