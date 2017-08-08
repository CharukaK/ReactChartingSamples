import React from 'react';
import PropTypes from 'prop-types';
import Row from '../RowComp';
import {
  ScatterChart, Scatter, ZAxis, AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ReferenceLine, Brush
} from 'recharts';

class ReChartsSamples extends React.Component {

    brushData = [
      {name: '1', uv: 300, pv: 456},
      {name: '2', uv: -145, pv: 230},
      {name: '3', uv: -100, pv: 345},
      {name: '4', uv: -8, pv: 450},
      {name: '5', uv: 100, pv: 321},
      {name: '6', uv: 9, pv: 235},
      {name: '7', uv: 53, pv: 267},
      {name: '8', uv: 252, pv: -378},
      {name: '9', uv: 79, pv: -210},
      {name: '10', uv: 294, pv: -23},
      {name: '12', uv: 43, pv: 45},
      {name: '13', uv: -74, pv: 90},
      {name: '14', uv: -71, pv: 130},
      {name: '15', uv: -117, pv: 11},
      {name: '16', uv: -186, pv: 107},
      {name: '17', uv: -16, pv: 926},
      {name: '18', uv: -125, pv: 653},
      {name: '19', uv: 222, pv: 366},
      {name: '20', uv: 372, pv: 486},
      {name: '21', uv: 182, pv: 512},
      {name: '22', uv: 164, pv: 302},
      {name: '23', uv: 316, pv: 425},
      {name: '24', uv: 131, pv: 467},
      {name: '25', uv: 291, pv: -190},
      {name: '26', uv: -47, pv: 194},
      {name: '27', uv: -415, pv: 371},
      {name: '28', uv: -182, pv: 376},
      {name: '29', uv: -93, pv: 295},
      {name: '30', uv: -99, pv: 322},
      {name: '31', uv: -52, pv: 246},
      {name: '32', uv: 154, pv: 33},
      {name: '33', uv: 205, pv: 354},
      {name: '34', uv: 70, pv: 258},
      {name: '35', uv: -25, pv: 359},
      {name: '36', uv: -59, pv: 192},
      {name: '37', uv: -63, pv: 464},
      {name: '38', uv: -91, pv: -2},
      {name: '39', uv: -66, pv: 154},
      {name: '40', uv: -50, pv: 186}
    ];

    series = [
      {
        name: 'Microsoft Internet Explorer',
        y: 56.33,
        drilldown: 'Microsoft Internet Explorer'
      }, {
        name: 'Chrome',
        y: 24.03,
        drilldown: 'Chrome'
      }, {
        name: 'Firefox',
        y: 10.38,
        drilldown: 'Firefox'
      }, {
        name: 'Safari',
        y: 4.77,
        drilldown: 'Safari'
      }, {
        name: 'Opera',
        y: 0.91,
        drilldown: 'Opera'
      }, {
        name: 'Proprietary or Undetectable',
        y: 0.2,
        drilldown: null
      }];

    drillDown = {
      'Microsoft Internet Explorer': [
        {
          name: 'v11.0',
          y: 24.1
        }, {
          name: 'v8.0',
          y: 17.2
        }, {
          name: 'v9.0',
          y: 8.1
        }, {
          name: 'v10.0',
          y: 5.3
        }, {
          name: 'v6.0',
          y: 1.1
        }, {
          name: 'v7.0',
          y: 0.5
        }]
    };

    dataset = 1;

    handleDrillDownClick() {
      if (this.dataset === 1) {
        this.dataset = 0;
      } else {
        this.dataset = 1;
      }
    }





    constructor(props) {
      super(props);
      this.state = {
        data1: [
          {name: 'Page A', uv: Math.random() * 4000, pv: Math.random() * 4000, amt: Math.random() * 4000},

        ],
        table: []

      };

      this.handleDrillDownClick = this.handleDrillDownClick.bind(this);
      this.CustomDrillDownLegend=this.CustomDrillDownLegend.bind(this);
      // this.CustomDrillDownLegend=this.CustomDrillDownLegend.bind(this);
    }

    CustomDrillDownLegend(mainSet,secondarySet){
      return(
        <div>
          <select>
            
          </select>
        </div>
      );
    }

    componentDidMount() {
      setInterval(() => {
        // let arr= this.state.data1.slice();
        // arr.push({name: 'Page '+Math.random()*100, uv: Math.random()*4000, pv: Math.random()*4000, amt: Math.random()*4000});
        if (this.state.data1.length >= 20) {
          this.state.data1.shift();
        }
        let x;
        if (this.dataset === 1) {
          x = this.series;
        } else {
          x = this.drillDown;
        }
        this.setState({
          data1: this.state.data1.concat([{
            name: 'Page ' + Number((Math.random() * 10).toFixed(0)),
            uv: Math.random() * 4000,
            pv: Math.random() * 4000,
            amt: Math.random() * 4000
          }]),
          table: x
        });
        // this.state.data1.concat([{name: 'Page '+Number((Math.random() * 10).toFixed(0)), uv: Math.random()*4000, pv: Math.random()*4000, amt: Math.random()*4000}]);
      }, 2000);
    }

    render() {
     

      return (
        <div>
          <h2>Charts Done using ReCharts</h2>
          <Row title="Multiline Bar Chart">
            <LineChart width={500} height={200} data={this.state.data1}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend/>
              <Line type="linear" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
              <Line type="linear" dataKey="uv" stroke="#82ca9d"/>
            </LineChart>
          </Row>

          <Row title='Bar Chart Sample'>
            <BarChart width={500} height={200} data={this.state.data1}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend/>
              <Bar dataKey="pv" fill="#8884d8"/>
              <Bar dataKey="uv" fill="#82ca9d"/>
            </BarChart>
          </Row>
          <Row title='Area Chart sample'>
            <AreaChart width={500} height={200} data={this.state.data1}
              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Area type='linear' dataKey='uv' stroke='#8884d8' fill='#8884d8'/>
            </AreaChart>
          </Row>

          <Row title='Brush with Chart example'>
            <BarChart width={500} height={200} data={this.brushData}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend verticalAlign="top" wrapperStyle={{lineHeight: '40px'}}/>
              <ReferenceLine y={0} stroke='#000'/>
              <Brush dataKey='name' height={30} stroke="#8884d8"/>
              <Bar dataKey="pv" fill="#8884d8"/>
              <Bar dataKey="uv" fill="#82ca9d"/>
            </BarChart>
          </Row>

          <Row title="Drill Down Bar Chart">
            <BarChart width={500} height={200}
              data={this.dataset === 1 ? this.series : this.drillDown['Microsoft Internet Explorer']}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend/>
              <Bar dataKey="y" fill="#8884d8" onClick={this.handleDrillDownClick}/>

            </BarChart>
          </Row>


        </div>
      );
    }

    

}





ReChartsSamples.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element
};

export default ReChartsSamples;