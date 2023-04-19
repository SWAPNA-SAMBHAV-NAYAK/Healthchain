export const loadNoticeList = (authCannister) => async (dispatch) => {

  if (authCannister) {

    const noticeList = await authCannister.readNotices();
    
    dispatch({
      type: 'get_notice',
      payload: { notices: noticeList },
    })
  }
} 