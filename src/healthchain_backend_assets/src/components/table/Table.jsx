import "./Table.scss";
import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import React,{useState, useEffect} from "react";

const List = () => {
  const data = [
    {
      id: 12339,
      patient: " Sambhav Nayak",
      img:"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      date:"1 January",
      contact: 8658987104,
      doctor:"Dr. Arjun R",
      discharge_status:"Approved"
    },
    {
      id: 67895,
      patient: " Samyak Jain",
      img:"https://media.gettyimages.com/id/1056633638/photo/dani-daniels-attends-dinner-with-dani-launch-party-at-the-mezzanine-on-november-2-2018-in-new.jpg?s=612x612&w=0&k=20&c=Ix6AaL1ig2XDsThLVaH6kWY6W5FuY-2oFGb17-9CvdY=",
      date:"1 February",
      contact: 9680848942,
      doctor:"Dr. Balakrishnan P",
      discharge_status:"Pending"
    },
    {
      id: 12335,
      patient: " Sambhav Nayak",
      img:"https://media.gettyimages.com/id/1056633638/photo/dani-daniels-attends-dinner-with-dani-launch-party-at-the-mezzanine-on-november-2-2018-in-new.jpg?s=612x612&w=0&k=20&c=Ix6AaL1ig2XDsThLVaH6kWY6W5FuY-2oFGb17-9CvdY=",
      date:"1 January",
      contact: 8658987104,
      doctor:"Dr. Arjun R",
      discharge_status:"Approved"
    },
    {
      id: 12325,
      patient: " Sambhav Nayak",
      img:"https://media.gettyimages.com/id/1056633638/photo/dani-daniels-attends-dinner-with-dani-launch-party-at-the-mezzanine-on-november-2-2018-in-new.jpg?s=612x612&w=0&k=20&c=Ix6AaL1ig2XDsThLVaH6kWY6W5FuY-2oFGb17-9CvdY=",
      date:"1 January",
      contact: 8658987104,
      doctor:"Dr. Arjun R",
      discharge_status:"Approved"
    }
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">User ID</TableCell>
            <TableCell className="tableCell">Profile</TableCell>
            <TableCell className="tableCell">Patient</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Contact</TableCell>
            <TableCell className="tableCell">Doctor</TableCell>
            <TableCell className="tableCell">Discharge Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
            >
              <TableCell>
                {row.id}
              </TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={data.img} alt="" className="image"/>
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.patient}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.contact}</TableCell>
              <TableCell className="tableCell">{row.doctor}</TableCell>
              <TableCell className="tableCell"><span className={`status ${row.discharge_status}`}>{row.discharge_status}</span></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default List