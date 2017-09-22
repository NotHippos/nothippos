import React from 'react';
import Display from './Display.jsx';
import { Col, Button } from 'react-bootstrap';
import PlacesAutocomplete, { geocodeByAddress, getLatLng, geocodeByPlaceId } from 'react-places-autocomplete';

export default class InputBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tripName: '',
      locationName: '',
      dateOfArrival: '',
      dateOfDeparture: '',
      latLng: '',
      address: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddCity = this.handleAddCity.bind(this);
    this.handleAddTripName = this.handleAddTripName.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(address) {
    this.setState({
      address: address
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name] : value
    });
  }

  handleAddCity(event) {
    
    event.preventDefault();
    console.log('Address: ', this.state.address);
    geocodeByAddress(this.state.address)
      .then(results => {
        return getLatLng(results[0]);
      })
      .then(latLng => {
        console.log('Latitude, Longitude: ', latLng);
        this.setState({
          latLng: latLng
        })
        this.props.addTagsToParent(this.state.tripName);
      })
      .then(()=>{
        this.props.addCityToParent(this.state.address, this.state.dateOfArrival, this.state.dateOfDeparture, this.state.latLng);
      })
      .then(()=> {
        this.props.changeCityMarkers(this.state.locationName, this.state.latLng);
      })
      .catch(error => console.error('Error', error))
  }

  handleAddTripName(event) {
    event.preventDefault();
    this.props.addTagsToParent(this.state.tripName);
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    }

    let city = this.props.currentCities.map((city, i) => {
      return (
        <Display city={city} currentCities={this.state.currentCities} key={i} idx={i} changeCurrentEditCity={this.props.changeCurrentEditCity}/>
       )
    });
    return ( 
      <Col sm={4} md={3}>
        <div className="inputBar">
        <h3>Input Bar</h3>
        <br/>
         <form onSubmit={this.state.handleAddCity}>
          <label>
            <input type="text" name="tripName" value={this.state.tripName} onChange={this.handleInputChange}/> 
            <br/>
            Trip Name
          </label>
          <br/>
        </form>
        <br/>
        <br/>

        <form >
          <label>
            
            <PlacesAutocomplete  inputProps={inputProps} type="text" name="locationName" value={this.state.locationName} onChange={this.handleInputChange}/> 
            Location 
          </label>
          <br/>
          <br/>
          <label>
             
            <input type="text" name="dateOfArrival" value={this.state.dateOfArrival} onChange={this.handleInputChange}/> 
            <br/>
            Date of Arrival
          </label>
          <br/>
          <label> 
            <input type="text" name="dateOfDeparture" value={this.state.dateOfDeparture} onChange={this.handleInputChange}/> 
            <br/>
            Date of Departure
          </label>
          <br/>
          
        </form>
        
        <form>
        <div  className="inputButton">
        <Button type="submit" value="Add" action="#" onClick={this.handleAddCity}>Add</Button>
        <Button type="Submit" onClick={(event) => {
            this.props.saveNewTrips()
          }}>Save</Button>
        <br/>
        {city}
        <br/>
 
          </div>
        </form>
      </div>
    </Col>
  )
 }
}