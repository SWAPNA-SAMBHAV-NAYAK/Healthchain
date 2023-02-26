import "./List.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import React,{useState, useEffect} from "react";
// import Datalist from "../../components/datalist/Datalist"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        {/* <Datalist/> */}
      </div>
    </div>
  )
}

export default List