import React from 'react';
// import ReactDom from 'react-dom';
// import ReChartSamples from './recharts/ReChartsSamples';
import ReactVegaSamples from './reactVega/ReactVegaSamples';
import ReChartSamples from './recharts/ReChartsSamples';
import WorldMap from './worldmap/WorldMap';
import Row from './RowComp';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      cities: [
        { name: 'country 1', coordinates: [139.6917,35.6895], population: 3784 },
      ]
    };
  }
  

  componentDidMount(){
    setInterval(()=>{
      if(this.state.cities.length>20){
        this.state.cities.shift();
      }

      this.setState({
        cities:this.state.cities.concat([
          {
            name:`random ${this.state.cities.length+1}`,
            coordinates:[(Math.random()*361-180),(Math.random()*181-90)],
            population:(Math.random()*1000).toFixed(0)
          }
        ])
      });
    },2000);

  }

  render(){




    return(
      <div>
        <h1 className='text-center'>React Charting Samples</h1>
        <div className='container'>
          {/* <div className='row'>
            <div className='col-md-6'><ReChartSamples /></div>
            <div className='col-md-6'><ReactVegaSamples /></div>
          </div> */}
          <div>
            {/* <Row title='World Map Sample'> */}
            <WorldMap width={800} height={450} markers={this.state.cities} />
            {/* </Row> */}
          </div>
        </div> 

        {/* <ReactVegaSamples /> */}
          
      </div>
    );
  }
}

export default App;
