import React from 'react';
import MapWithADirectionsRenderer from './MapView.jsx';
import CityEventEntryEditor from './CityEventEntryEditor.jsx';
import querystring from 'querystring';
import { Col } from 'react-bootstrap';

export default class CityEditView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDvgO7kKFpb6Fo9FHcFfAIIcO4HMERU1fU&callback=initMap&libraries=places'

    }
  }

  render() {
    return (
        <div className="cityEditView">
          <MapWithADirectionsRenderer coords={this.props.coords} zoom={this.props.zoom} mapCenter={this.props.mapCenter} cityMarkers={this.props.cityMarkers} googleMapURL={this.state.googleMapURL} />
          <CityEventEntryEditor saveEvent={this.props.saveEvent} createNewEvent={this.props.createNewEvent} currentEditCity={this.props.currentEditCity}/>
        </div>

  )}
}
