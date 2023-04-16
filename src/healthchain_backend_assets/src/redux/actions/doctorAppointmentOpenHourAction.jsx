import { healthchain_backend } from "../../../../declarations/healthchain_backend";

export const loadDoctorAppointmentOpenHours = (authCannister) => async (dispatch) => {

  if (authCannister) {
    const openHourList = await authCannister.readOpenHours();

    dispatch({
      type: 'get_open_hours',
      payload: { openHours: openHourList },
    })
  }
} 