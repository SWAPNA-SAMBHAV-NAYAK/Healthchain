import React, { useEffect } from "react";
import "./Notelist.scss";
import Notecard from "./Notecard";
import useAuthenticatedCannister from "../../useAuthenticatedCannister";
import { useDispatch, useSelector } from "react-redux";
import { loadNoticeList } from "../../redux/actions/noticeAction";
const Notelist = () => {

  const dispatch = useDispatch();
  const authCannister = useAuthenticatedCannister();

  const { notices } = useSelector(state => state.noticeList)

  useEffect(() => {
    dispatch(loadNoticeList(authCannister));
  }, [authCannister])

  return (
    <div className="note-list">
      {notices.map((notice) => (
        <Notecard
          key={notice.from_id}
          name={notice.from_name}
          title={notice.notice_title}
          content={notice.notice_content}
          timestamp={notice.time_stamp}
        />
      ))}
    </div>
  );
};
export default Notelist;
