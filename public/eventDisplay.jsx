import React from 'react';

export default class EventDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityName: '',
      date: '',
      time: '',
      location: '',
      notes: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSaveEvent = this.handleSaveEvent.bind(this);
  }

  componentDidMount() {
    this.setState({
      activityName: this.props.event.activityName,
      date: '',
      time: '',
      location: '',
      notes: ''
    })
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
  }

  render() {
    return (
      <div>
        <form >
          <label>
            Activity Name: 
            <input type="text" name="activityName" value={this.state.activityName} onChange={this.handleInputChange}/> 
          </label>
          <br/>
          <label>
            Date: 
            <input type="text" name="date" defaultValue={this.props.event.date} onChange={this.handleInputChange}/> 
          </label>
          <br/>
          <label>
            Time: 
            <input type="text" name="date" defaultValue={this.props.event.time} onChange={this.handleInputChange}/> 
          </label>
          <br/>
          <label>
            Location: 
            <input type="text" name="location" defaultValue={this.props.event.location} onChange={this.handleInputChange}/> 
          </label>
          <br/>
          <label>
            Notes: 
            <input type="text" name="notes" defaultValue={this.props.event.notes} onChange={this.handleInputChange}/> 
          </label>
          <br/>
          <button onClick={this.handleSaveEvent}> Save Trip </button>
        </form>
        <br/>
        <br/>
      </div>
    )
  }
}