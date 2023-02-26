import "./Single.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/table/Table";
import React,{useState, useEffect} from "react";

const Single = () => {
  return (

    <div className="single">
      <Sidebar/>
      <div className="singleContainer">
        <Navbar/>
        <div className="top">
          <div className="left">
            <div className="editBtn">Edit</div>
            <h1 className="title">
              User Info
            </h1>
            <div className="item">
              <img src="https://media.gettyimages.com/id/1056633638/photo/dani-daniels-attends-dinner-with-dani-launch-party-at-the-mezzanine-on-november-2-2018-in-new.jpg?s=612x612&w=0&k=20&c=Ix6AaL1ig2XDsThLVaH6kWY6W5FuY-2oFGb17-9CvdY=" alt="" className="itemImg"/>
              <div className="details">
                <h1 className="itemTitle">Sambhav</h1>
                <div className="itemDetails">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">abc@xyz.com</span>
                </div>
                <div className="itemDetails">
                  <span className="itemKey">Gender:</span>
                  <span className="itemValue">Male</span>
                </div>
                <div className="itemDetails">
                  <span className="itemKey">Age:</span>
                  <span className="itemValue">23</span>
                </div>
                <div className="itemDetails">
                  <span className="itemKey">Contact:</span>
                  <span className="itemValue">92384798023</span>
                </div>
                <div className="itemDetails">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">abc-123,kjcnsj,wdnw-12345</span>
                </div>
              </div>
            </div>
          </div>
            <div className="right">

            </div>
          </div>
          <div className="bottom">
            <h1 className="title">Appointment Lists</h1>
            {/* table will be past appointment history but for now i have put the same table i used before */}
            <List/>
        </div>
        </div>
        
      </div>
    
  )
}

export default Single