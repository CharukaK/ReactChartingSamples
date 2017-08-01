import React from 'react';
import PropTypes from 'prop-types';
import Row from '../RowComp';
import {ScatterChart,Scatter,ZAxis,AreaChart,Area,BarChart, Bar,LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend} from 'recharts';

class ReChartsSamples extends React.Component{



  constructor(props){
    super(props);
    this.state={
      data1:[
        {name: 'Page A', uv: Math.random()*4000, pv: Math.random()*4000, amt: Math.random()*4000},
        
      ]
    };
  }


  componentDidMount(){
    setInterval(()=>{
      // let arr= this.state.data1.slice();
      // arr.push({name: 'Page '+Math.random()*100, uv: Math.random()*4000, pv: Math.random()*4000, amt: Math.random()*4000});
      if(this.state.data1.length>=20){
        this.state.data1.shift();
      }

      this.setState({
        data1:this.state.data1.concat([{name: 'Page '+Number((Math.random() * 10).toFixed(0)), uv: Math.random()*4000, pv: Math.random()*4000, amt: Math.random()*4000}])
      });
      // this.state.data1.concat([{name: 'Page '+Number((Math.random() * 10).toFixed(0)), uv: Math.random()*4000, pv: Math.random()*4000, amt: Math.random()*4000}]);
    },2000);
  }

  render(){
    return(
      <div>
        <h2>Charts Done using ReCharts</h2>
        <Row title="Multiline Bar Chart">
          <LineChart width={500} height={200} data={this.state.data1}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Line type="linear" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
            <Line type="linear" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </Row>
          
        <Row title='Bar Chart Sample'>
          <BarChart width={500} height={200} data={this.state.data1}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </Row>
        <Row title='Area Chart sample'>
          <AreaChart width={500} height={200} data={this.state.data1}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Area type='linear' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
          </AreaChart>
        </Row>
        
      </div>
    );
  }
}

ReChartsSamples.propTypes={
  title:PropTypes.string,
  children:PropTypes.element
};

export default ReChartsSamples;