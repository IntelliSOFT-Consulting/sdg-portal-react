import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLine } from "victory";

function SdgChart( {myChartData, indicator, years} ) {
  // const myChartData = [

  // ]
    return(
      <>


    <VictoryChart theme={VictoryTheme.material} domainPadding={20} height={280} width={600} 
                  animate={{duration: 500}}>
    <VictoryAxis
        fixLabelOverlap
        style={{ tickLabels: { padding: 16, fontSize: 8 } }}
      />
      <VictoryAxis dependentAxis />
      <VictoryLine 
          
          data={myChartData}  />
    </VictoryChart>
      
      </>
    );
  }

  export default SdgChart;