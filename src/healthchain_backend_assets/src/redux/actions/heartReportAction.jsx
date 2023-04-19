export const loadHeartReportList = (authCannister) => async (dispatch) => {

  if (authCannister) {

    const heartReportList = await authCannister.readHeartReportByPatientId();
    
    dispatch({
      type: 'get_heart_report',
      payload: { heartReports: heartReportList },
    })
  }
} 