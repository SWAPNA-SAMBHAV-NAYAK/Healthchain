export const loadLogsAccessList = (authCannister) => async (dispatch) => {

  if (authCannister) {

    let logsAccessList = await authCannister.getPatientMedicalLogsAccessList();

    if (logsAccessList) {

      const accesslist = logsAccessList.map((val) => {
        return val.toString();
      });

      dispatch({
        type: 'get_logs_access_list',
        payload: { logsAccessList: accesslist },
      })
    }
  }
} 