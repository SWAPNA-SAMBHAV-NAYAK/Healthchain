export const loadLiverReportList = (authCannister,patient_id) => async (dispatch) => {

  if (authCannister) {

    const liverReportList = await authCannister.readLiverReportByPatientId(patient_id);
    
    dispatch({
      type: 'get_liver_report',
      payload: { liverReports: liverReportList },
    })
  }
} 