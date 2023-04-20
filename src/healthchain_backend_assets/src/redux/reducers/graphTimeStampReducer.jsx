const initialState = {
  graphTimeStamps: []
};


const graphTimeStampReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'get_graph_time_stamp':
      return { ...state, graphTimeStamps: action.payload.graphTimeStamps };
    default:
      return { ...state }
  }
}

export default graphTimeStampReducer;
