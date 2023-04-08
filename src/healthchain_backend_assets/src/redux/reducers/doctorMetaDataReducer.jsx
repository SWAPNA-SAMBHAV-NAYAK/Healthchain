const initialState = {
  doctorMetaDataList: []
};


const doctorMetaDataReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'get_doctor_meta_data':
      return { ...state, doctorMetaDataList: action.payload.doctorMetaDataList };
    default:
      return { ...state }
  }
}

export default doctorMetaDataReducer;
