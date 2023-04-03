const initialState = {
    profileData: {}
};

const profileDataReducer = (state = initialState, action) => {


    switch (action.type) {
        case 'update_profile_data':
            return { ...state, profileData: action.payload };
        default:
            return { ...state }
    }
}

export default profileDataReducer;
