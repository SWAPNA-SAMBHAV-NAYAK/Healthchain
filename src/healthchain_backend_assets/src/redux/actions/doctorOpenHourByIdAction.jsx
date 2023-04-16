import { healthchain_backend } from "../../../../declarations/healthchain_backend";

export const loadDoctorOpenHoursById = (authCannister, doctor_id) => async (dispatch) => {

  if (authCannister) {
    const openHourByIdList = await authCannister.readOpenHoursById(doctor_id);

    if (openHourByIdList) {
      dispatch({
        type: 'get_open_hours_by_id',
        payload: { openHoursById: openHourByIdList[0] },
      })
    } else {
      dispatch({
        type: 'get_open_hours_by_id',
        payload: { openHoursById: {} },
      })
    }
  }
} 