import { healthchain_backend } from "../../../../declarations/healthchain_backend";
import { canisterId, createActor } from "../../../../declarations/healthchain_backend";
import { AuthClient } from "@dfinity/auth-client";

export const loadPatientList = () => async (dispatch) => {

  const authClient = await AuthClient.create();
  const identity = await authClient.getIdentity();

  const authenticatedCanister = createActor(canisterId, {
    agentOptions: {
      identity,
    },
  });


  const patientList = await authenticatedCanister.readPatients();

  // patientList[0].registered_on = new Date(Number(1677430591566570000n) / 1000000).toDateString();
  dispatch({
    type: 'get_patient',
    payload: { patients: patientList },
  })
} 