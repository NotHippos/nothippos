import React from 'react';
import ToggleDisplay from 'react-toggle-display';
import { Col, Button } from 'react-bootstrap';

export default class EventDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityName: '',
      date: '',
      time: '',
      location: '',
      notes: '',
      show: true

    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSaveEvent = this.handleSaveEvent.bind(this);

  }

  componentDidMount() {
    this.setState({
      activityName: this.props.event.activityName,
      date: this.props.event.date,
      time: this.props.event.time,
      location: this.props.event.location,
      notes: this.props.event.notes,
    })
  }

  handleClick() {
    this.setState({
      show: !this.state.show
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name] : value
    });
    console.log(this.state);
  }
  handleSaveEvent(event) {
    event.preventDefault();
    this.props.saveEvent(this.props.idx, this.state.activityName, this.state.date, this.state.time, this.state.location, this.state.notes);
    this.setState({
      show: !this.state.show
    });
  }


  render() {
    return (
      <div className="eventDisplay">
        <ToggleDisplay  show={this.state.show}>
          <div className="eventView">
          <h3 onClick={ () => this.handleClick() } className="editEvent"> {this.state.activityName} </h3>
          <h5> <b>{this.state.date} </b> <small> {this.state.time} </small>  </h5>
          <h5> {this.state.location}  </h5>
          <p> {this.state.notes} </p>
          </div>
        </ToggleDisplay>
          



        <ToggleDisplay if={!this.state.show} tag="section">
        <form >
          <label>
            Activity Name: 
            <input type="text" name="activityName" value={this.state.activityName} onChange={this.handleInputChange}/> 
          </label>
          <br/>
          <label>
            Date: 
            <input type="text" name="date" value={this.state.date} onChange={this.handleInputChange}/> 
          </label>
          <br/>
          <label>
            Time: 
            <input type="text" name="time" value={this.state.time} onChange={this.handleInputChange}/> 
          </label>
          <br/>
          <label>
            Location: 
            <input type="text" name="location" value={this.state.location} onChange={this.handleInputChange}/> 
          </label>
          <br/>
          <label>
            Notes: 
            <input type="text" name="notes" value={this.state.notes} onChange={this.handleInputChange}/> 
          </label>
          <br/>
          <Button onClick={this.handleSaveEvent}> Save Event </Button>
        </form>
        </ToggleDisplay>
        <br/>
      </div>
    )
  }
}