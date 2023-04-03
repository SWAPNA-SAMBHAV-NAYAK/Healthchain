const isBurgerNavOpen = true;

const openBurgerNavReducer = (state = isBurgerNavOpen, action) => {
    switch (action.type) {
        case "SET_BURGER_NAV_STATE":
            return action.payload
        default:
            return state
    }
}

export default openBurgerNavReducer;