import { healthchain_backend } from "../../../../declarations/healthchain_backend/index";
import { canisterId, createActor } from "../../../../declarations/healthchain_backend";
import { AuthClient } from "@dfinity/auth-client";
import { setAccountTypeState } from "./accountTypeAction";

export const updateProfileData = () => async (dispatch) => {

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
        agentOptions: {
            identity,
        },
    });

    let profileData = await authenticatedCanister.readProfileData();


    profileData = profileData[0]

    const imageContent = new Uint8Array(profileData.image);
    const imageBlob = new Blob([imageContent.buffer], { type: "image/png" })

    profileData.image = [];
    profileData.image[0] = imageBlob

    console.log(profileData);

    dispatch({
        type: "update_profile_data",
        payload: profileData,
    });
}