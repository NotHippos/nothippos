import React from 'react';
import TopBar from './TopBar.jsx';
import SeeAllCities from './SeeAllCities.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Col } from 'react-bootstrap';

export default class ShowCityTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }


  render() {
    return (
      <Col sm={7} md={8}>
        <div>
            <TopBar savedTags={this.props.savedTags} tagClicked={this.props.tagClicked}/>
            <SeeAllCities zoom={this.props.zoom} mapCenter={this.props.mapCenter} currentCities={this.props.currentCities} tags={this.props.tags} 
            cityMarkers={this.props.cityMarkers}/>
        </div>
      </Col>
    )
  }
}