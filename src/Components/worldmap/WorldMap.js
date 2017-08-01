import React from 'react';
import {geoMercator,geoPath} from 'd3-geo';
import {feature} from 'topojson-client';
import PropTypes from 'prop-types';
// import mapData from './map/110m.json';



class WorldMap extends React.Component{
  constructor(props){
    super(props);
    this.state={
      worldData:[]
    };
    this.handleCountryClick=this.handleCountryClick.bind(this);

  }

  projection(){
    return geoMercator()
      .scale(100)
      .translate([this.props.width/2,this.props.height/2]);
  }

  componentDidMount(){
    fetch('/api/test')
      .then(response=>{
        if(response.status!=200){
          console.log('There was a problem : '+response.status);
          return;
        }

        response.json().then(worldData=>{
          this.setState({
            worldData:feature(worldData,worldData.objects.countries).features,
          });
        });
      });

    // (mapData)=>{
    //   this.setState({
    //     worldData:feature(mapData,mapData.objects0000000.countries).features,
    //   });
    // };
  }

  handleCountryClick(countryIndex){
    console.log('Clicked on a country', this.state.worldData[countryIndex]);
  }

  render(){
    return(
      
      <svg width={this.props.width} height={this.props.height} viewBox={`0 0 ${this.props.width} ${this.props.height}`}>
        <g className='countries'>
          {
            this.state.worldData.map((d,i)=>(
              <path 
                key={`path-${i}`}
                d={geoPath().projection(this.projection())(d)}
                className='country'
                fill={`rgba(38,50,56,${1 / this.state.worldData.length * i})`}
                stroke='#ffffff'
                strokeWidth={0.5}
                onClick={()=>{this.handleCountryClick(i);}}/>
            ))
          }
        </g>
        <g className='markers'>
          {/* <circle 
            cx={this.projection()([8,48])[0]}
            cy={this.projection()([8,48])[1]}
            r={10}
            fill='#E91E63'
            className='marker'
          /> */}

          {
            this.props.markers.map((city,i)=>(
              <circle 
                key={`marker-${i}`} 
                cx={this.projection()(city.coordinates)[0]} 
                cy={this.projection()(city.coordinates)[1]} 
                r={(city.population/100).toFixed(0)}
                fill='#E91E63'
                stroke='#FFFFFF'
                className='marker' />
            ))
          }
        </g>
      </svg>
    );
  }
}


WorldMap.propTypes={
  width:PropTypes.number.isRequired,
  height:PropTypes.number.isRequired,
  markers:PropTypes.array
};

export default WorldMap;