
import { canisterId, createActor } from "../../../../declarations/healthchain_backend";
import { AuthClient } from "@dfinity/auth-client";

export const loadPatientList = (authCannister) => async (dispatch) => {

  if (authCannister) {
    const patientList = await authCannister.readPatients();
    dispatch({
      type: 'get_patient',
      payload: { patients: patientList },
    })
  }
} 