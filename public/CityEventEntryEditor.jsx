import React from 'react';
import EventDisplay from './EventDisplay.jsx';
import { Col, Button } from 'react-bootstrap';
import ToggleDisplay from 'react-toggle-display';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class CityEventEntryEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete () {
    this.props.deleteCity();
  }

  componentDidUpdate (prevProps, prevState) {
  }

  handleClick() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    var events = [].concat(this.props.currentEditCity.events)
      .map((event, i) => {
      return <EventDisplay saveEvent={this.props.saveEvent} event={event} key={event.activityName.toString() + event.location.toString()} idx={i} />
    });
    return (
      <div className="currentCityEdit">
        <h4 className="currentCityName"> Current City: {this.props.currentEditCity.locationName} </h4>
        <Link to={`/home`}>
          <Button className="returnToTrip"> Return To Trip Overview </Button>
        </Link>
        <Button className="returnToTrip" onClick={this.handleDelete}> Delete This City </Button>
        <br/>

        {events}

        <Button className="createNewEventButton" onClick={this.props.createNewEvent}> Create New Event </Button>

      </div>
    )
  }
}