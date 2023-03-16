import { healthchain_backend } from "../../../../declarations/healthchain_backend";

export const loadAppointmentList = () => async (dispatch) => {

  const appointmentList = await healthchain_backend.readAppointments();

  // patientList[0].registered_on = new Date(Number(1677430591566570000n) / 1000000).toDateString();
  dispatch({
    type:'get_appointment',
    payload: { appointments: appointmentList },
  }) 
} 