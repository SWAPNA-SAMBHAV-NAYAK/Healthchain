export const loadDoctorMetaDataList = (authCannister) => async (dispatch) => {

  if (authCannister) {

    const doctorMetaDataList = await authCannister.readDoctorMetaData();
    
    dispatch({
      type: 'get_doctor_meta_data',
      payload: { doctorMetaData: doctorMetaDataList },
    })
  }
} 