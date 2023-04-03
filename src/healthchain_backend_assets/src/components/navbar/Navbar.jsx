import "./Navbar.scss";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from '@mui/icons-material/Menu';
import { setBurgerNavState } from "../../redux/actions/openBurgerNavAction";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';


const Navbar = () => {


  const dispatch = useDispatch();

  const burgerRef = useRef(null);


  const { isBurgerNavOpen } = useSelector(state => state);


  function handleAdminBurgerClick() {
    dispatch(setBurgerNavState(!isBurgerNavOpen))
  }



  return (
    <div className="navbar">
      <div className="wrapper">
        <MenuIcon onClick={handleAdminBurgerClick} className={"burger-logo"} ref={burgerRef}
          id={"burger-logo"} />
        <div className="items">
          <div className="item">
            <AccountCircleIcon className="icon" />
          </div>
          <div className="item">
            <LogoutIcon className="icon" />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Navbar