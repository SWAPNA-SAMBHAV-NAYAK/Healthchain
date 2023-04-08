import React, { useState } from "react";
import "./Add.scss";
import Salrt from "sweetalert2";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import { loadEmployeeList } from "../../redux/actions/employeeAction";
import useAuthenticatedCannister from "../../useAuthenticatedCannister";


export default function Add({setAddEmployee }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [date, setDate] = useState("");


  const dispatch = useDispatch();

  const authCannister = useAuthenticatedCannister();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !contact || !email || !salary || !date) {
      return Salrt.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true
      });
    }

    await authCannister.createEmployee(
      uuid(),
      firstName,
      lastName,
      contact,
      email,
      parseInt(salary),
      date);

    dispatch(loadEmployeeList(authCannister))



    // const id = employee.length + 1;


    // const newEmployee = {
    //   id,
    //   firstName,
    //   lastName,
    //   contact,
    //   email,
    //   salary,
    //   date
    // };

    // employee.push(newEmployee);
    setAddEmployee(false);

    Salrt.fire({
      icon: "success",
      title: "Added!",
      text: `${firstName} ${lastName}'s data has been Added.`,
      showConfirmButton: false,
      timer: 3000
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Employee</h1>
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
        <label htmlFor="contact">Contact</label>
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
        <label htmlFor="salary">Salary (₹)</label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={salary}
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
          <input type="submit" value="Add" />
          <input
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setAddEmployee(false)}
          />
        </div>
      </form>
    </div>
  );
}
