import React from 'react';
import Row from '../RowComp';
import Vega from 'react-vega';
import specs from './Specs/LineChartSpec';
import BarChart from './Specs/BarChart';
import AreaChart from './Specs/AreaChart';



class ReactVegaSamples extends React.Component{

  constructor(props){
    super(props);
    this.state={
      data: {
        table:[
          {"x": 0, "y": 28, "c":0}, {"x": 0, "y": 20, "c":1}
        ],
        bardata:[
          {'category': 'A', 'amount': 28}
        ]
      },
      x:1
      
    };
  }

  componentDidMount(){
    
    setInterval(()=>{
      // console.log('test');
      // thic
      // console.log(this.state.data);
      // this.state.data.table.concat();
      // this.state.data.table.push({"x": 9, "y": 49, "c":0});
      // this.state.data.table.push({"x": 9, "y": 49, "c":1});
      if(this.state.data.table.length>20){
        this.state.data.table.shift();
        this.state.data.table.shift();
        
      }

      if(this.state.data.bardata.length>20){
        this.state.data.bardata.shift();
      }
      var r=Number(this.state.x)+1;
      this.setState({
        data:{
          table:this.state.data.table.concat([{"x": r, "y": (Math.random()*100).toFixed(0), "c":0}, {"x": r, "y": (Math.random()*100).toFixed(0), "c":1}]),
          bardata:this.state.data.bardata.concat([{'category': r, 'amount':(Math.random()*100).toFixed(0)}])
        },
        x:r
      });
    },2000);
  }

  render(){
    return(
      <div>
        <h2 className="text-center">Samples made using react vega</h2>
        <Row title='Multiline Bar Chart'>
          <Vega spec={specs} data={this.state.data} />
        </Row>
        <Row title='BarChart Sample'>
          <Vega spec={BarChart} data={this.state.data} />
        </Row>
        <Row title='Area Chart Sample'>
          <Vega spec={AreaChart} data={this.state.data} />
        </Row>
      </div>
    );
  }


  
}



export default ReactVegaSamples;