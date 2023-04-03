export const setAccountTypeState = (account_type) => async (dispatch) => {
    dispatch({
        type: "SET_PATIENT_TYPE_STATE",
        payload: account_type
    });
}