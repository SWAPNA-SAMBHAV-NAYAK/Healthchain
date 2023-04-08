import React, { useEffect, useState } from "react";
import "./Employees.scss";
import Salrt from "sweetalert2";
import Add from "./Add";
import Header from "./Header";
import List from "./List";
import Edit from "./Edit";
import { loadEmployeeList } from "../../redux/actions/employeeAction";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import useAuthenticatedCannister from "../../useAuthenticatedCannister";

function Employees() {
  // const [employee, setEmployee] = useState(employeeData);
  const [employee, setEmployee] = useState({});
  const [addEmployee, setAddEmployee] = useState(false);
  const [editEmployee, setEditEmployee] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});

  const dispatch = useDispatch();

  const { employees } = useSelector(state => state.employeeList);

  const authCannister = useAuthenticatedCannister();


  useEffect(() => {
    dispatch(loadEmployeeList(authCannister))
  }, [dispatch,authCannister])




  const handleEdit = (employee_id) => {
    const [df] = employees.filter((employee) => employee.employee_id === employee_id);

    console.log(df);

    setSelectedEmployee(df);
    setEditEmployee(true);
  };

  const handleDelete = (employee) => {
    Salrt.fire({
      icon: "warning",
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!"
    }).then(async (result) => {

      if (result.value) {

        await authCannister.deleteEmployee(employee.employee_id)
        dispatch(loadEmployeeList(authCannister));

        Salrt.fire({
          icon: "success",
          title: "Deleted!",
          text: `${employee.first_name} ${employee.last_name}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    });


  };
  return (
    <div className="employee">
      <Sidebar />
      <div className="navEmployeeContainer">
        <Navbar />
        {/* List */}
        {!addEmployee && !editEmployee && (
          <>
            <Header setAddEmployee={setAddEmployee} />
            <List
              // employee={employee}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </>
        )}
        {/* Add */}
        {addEmployee && (
          <Add
            setAddEmployee={setAddEmployee}
          />
        )}
        {/* Edit */}
        {editEmployee && (
          <Edit
            selectedEmployee={selectedEmployee}
            setEditEmployee={setEditEmployee}
          />
        )}
      </div>
    </div>
  );
}

export default Employees;
