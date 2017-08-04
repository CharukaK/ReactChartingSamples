import React, { Component } from 'react';
import {XAxis,YAxis,Legend,Tooltip,AreaChart,Area,PieChart,Pie,CartesianGrid,Cell} from 'recharts';
import WorldMap from '../worldmap/WorldMap';
class ComplexGadget extends Component {


  constructor(props) {
    super(props);
    this.state={
      mapDisplay:'success'
    };
    
    this.handleSwitch=this.handleSwitch.bind(this);
  }
  

  data= [
    { time:1.20 ,name: 'Tokyo', coordinates: [139.6917,35.6895], success: 34,failed:0},
    { time:1.21 ,name: 'Jakarta', coordinates: [106.8650,-6.1751], success: 23,failed:10 },
    { time:1.22 ,name: 'Delhi', coordinates: [77.1025,28.7041], success: 10,failed:2 },
    { time:1.23 ,name: 'Manila', coordinates: [120.9842,14.5995], success: 50,failed:5 },
    { time:1.24 ,name: 'Seoul', coordinates: [126.9780,37.5665], success: 45,failed: 50},
    { time:1.25 ,name: 'Shanghai', coordinates: [121.4737,31.2304], success: 10,failed:60 },
    { time:1.26 ,name: 'Karachi', coordinates: [67.0099,24.8615], success: 30,failed:2 },
    { time:1.28 ,name: 'Beijing', coordinates: [116.4074,39.9042], success: 10,failed:10 },
    { time:1.29 ,name: 'New York', coordinates: [-74.0059,40.7128], success: 20,failed:5 },
    { time:1.30 ,name: 'Guangzhou', coordinates: [113.2644,23.1291], success: 3,failed:1 },
    { time:1.31 ,name: 'Sao Paulo', coordinates: [-46.6333,-23.5505], success: 23,failed:20 },
    { time:1.32 ,name: 'Mexico City', coordinates: [-99.1332,19.4326], success: 60,failed:12 },
    { time:1.33 ,name: 'Mumbai', coordinates: [72.8777,19.0760], success: 100,failed:34 },
    { time:1.34 ,name: 'Osaka', coordinates: [135.5022,34.6937], success: 30,failed:20 },
    { time:1.35 ,name: 'Moscow', coordinates: [37.6173,55.7558], success: 16,failed:23},
    { time:1.36 ,name: 'Dhaka', coordinates: [90.4125,23.8103], success: 15,failed: 3},
    { time:1.37 ,name: 'Greater Cairo', coordinates: [31.2357,30.0444], success: 89,failed: 123},
    { time:1.38 ,name: 'Los Angeles', coordinates: [-118.2437,34.0522], success: 26,failed: 12},
    { time:1.39 ,name: 'Bangkok', coordinates: [100.5018,13.7563], success: 28,failed:12 },
    { time:1.40 ,name: 'Kolkata', coordinates: [88.3639,22.5726], success: 8,failed:12},
    { time:1.41 ,name: 'Buenos Aires', coordinates: [-58.3816,-34.6037], success: 83,failed: 43},
    { time:1.42 ,name: 'Tehran', coordinates: [51.3890,35.6892], success: 38,failed:65 },
    { time:1.43 ,name: 'Istanbul', coordinates: [28.9784,41.0082], success: 36,failed: 6},
    { time:1.44 ,name: 'Lagos', coordinates: [3.3792,6.5244], success: 47,failed:3 },
    { time:1.45 ,name: 'Shenzhen', coordinates: [114.0579,22.5431], success: 37,failed: 45},
    { time:1.46 ,name: 'Rio de Janeiro', coordinates: [-43.1729,-22.9068], success: 70,failed:34 },
    { time:1.47 ,name: 'Kinshasa', coordinates: [15.2663,-4.4419], success: 37,failed:56 },
    { time:1.48 ,name: 'Tianjin', coordinates: [117.3616,39.3434], success: 20,failed: 76},
    { time:1.49 ,name: 'Paris', coordinates: [2.3522,48.8566], success: 20,failed: 12},
    { time:1.50 ,name: 'Lima', coordinates: [-77.0428,-12.0464], success: 45,failed:2 }
  ];

  handleSwitch(evt){
    this.setState({
      mapDisplay:`${evt.target.value}`
    });
  }

  render() {

    let success=0,failed=0;

    this.data.forEach((element)=>{
      success+=element.success;
      failed+=element.failed;
    });

    const COLORS=['#42f468','#f48c41'];
    

    return (
      <div>
        <div>
          <AreaChart width={500} height={200} data={this.data.map(el=>{return {time:el.time,name:el.name,coordinates:el.coordinates,success:el.success,failed:(el.failed*-1)};})}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <XAxis dataKey="time" label/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Area type='linear' dataKey='success' stroke='#42f468' fill='#42f468'/>
            <Area type='linear' dataKey='failed' stroke='#f48c41' fill='#f48c41'/> 
            <Legend/>
          </AreaChart>
        </div>
        <div>
          <PieChart width={200} height={200}>
            <Pie data={[{name:'Success',value:success},{name:'Failed',value:failed}]}>
              {
                [{name:'Success',value:success},{name:'Failed',value:failed}].map((entry, index) =><Cell fill={COLORS[index % COLORS.length]}/>)
              }
            </Pie>
            <Tooltip/>
            <Legend/>
          </PieChart> 
        </div>
        <div>
          <select value={this.state.mapDisplay} onChange={this.handleSwitch}>
            <option>success</option>
            <option>failed</option>
          </select>
          <WorldMap 
            width={800} 
            height={450} 
            markers={this.state.mapDisplay==='success' ? this.data.map(el=>{return {name:el.name,coordinates:el.coordinates,value:el.success};}):this.data.map(el=>{return {name:el.name,coordinates:el.coordinates,value:el.failed};})} 
            markFill={this.state.mapDisplay ==='success' ? '#42f468':'#f48c41'} 
            markStroke={'#ffffff'}
          
          />
        </div>     
      </div>
    );
  }
}

export default ComplexGadget;