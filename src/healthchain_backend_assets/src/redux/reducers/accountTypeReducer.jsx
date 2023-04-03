const accountType = "admin";

const accountTypeReducer = (state = accountType, action) => {
    switch (action.type) {
        case "SET_ACCOUNT_TYPE_STATE":
            return action.payload
        default:
            return state
    }
}

export default accountTypeReducer;