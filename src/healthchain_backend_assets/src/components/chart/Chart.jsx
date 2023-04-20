import "./Chart.scss";
import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
;

const Chart = ({ title, aspect }) => {


  const { graphTimeStamps } = useSelector(state => state.graphTimeStampList)

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <AreaChart width={730} height={250} data={graphTimeStamps}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="count" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#5BB318" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#5BB318" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="week" stroke="gray" />
        <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#5BB318" fillOpacity={1} fill="url(#count)" />
      </AreaChart>
      {/* </ResponsiveContainer> */}
    </div>
  )
}

export default Chart