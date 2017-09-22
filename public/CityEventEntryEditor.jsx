import React from 'react';
import EventDisplay from './EventDisplay.jsx';
import { Col, Button } from 'react-bootstrap';
import ToggleDisplay from 'react-toggle-display';

export default class CityEventEntryEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
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
        <h4> Current City: {this.props.currentEditCity.locationName} </h4>
        <Button onClick={this.props.deleteCity}> Delete </Button>
        <br/>
        {events}
        <Button onClick={this.props.createNewEvent}> Create New Event </Button> 
      </div>
    )
  }
}