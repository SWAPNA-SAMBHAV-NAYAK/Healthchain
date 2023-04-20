export const loadAppointmentList = (user_type, authCannister) => async (dispatch) => {

  if (authCannister) {
    let appointmentList;

    switch (user_type) {
      case "admin":
        appointmentList = await authCannister.readAllAppointments();
        break;
      case "patient":
        appointmentList = await authCannister.readPatientAppointments();
        break;
      case "doctor":
        appointmentList = await authCannister.readDoctorAppointments();
        break;
    }

    dispatch({
      type: 'get_appointment',
      payload: { appointments: appointmentList },
    })
  }
} 