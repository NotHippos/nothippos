import React from 'react';
import TopBar from './TopBar.jsx';
import CityIt from './CityIt.jsx';
import MapWithADirectionsRenderer from './MapView.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class ShowAllCities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDvgO7kKFpb6Fo9FHcFfAIIcO4HMERU1fU&callback=initMap&libraries=places'



    }

  }



  render() {
    return (
      <div>
          <MapWithADirectionsRenderer zoom={this.props.zoom} mapCenter={this.props.mapCenter} cityMarkers={this.props.cityMarkers} googleMapURL={this.state.googleMapURL} />
          <CityIt currentCities={this.props.currentCities} tags={this.props.tags} />
      </div>
    )
  }
}