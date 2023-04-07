import "./Navbar.scss";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from '@mui/icons-material/Menu';
import { setBurgerNavState } from "../../redux/actions/openBurgerNavAction";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";

const Navbar = () => {


  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.profileData);
  const burgerRef = useRef(null);
  const [imgIcon, setImgIcon] = useState();

  const { isBurgerNavOpen } = useSelector(state => state);


  function handleAdminBurgerClick() {
    dispatch(setBurgerNavState(!isBurgerNavOpen))
  }

  useEffect(() => {
    if (profileData.image) {
      const imgURL = URL.createObjectURL(profileData.image[0]);
      setImgIcon(
        <div className="profileContainer" style={{ height: "35px", width: "35px", borderRadius: "50%", overflow: "hidden" }}>
          <img src={imgURL} width="50px" style={{ height: "100%", width: "100%", objectFit: "cover", borderRadius: "50%" }} />
        </div>
      )
    }
    else {
      setImgIcon(
        <AccountCircleIcon className="icon" width="35px" />
      )
    }
  }, [profileData])

  return (
    <div className="navbar">
      {/* <div className="wrapper"> */}
      <MenuIcon onClick={handleAdminBurgerClick} className={"burger-logo"} ref={burgerRef}
        id={"burger-logo"} />
      <div className="items">
        <div className="item">
          <Link to="/" style={{ textDecoration: 'none' }}>
            {/* <AccountCircleIcon className="icon" /> */}
            {imgIcon}
          </Link>

        </div>
        <div className="item">
          <LogoutIcon className="icon" />
        </div>
      </div>

      {/* </div> */}
    </div>
  )
}

export default Navbar