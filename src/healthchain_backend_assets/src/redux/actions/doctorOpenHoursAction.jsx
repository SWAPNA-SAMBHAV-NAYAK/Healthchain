import { healthchain_backend } from "../../../../declarations/healthchain_backend";


export const saveDoctorOpenHours = (updatedList) => async (dispatch) => {

    dispatch({
        type: "save_doctor_open_hours",
        payload: updatedList,
    });
}