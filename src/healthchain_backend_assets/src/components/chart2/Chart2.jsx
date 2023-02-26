import "./Chart2.scss";
import React,{useState, useEffect} from "react";
import {BarChart, XAxis, CartesianGrid, Tooltip, Bar,Legend} from "recharts";
const data = [
  {
    name: 'January',
    ICU:140,
    OPO:40,
  },
  {
    name: 'February',
    ICU:100,
    OPO:120,
  },
  {
    name: 'March',
    ICU:90,
    OPO:100,
  },
  {
    name: 'April',
    ICU:70,
    OPO:30,
  },
  {
    name: 'May',
    ICU:55,
    OPO:20,
  },
  {
    name: 'June',
    ICU:120,
    OPO:67,
  },
];
const Chart2 = () => {
  return (
    <div className="barchart">
      <div className="title">Patients In</div>
      <BarChart width={730} height={250} data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <Tooltip />
  <Legend />
  <Bar dataKey="ICU" fill="#8884d8" />
  <Bar dataKey="OPO" fill="#82ca9d" />
</BarChart>
    </div>
  )
}

export default Chart2