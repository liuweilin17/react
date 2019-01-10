import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import prices from './prices.json';
import * as serviceWorker from './serviceWorker';

// 'required' is used in nodejs 
const { compose, withProps, withHandlers } = require("recompose");
const {
  withScriptjs,  //HOC
  withGoogleMap, //HOC
  GoogleMap,  //UI component
  Marker, //UI component
  InfoWindow, //UI component
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer"); //UI component

class InfoWindowMarker extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isOpen: false
		}
		this.handleToggle = this.handleToggle.bind(this);
	}

	handleToggle(even) {
		this.setState({isOpen: !this.state.isOpen});
	}

	render() {
		return (
			<Marker
				key={this.props.index}
				position={{ lat: this.props.lat, lng: this.props.lng}}
				onClick={this.handleToggle}
			>
			{
			this.state.isOpen &&
			 <InfoWindow onCloseClick={this.handleToggleClose}>
				 <div>Price: ${this.props.price}K</div>
			 </InfoWindow>
		 	}
			</Marker>
		)
	}
}

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=",
    loadingElement: <div style={{ height: `90%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `90%` }} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (event) => {
      const markers = event.getMarkers();
      const infowindow = new window.google.maps.InfoWindow();
      const cluster = markers.map(model => [model.position.lat(), model.position.lng()]);
      //console.log(cluster);
      //console.log(data);
      let totalPrices = 0.0;
      for(let i in cluster) {
      	const lat_i = cluster[i][0];
      	const lng_i = cluster[i][1];
      	//console.log(lat_i);
      	//console.log(lng_i);
      	for(let j in prices) {
	      	let lat = prices[j].latitude;
	      	let lng = prices[j].longitude;
	      	let price = prices[j].price;
	      	if(lat - lat_i < 0.0001 && lat - lat_i > -0.0001 && lng - lng_i < 0.0001 && lng - lng_i > -0.0001) {
	      		totalPrices = totalPrices + price;
	      		continue
	      	}
      	}
      }
      const avg = totalPrices / cluster.length;
      infowindow.setContent("Price: $" + Math.round(avg).toString() + 'K');
      infowindow.setPosition(event.getCenter());
      infowindow.open(event.map_);
      //console.log(event)
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 43.662, lng: -79.395 }}
  >
    <MarkerClusterer
		onClick={props.onMarkerClustererClick}
		//minimumClusterSize={1}
		defaultZoomOnClick={false}
		zoomOnClick={false}
		averageCenter
		enableRetinaIcons
		gridSize={60}
    >
      {props.markers.map(marker => (
      	<InfoWindowMarker 
      		key={marker.key}
      		lat={marker.latitude}
      		lng={marker.longitude}
      		price={marker.price}
      	/>
	    ))}
    </MarkerClusterer>
  </GoogleMap>
);

class MapApp extends React.PureComponent {
  componentWillMount() {
    this.setState({ markers: [] })
  }

  componentDidMount() {
      this.setState({markers: this.props.data});
  }

  render() {
    return (
      <MapWithAMarkerClusterer markers={this.state.markers}/>
    )
  }
}

ReactDOM.render(
	<MapApp data={prices}/>,
	document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
