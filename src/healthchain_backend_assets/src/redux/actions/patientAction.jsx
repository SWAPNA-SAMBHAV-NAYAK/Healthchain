import { healthchain_backend } from "../../../../declarations/healthchain_backend";

export const loadPatientList = ()=>async (dispatch)=>{
  const patientList = await healthchain_backend.readPatients();
  dispatch({
    type:'get_patient',
    payload:patientList,
  }) 
} 