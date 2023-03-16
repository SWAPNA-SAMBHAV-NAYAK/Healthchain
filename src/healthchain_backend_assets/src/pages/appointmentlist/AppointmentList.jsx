import React, { useEffect } from "react";
import "./AppointmentList.scss";
import AppointmentListHeader from "./AppointmentListHeader";
import AppointmentListTable from "./AppointmentListTable";
import { useDispatch } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { loadAppointmentList } from "../../redux/actions/appointmentAction";

function AppointmentList() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAppointmentList())
  }, [dispatch])

  return (
    <div className="employee">
      <Sidebar />
      <div className="navEmployeeContainer">
        <Navbar />
        <>
          <AppointmentListHeader />
          <AppointmentListTable />
        </>
      </div>
    </div>
  );
}

export default AppointmentList;
