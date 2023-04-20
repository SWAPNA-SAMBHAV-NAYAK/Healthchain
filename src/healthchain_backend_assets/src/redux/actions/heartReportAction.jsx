export const loadHeartReportList = (authCannister,patient_id) => async (dispatch) => {

  if (authCannister) {

    const heartReportList = await authCannister.readHeartReportByPatientId(patient_id);
    
    dispatch({
      type: 'get_heart_report',
      payload: { heartReports: heartReportList },
    })
  }
} 