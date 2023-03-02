import React, { useState } from "react";
import "./Edit.scss";
import Salrt from "sweetalert2";
import { healthchain_backend } from "../../../../declarations/healthchain_backend/index";
import { useDispatch } from "react-redux";
import { loadEmployeeList } from "../../redux/actions/employeeAction";

function Edit({ selectedEmployee, setEditEmployee }) {


  const dispatch = useDispatch();


  const [employeeId, setEmployeeId] = useState(selectedEmployee.employee_id);
  const [firstName, setFirstName] = useState(selectedEmployee.first_name);
  const [lastName, setLastName] = useState(selectedEmployee.last_name);
  const [contact, setContact] = useState(selectedEmployee.contact);
  const [email, setEmail] = useState(selectedEmployee.email);
  const [salary, setSalary] = useState(selectedEmployee.salary);
  const [date, setDate] = useState(selectedEmployee.date_of_joining);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !salary || !date) {
      return Salrt.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true
      });
    }
    // for (let i = 0; i < employee.length; i++) {
    //   if (employee[i].employee_id === employee_id) {
    //     employee.splice(i, 1, newEmployee);
    //     break;
    //   }
    // }

    await healthchain_backend.updateEmployee(
      employeeId,
      firstName,
      lastName,
      contact,
      email,
      parseInt(salary),
      date
    )

    dispatch(loadEmployeeList());

    setEditEmployee(false);

    Salrt.fire({
      icon: "success",
      title: "Updated!",
      text: `${firstName} ${lastName}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500
    });
  };


  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Employee</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="lastName">Contact</label>
        <input
          id="contact"
          type="text"
          name="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="salary">Salary ($)</label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={Number(salary)}
          onChange={(e) => setSalary(e.target.value)}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div>
          <input type="submit" value="Update" />
          <input
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setEditEmployee(false)}
          />
        </div>
      </form>
    </div>
  );
}

export default Edit;
