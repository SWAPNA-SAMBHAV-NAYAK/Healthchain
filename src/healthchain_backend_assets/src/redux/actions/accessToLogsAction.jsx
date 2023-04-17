export const getStatusOfAccessToMedicalLogs = (authCannister, patient_id) => async (dispatch) => {
  console.log("Hello")

  if (authCannister) {

    const hasAccess = await authCannister.hasAccessToPatientMedicalLogs(patient_id);
    
    dispatch({
      type: 'get_status_of_access_to_medical_logs',
      payload: { hasAccessToLogs: hasAccess },
    })
  }
} 