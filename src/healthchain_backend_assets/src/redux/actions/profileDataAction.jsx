
export const updateProfileData = (profileData) => async (dispatch) => {

    console.log(profileData);

    dispatch({
        type: "update_profile_data",
        payload: profileData,
    });
}