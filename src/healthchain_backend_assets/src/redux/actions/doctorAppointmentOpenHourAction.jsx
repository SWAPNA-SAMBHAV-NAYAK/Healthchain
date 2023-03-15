import { healthchain_backend } from "../../../../declarations/healthchain_backend";

export const loadDoctorAppointmentOpenHours = () => async (dispatch) => {

  const openHourList = await healthchain_backend.readOpenHours();

  // patientList[0].registered_on = new Date(Number(1677430591566570000n) / 1000000).toDateString();
  dispatch({
    type:'get_open_hours',
    payload: { openHours: openHourList },
  }) 
} 