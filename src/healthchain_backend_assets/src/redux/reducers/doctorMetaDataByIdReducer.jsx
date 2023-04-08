const initialState = {
    doctorMetaDataById: {}
  };
  
  const doctorMetaDataByIdReducer = (state = initialState, action) => {
  
    switch (action.type) {
      case 'get_doctor_meta_data_by_id':
        return { ...state, doctorMetaDataById: action.payload };
      default:
        return { ...state }
    }
  }
  
  export default doctorMetaDataByIdReducer;
  