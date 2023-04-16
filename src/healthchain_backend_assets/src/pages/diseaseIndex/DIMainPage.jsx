import React from "react";
import DiabetesIndex from "./DiabetesIndex";
import LiverIndex from "./LiverIndex";
import HeartIndex from "./HeartIndex";
import "./DIMainPage.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
const DIMainPage = () => {
  return (
    <div className="mainContainer">
      <Sidebar/>
      <div className="ekAurClass">
        <Navbar/>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <DiabetesIndex />
      <hr
        style={{
          margin: "20px 0"
        }}
      />
      <LiverIndex />
      <hr
        style={{
          margin: "20px 0"
        }}
      />
      <HeartIndex />
        </div>
      </div>
    </div>
    
  );
};

export default DIMainPage;
