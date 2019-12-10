import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

function SdgChart() {
  const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
  ];
   
    return(
      <>
        <LineChart
          width={600}
          height={400}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="quarter" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="earnings" stroke="#8884d8" activeDot={{ r: 8 }} />
         
      </LineChart>
      
      </>
    );
  }

  export default SdgChart;