export const loadDoctorList = (authCannister) => async (dispatch) => {

  if (authCannister) {

    const doctorList = await authCannister.readDoctors();
    
    dispatch({
      type: 'get_doctor',
      payload: { doctors: doctorList },
    })
  }
} 