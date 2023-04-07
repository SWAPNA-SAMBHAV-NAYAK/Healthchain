export const setAccountTypeState = (account_type) => async (dispatch) => {
    dispatch({
        type: "SET_ACCOUNT_TYPE_STATE",
        payload: account_type
    });
}