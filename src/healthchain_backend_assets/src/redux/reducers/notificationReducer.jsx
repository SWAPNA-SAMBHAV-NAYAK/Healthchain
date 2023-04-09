const initialState = {
    notifications: []
  };
  
  
  const notificationReducer = (state = initialState, action) => {
  
    switch (action.type) {
      case 'get_notification':
        return { ...state, notifications: action.payload.notifications };
      default:
        return { ...state }
    }
  }
  
  export default notificationReducer;
  