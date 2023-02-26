import "./Chart.scss";
import React,{useState, useEffect} from "react";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'January',
    Count:140,
  },
  {
    name: 'February',
    Count:180,
  },
  {
    name: 'March',
    Count:40,
  },
  {
    name: 'April',
    Count:90,
  },
  {
    name: 'May',
    Count: 50,
  },
  {
    name: 'June',
    Count: 170,
  },
];

const Chart = ({title,aspect}) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
      <AreaChart width={730} height={250} data={data}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="count" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#5BB318" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#5BB318" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="name" stroke="gray"/>
  <CartesianGrid strokeDasharray="3 3" className="chartGrid"/>
  <Tooltip />
  <Area type="monotone" dataKey="Count" stroke="#5BB318" fillOpacity={1} fill="url(#count)" />
</AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart