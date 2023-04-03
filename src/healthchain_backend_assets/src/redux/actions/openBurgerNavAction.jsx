export const setBurgerNavState = (showSideNav) => async (dispatch) => {
    dispatch({
        type: "SET_BURGER_NAV_STATE",
        payload: showSideNav
    });
}