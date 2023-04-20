const initialState = {
  aiGraphTimeStamps: []
};


const aiGraphTimeStampReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'get_ai_graph_time_stamp':
      return { ...state, aiGraphTimeStamps: action.payload.aiGraphTimeStamps };
    default:
      return { ...state }
  }
}

export default aiGraphTimeStampReducer;
