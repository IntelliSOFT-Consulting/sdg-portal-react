import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

function SdgChart( {myChartData, indicator, years} ) {
    return(
      <>


    <VictoryChart theme={VictoryTheme.material} domainPadding={20} padding={75} height={900} width={1200}>
      <VictoryAxis
        fixLabelOverlap
        style={{ tickLabels: { padding: 5, fontSize: 10 } }}
      />
      <VictoryAxis dependentAxis />
      <VictoryBar data={myChartData} x="code" y="value" />
    </VictoryChart>

      {/* <LineChart
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
      </LineChart> */}
      
      </>
    );
  }

  export default SdgChart;