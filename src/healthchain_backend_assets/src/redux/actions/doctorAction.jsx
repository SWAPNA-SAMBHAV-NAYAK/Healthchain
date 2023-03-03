import { healthchain_backend } from "../../../../declarations/healthchain_backend";

export const loadDoctorList = () => async (dispatch) => {

  const doctorList = await healthchain_backend.readDoctors();

  // patientList[0].registered_on = new Date(Number(1677430591566570000n) / 1000000).toDateString();
  dispatch({
    type:'get_doctor',
    payload: { doctors: doctorList },
  }) 
} 