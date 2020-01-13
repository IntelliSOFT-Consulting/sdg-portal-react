import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

function SdgChart( {myChartData, indicator} ) {
  const indicator2 = 'indicator';
  const countriesData = [
    {
      country: "Kenya",
      data: [
        {
          Year: "2010",
          indicator: 12
        },
        {
          Year: "2011",
          indicator: 12
        }
      ]
    }, 
    {
      country: "Uganda",
      data: [
        {
          Year: "2010",
          indicator: 15
        },
        {
          Year: "2011",
          indicator: 16
        }
      ]
    }
  ];
   
    return(
      <>
      { 
        
        
      }
        <LineChart
          width={1000}
          height={800}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Year" type="Year" allowDuplicatedCategory={false} />
          <YAxis dataKey={indicator}/>
          <Tooltip />
          <Legend />

          {myChartData.map(s=>(
             <Line type="monotone" dataKey={indicator} data={s.data} name={s.country} key={s.country} stroke="#8884d8" activeDot={{ r: 8 }} />
          ))}
           
           {/* {countriesData.map(s=>(
             <Line type="monotone" dataKey={indicator2} data={s.data} name={s.country} key={s.country} stroke="#8884d8" activeDot={{ r: 8 }} />
          ))} */}
         
      </LineChart>
      
      </>
    );
  }

  export default SdgChart;