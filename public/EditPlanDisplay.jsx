import React from 'react';
import TopBar from './TopBar.jsx';
import CityEditView from './CityEditView.jsx';
import querystring from 'querystring';
import { Col } from 'react-bootstrap';


export default class EditPlanDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
    <Col sm={7} md={8}>
      <div>
        <TopBar createNewTrip={this.props.createNewTrip} savedTags={this.props.savedTags} tagClicked={this.props.tagClicked}/>
        <CityEditView deleteCity={this.props.deleteCity} zoom={this.props.zoom} mapCenter={this.props.mapCenter} deleteCity={this.props.deleteCity} cityMarkers={this.props.cityMarkers} saveEvent={this.props.saveEvent} createNewEvent={this.props.createNewEvent} currentEditCity={this.props.currentEditCity}/>
      </div>
    </Col>
    )
  }
}