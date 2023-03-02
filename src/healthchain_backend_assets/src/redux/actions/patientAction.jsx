import { healthchain_backend } from "../../../../declarations/healthchain_backend";

export const loadPatientList = () => async (dispatch) => {

  const patientList = await healthchain_backend.readPatients();

  // patientList[0].registered_on = new Date(Number(1677430591566570000n) / 1000000).toDateString();
  dispatch({
    type:'get_patient',
    payload: { patients: patientList },
  }) 
} 