
import Chart from "../../components/chart/Chart"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Widget from "../../components/widget/Widget"
import "./Home.scss"
import Table from "../../components/table/Table"
import Chart2 from "../../components/chart2/Chart2"
import React,{useState, useEffect} from "react";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar/>
        <div className="widgets">
          <Widget type="user"/>
          <Widget type="doctor"/>
          <Widget type="appointment"/>
          <Widget type="asset"/>
        </div>
        <div className="charts">
          <Chart2/>
          <Chart title="Registered Users Over Last 6 Months" aspect={2/1}/>
        </div>
        <div className="tableContainer">
          <div className="tableTitle">Patient Discharge History</div>
          <Table/>
        </div>
      </div>
    </div>
  )
}

export default Home