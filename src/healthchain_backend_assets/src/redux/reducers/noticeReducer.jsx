const initialState = {
  notices: []
};


const noticeReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'get_notice':
      return { ...state, notices: action.payload.notices };
    default:
      return { ...state }
  }
}

export default noticeReducer;
