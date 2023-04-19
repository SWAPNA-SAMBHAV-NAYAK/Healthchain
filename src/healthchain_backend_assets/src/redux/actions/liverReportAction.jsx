export const loadLiverReportList = (authCannister) => async (dispatch) => {

  if (authCannister) {

    const liverReportList = await authCannister.readLiverReportByPatientId();
    
    dispatch({
      type: 'get_liver_report',
      payload: { liverReports: liverReportList },
    })
  }
} 