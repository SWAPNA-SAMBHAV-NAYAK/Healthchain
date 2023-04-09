export const loadNotificationList = (authCannister) => async (dispatch) => {

    if (authCannister) {
  
      const notificationList = await authCannister.readNotifications();
      
      dispatch({
        type: 'get_notification',
        payload: { notifications: notificationList },
      })
    }
  } 