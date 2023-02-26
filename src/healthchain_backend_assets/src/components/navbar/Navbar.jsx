import "./Navbar.scss";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import React,{useState, useEffect} from "react";
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon/>
        </div>
        <div className="items">
          <div className="item">
          <FullscreenExitOutlinedIcon/>
          </div>
          <div className="item">
          <NotificationsNoneOutlinedIcon/>
          <div className="counter">2</div>
          </div>
          <div className="item">
          <ListOutlinedIcon/>
          </div>
          <div className="item">
            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" 
            alt="" 
            className="avatar"
            />
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Navbar