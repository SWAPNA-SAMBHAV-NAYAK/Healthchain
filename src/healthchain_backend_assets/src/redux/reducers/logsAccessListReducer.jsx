const initialState = {
  logsAccessList: []
};


const logsAccessListReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'get_logs_access_list':
      return { ...state, logsAccessList: action.payload.logsAccessList };
    default:
      return { ...state }
  }
}

export default logsAccessListReducer;
