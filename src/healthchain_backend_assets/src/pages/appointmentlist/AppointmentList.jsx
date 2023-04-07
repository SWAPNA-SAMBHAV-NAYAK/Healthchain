import React, { useEffect } from "react";
import "./AppointmentList.scss";
import AppointmentListHeader from "./AppointmentListHeader";
import AppointmentListTable from "./AppointmentListTable";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { loadAppointmentList } from "../../redux/actions/appointmentAction";
import useAuthenticatedCannister from "../../useAuthenticatedCannister";

function AppointmentList() {

  const dispatch = useDispatch();

  const authCannister = useAuthenticatedCannister();

  const { accountType } = useSelector(state => state);

  useEffect(() => {
    dispatch(loadAppointmentList(accountType, authCannister))
  }, [dispatch,authCannister])

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
