import React, { Component } from 'react';
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Legend,LineChart,Line,Tooltip,ReferenceLine} from 'recharts';
import PropTypes from 'prop-types';

class Gadget extends Component {
  
  constructor(props) {
    super(props);
    this.handleSelectorClick=this.handleSelectorClick.bind(this);
    this.detectChangeInFrom=this.detectChangeInFrom.bind(this);
    this.detectChangeInTo=this.detectChangeInTo.bind(this);
    this.state={
      chartType:'linear',
      from:0,
      to:props.data.length,
      
    };  
  }

  handleSelectorClick(evt){
    this.setState({
      chartType:`${evt.target.value}`,
      to:this.state.to,
      from:this.state.from
    });
  }

  
  detectChangeInFrom(evt){
    this.setState({
      from:evt.target.value
    });
  }
  
  detectChangeInTo(evt){
    this.setState({
      to:evt.target.value
    });
  }

  renderChart(chartType){
    if(chartType==='linear'){
      return(
        <LineChart width={500} height={200} data={this.props.data.filter((el)=>{
          return parseInt(el.name)>=this.state.from && parseInt (el.name)<=this.state.to;    
        })}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend/>
          <ReferenceLine y={0} stroke='#000'/>
          <Line type="linear" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
          <Line type="linear" dataKey="uv" stroke="#82ca9d"/>
        </LineChart>
      );
    }else{
      return(
        <BarChart width={500} height={200} data={this.props.data.filter((el)=>{
          return parseInt(el.name)>=this.state.from && parseInt (el.name)<=this.state.to;   
        })}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend/>
          <ReferenceLine y={0} stroke='#000'/>
          <Bar dataKey='pv' fill='#42f468' />
          <Bar dataKey='uv' fill='#f49241' />
        </BarChart>
      );
    }
  }  

  render() {
    return (
      <div>
        <select value={this.state.values} onChange={this.handleSelectorClick}>
          <option>linear</option>
          <option>bar</option>
        </select>
        <div>
          <p>filter results between</p>
          <label htmlFor='from'>From</label>

          <input id='from' name='from' type='text' 
            value={this.state.from} onChange={this.detectChangeInFrom} />
          <label htmlFor='from'>To</label>

          <input id='from' name='from' type='text' 
            value={this.state.to} onChange={this.detectChangeInTo}/>
          <input type='button' value='filter'/>
        </div>
        {this.renderChart(this.state.chartType)}     
      </div>
    );
  }
}

Gadget.propTypes={
  data:PropTypes.array
};

export default Gadget;