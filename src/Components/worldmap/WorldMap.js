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
    this.handleMarkClick=this.handleMarkClick.bind(this);
    this.handleCountryMouseOver=this.handleCountryMouseOver.bind(this);
    this.handleCountryMouseExit=this.handleCountryMouseExit.bind(this);
    this.handleAreaMouseDown=this.handleAreaMouseDown.bind(this);
    this.handleAreaMouseUp=this.handleAreaMouseUp.bind(this);
    // this.handleAreaRightClick=this.handleAreaRightClick(this);
  }



  projection(){
    return geoMercator()
      .scale(100)
      .translate([this.props.width/2,this.props.height/2]);
  }

  componentDidMount(){
    //fetches data requrired to generate the map from topojson file
    fetch('/api/test')
      .then(response=>{
        if(response.status!==200){
          console.log('There was a problem : '+response.status);
          return;
        }

        response.json().then(worldData=>{
          this.setState({
            worldData:feature(worldData,worldData.objects.countries).features,
          });
        });
      });


  }


  /**
   * function to handle user clicking on a country
   *
   * @param {*} countryIndex - Index of the country in topojson file
   */
  handleCountryClick(countryIndex){
    console.log('Clicked on a country', this.state.worldData[countryIndex]);
  }

  handleMarkClick(markIndex){
    console.log(markIndex);
  }

  handleCountryMouseOver(evt){
    evt.target.setAttribute('fill-opacity','0.5');
    // element.setAttribute('opacity','1');
  }

  handleCountryMouseExit(evt){
    evt.target.setAttribute('fill-opacity','1');
  }

  handleAreaMouseDown(evt){
    evt.target.setAttribute('fill','#4286f4');
    evt.target.setAttribute('fill-opacity','1');
  }

  handleAreaMouseUp(evt,val){
    evt.target.setAttribute('fill',val);
  }

  // handleAreaRightClick(evt){
  //   evt.target.setAttribute('fill','#56f442');
  //
  // }

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
                fill={`rgba(38,50,56,${(1 / this.state.worldData.length * i)})`}
                stroke='#ffffff'
                strokeWidth={0.5}

                // onClick={()=>{this.handleCountryClick(i);}}
                onMouseOver={(evt)=>this.handleCountryMouseOver(evt)}
                onMouseLeave={(evt)=>this.handleCountryMouseExit(evt)}
                onMouseDown={(evt)=>this.handleAreaMouseDown(evt)}
                onMouseUp={(evt)=>this.handleAreaMouseUp(evt,`rgba(38,50,56,${(1 / this.state.worldData.length * i)})`)}
              />
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

            this.props.markers.map((location,i)=>(
              <circle
                key={`marker-${i}`}
                cx={this.projection()(location.coordinates)[0]}
                cy={this.projection()(location.coordinates)[1]}
                r={(location.value/100).toFixed(0)}
                fill={this.props.markFill}
                stroke={this.props.markStroke}
                className='marker'
                onClick={()=>{this.handleMarkClick(i);}} />
            ))
          }
        </g>
      </svg>
    );
  }


}




export function Markers(props){
  return(
    props.markers.map((location,i)=>(
      <circle
        key={`marker-${i}`}
        cx={props.xCoordinate}
        cy={props.yCoordinate}
        r={props.radius}
        fill={props.markFill}
        stroke={props.markStroke}
        onClick={props.onClick}
      />
    ))
  );
}

WorldMap.propTypes={
  width:PropTypes.number.isRequired,
  height:PropTypes.number.isRequired,
  markers:PropTypes.array,
  markFill:PropTypes.string,
  markStroke:PropTypes.string
};

export default WorldMap;
