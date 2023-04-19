import "./Sidebar.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import BadgeIcon from '@mui/icons-material/Badge';
import DvrIcon from '@mui/icons-material/Dvr';
import BookOnlineOutlinedIcon from '@mui/icons-material/BookOnlineOutlined';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {


  const { isBurgerNavOpen } = useSelector(state => state);


  const { accountType } = useSelector(state => state);
  const { profileData } = useSelector(state => state.profileData);

  useEffect(() => {
    const nav = document.querySelector(".sidebar");
    if (isBurgerNavOpen) {
      nav.classList.add("nav-bar-active");

    } else {
      nav.classList.remove("nav-bar-active");
    }
  }, [isBurgerNavOpen])





  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: 'none' }}><span className="logo">
          Healthchain</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          {accountType === "admin" &&
            <>
              <p className="title">MAIN</p>

              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <li><DashboardIcon className="icon" /><span>Dashboard</span></li>
              </Link>
            </>
          }



          <p className="title">LISTS</p>

          {accountType === "admin" &&
            <>
              <Link to="/patients" style={{ textDecoration: 'none' }}>
                <li><PermIdentityIcon className="icon" /><span>Patients</span></li>
              </Link>

            </>
          }

          {accountType === "admin" &&
            <>
              <Link to="/doctors" style={{ textDecoration: 'none' }}>
                <li><PersonOutlinedIcon className="icon" /><span>Doctors</span></li>
              </Link>
            </>
          }

          {accountType === "doctor" && profileData.user_principal &&
            <>
              <Link to={`/doctors/${profileData.user_principal.toText()}`} style={{ textDecoration: 'none' }}>
                <li><PersonOutlinedIcon className="icon" /><span> Workspace </span></li>
              </Link>
            </>
          }

          {accountType === "patient" && profileData.user_principal &&
            <>
              <Link to={`/patients/${profileData.user_principal.toText()}`} style={{ textDecoration: 'none' }}>
                <li><PersonOutlinedIcon className="icon" /><span> My Data </span></li>
              </Link>
            </>
          }


          {accountType !== "doctor" &&
            <Link to="/appointments" style={{ textDecoration: 'none' }}>
              <li><BookOnlineOutlinedIcon className="icon" /><span>Appointments</span></li>
            </Link>
          }



          <Link to="/appointmentList" style={{ textDecoration: 'none' }}>
            <li><BookOnlineOutlinedIcon className="icon" /><span>Appointments List</span></li>
          </Link>


          <Link to="/diagnosis" style={{ textDecoration: 'none' }}>
            <li> <img src={"https://upload.wikimedia.org/wikipedia/commons/c/c2/Coronavirus_icon.svg"} width="50px" /> <span>Diagnosis.ai </span></li>
          </Link>

          {accountType == "patient" &&
            <Link to="/diagnosis-history" style={{ textDecoration: 'none' }}>
              <li><DvrIcon className="icon" /><span>Diagnosis History</span></li>
            </Link>
          }

          <Link to="/diseaseindex" style={{ textDecoration: 'none' }}>
            <li> <img src={"https://upload.wikimedia.org/wikipedia/commons/2/2e/Community_Health_Advocate_-_The_Noun_Project.svg"} width="30px" /> <span>Disease Index</span></li>
          </Link>


          {accountType === "admin" &&
            <>
              <li><LocalShippingIcon className="icon" /><span>Shifting</span></li>

              <Link to="/assets" style={{ textDecoration: 'none' }}>
                <li><WebAssetIcon className="icon" /><span>Assets</span></li>
              </Link>
            </>
          }


          <p className="title">MESSAGE</p>
          {accountType !== "patient" &&
            <>
              <Link to="/notice-board" style={{textDecoration:'none'}}>
                <li><ContentPasteOutlinedIcon className="icon" /><span>Notice Board</span></li>
              </Link>
            </>
          }
          <Link to="/notifications" style={{ textDecoration: 'none' }}>
            <li><NotificationsNoneIcon className="icon" /><span>Notifications</span></li>
          </Link>

          {accountType === "admin" &&
            <>
              <p className="title">EMPLOYEES</p>
              <Link to="/employees" style={{ textDecoration: 'none' }}>
                <li><BadgeIcon className="icon" /><span>Employee List</span></li>
              </Link>
            </>
          }

        </ul>
      </div>

    </div>
  )
}

export default Sidebar