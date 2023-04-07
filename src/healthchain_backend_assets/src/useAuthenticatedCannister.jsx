import { useEffect, useState } from "react";

import { canisterId, createActor } from "../../declarations/healthchain_backend";
import { AuthClient } from "@dfinity/auth-client";


function useAuthenticatedCannister() {
    const [authenticatedCanister, setAuthenticatedCannister] = useState();

    useEffect(() => {

        (async () => {
            const authClient = await AuthClient.create();
            const identity = await authClient.getIdentity();

            const authCanister = createActor(canisterId, {
                agentOptions: {
                    identity,
                },
            });

            setAuthenticatedCannister(authCanister);
        })();

    }, []);

    return (authenticatedCanister);


}

export default useAuthenticatedCannister;