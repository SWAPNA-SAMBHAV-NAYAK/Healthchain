import "./Sidebar.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import BadgeIcon from '@mui/icons-material/Badge';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{textDecoration: 'none'}}><span className="logo">
        Healthchain</span>
        </Link>
    </div>
        <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          
          <Link to="/" style={{textDecoration: 'none'}}>
            <li><DashboardIcon className="icon"/><span>Dashboard</span></li>
          </Link>
          
          <p className="title">LISTS</p>
          <Link to="/patients" style={{textDecoration: 'none'}}>
          <li><PermIdentityIcon  className="icon"/><span>Patients</span></li>
          </Link>
          <Link to="/assets" style={{textDecoration: 'none'}}>
            <li><WebAssetIcon className="icon"/><span>Assets</span></li>
          </Link>
          
          <li><PersonOutlinedIcon className="icon"/><span>Doctors</span></li>
          <li><LocalShippingIcon className="icon"/><span>Shifting</span></li>
          <p className="title">MESSAGE</p>
          <li><ContentPasteOutlinedIcon className="icon"/><span>Notice Board</span></li>
          <li><NotificationsNoneIcon className="icon"/><span>Notifications</span></li>
          <p className="title">EMPLOYEES</p>
          <Link to="/users" style={{textDecoration: 'none'}}>
            <li><BadgeIcon className="icon"/><span>Employee List</span></li>
          </Link>
          
          
          <p className="title">USER</p>
          <li><SettingsIcon className="icon"/><span>Settings</span></li>
          <li><AccountCircleIcon className="icon"/><span>Profile</span></li>
          <li><LogoutIcon className="icon"/><span>Sign Out</span></li>
        </ul>
      </div>
      
    </div>
  )
}

export default Sidebar