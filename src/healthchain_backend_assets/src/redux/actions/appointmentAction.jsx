import { healthchain_backend } from "../../../../declarations/healthchain_backend";
import useAuthenticatedCannister from "../../useAuthenticatedCannister";

export const loadAppointmentList = (user_type, authCannister) => async (dispatch) => {

  let appointmentList;

  console.log("up")

  switch (user_type) {
    case "admin":
      appointmentList = await authCannister.readAppointments();
    case "patient":
      appointmentList = await authCannister.readPatientAppointments();
    case "doctor":
      appointmentList = await authCannister.readDoctorAppointments();
  }

  console.log("down")
  dispatch({
    type: 'get_appointment',
    payload: { appointments: appointmentList },
  })
} 