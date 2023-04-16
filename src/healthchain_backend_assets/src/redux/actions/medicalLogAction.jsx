export const loadMedicalLogList = (authCannister,patient_id) => async (dispatch) => {

  if (authCannister) {

    const medicalLogList = await authCannister.readMedicalLogs(patient_id);
    
    dispatch({
      type: 'get_medical_log',
      payload: { medicalLogs: medicalLogList },
    })
  }
} 