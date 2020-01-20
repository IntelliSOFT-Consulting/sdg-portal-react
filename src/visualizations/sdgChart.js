import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

function SdgChart( {myChartData, indicator, years} ) {
    return(
      <>
      { 
        console.log(myChartData)
        
      }
        <LineChart
          width={1000}
          height={500}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Year" 
                  type="number" 
                  ticks={years}
                  domain={[1800, 2020]} 
                  
                  allowDuplicatedCategory={false} />
          <YAxis dataKey={indicator}/>
          <Tooltip />
          <Legend verticalAlign="middle" layout="vertical" align="right" height={400} width={150}/>

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