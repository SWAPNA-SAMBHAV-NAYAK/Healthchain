import "./Chart2.scss";
import React, { useState, useEffect } from "react";
import { BarChart, XAxis, CartesianGrid, Tooltip, Bar, Legend } from "recharts";
import { useSelector } from 'react-redux';


const Chart2 = () => {

  const { aiGraphTimeStamps } = useSelector(state => state.aiGraphTimeStampList)


  return (
    <div className="barchart">
      <div className="title">Diagonosis.ai used in Last 6 weeks</div>
      <BarChart width={730} height={250} data={aiGraphTimeStamps}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <Tooltip />
        <Legend />
        <Bar dataKey="heart_analysis" fill="#8884d8" />
        <Bar dataKey="liver_analysis" fill="#82ca9d" />
      </BarChart>
    </div>
  )
}

export default Chart2