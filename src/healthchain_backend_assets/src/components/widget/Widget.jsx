import "./Widget.scss";
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import React,{useState, useEffect} from "react";
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
const Widget = ({type}) => {
  let data;
  switch (type) {
    case "user":
      data={
        title: "USERS",
        link:"View Users",
        icon: <PersonOutlineIcon className="icon"
        style={{
          color: "#5BB318",
          backgroundColor: "#D4F6CC",
        }}/>,
      };
      break;
    case "doctor":
      data={
        title: "DOCTORS",
        link:"View Doctors",
        icon: <PersonOutlineIcon className="icon"
        style={{
          color: "#5BB318",
          backgroundColor: "#D4F6CC",
        }}/>,
      };
      break;
    case "appointment":
      data={
        title: "APPOINTMENTS",
        link:"View Appointments",
        icon: <MeetingRoomOutlinedIcon className="icon"
        style={{
          color: "#5BB318",
          backgroundColor: "#D4F6CC",
        }}/>,
      };
      break;
    case "asset":
      data={
        title: "ASSETS",
        link:"View Assets",
        icon: <InventoryOutlinedIcon className="icon"
        style={{
          color: "#5BB318",
          backgroundColor: "#D4F6CC",
        }}/>,
      };
      break;
    default:
      break;
  } 
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">12345</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  )
}

export default Widget