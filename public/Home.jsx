import React from 'react';
import InputBar from './InputBar.jsx';
import Displayed from './Display.jsx';
import TopBar from './TopBar.jsx';
import Hidden from './Hidden.jsx';
import EditPlanDisplay from './EditPlanDisplay.jsx';
import ShowCityTrip from './ShowCityTrip.jsx';
import WebsiteName from './WebsiteName.jsx';
import axios from 'axios';
import querystring from 'querystring';
import style from './style.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  location
} from 'react-router-dom'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCities: [],
      tags: '',
      currentEditCity: {
        events: []
      },
      savedTags: [],
      cityMarkers: [],
      worldCenter: {
        lat: 41.9, lng: -87.624
      },
      worldZoom: 3,
      currentCityCenter: {
        lat: 41.9, lng: 87.624
      },
      cityZoom: 10
    }
    this.addCity = this.addCity.bind(this);
    this.addTags = this.addTags.bind(this);
    this.tagClicked = this.tagClicked.bind(this);
    this.saveNewTrips = this.saveNewTrips.bind(this);
    this.changeCurrentEditCity = this.changeCurrentEditCity.bind(this);
    this.createNewEvent = this.createNewEvent.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
    this.changeCityMarkers = this.changeCityMarkers.bind(this);
    this.deleteCity = this.deleteCity.bind(this);
  }

  changeCityMarkers (location, position) {
    var newMarker = {
      cityName: location,
      position: position
    }
    var currentMarkers = this.state.cityMarkers;
    currentMarkers.push(newMarker);
    this.setState({
      cityMarkers: currentMarkers
    })
  }

  componentDidMount() {
    axios.get('/api/tagList')
      .then(res => {
        console.log(res)
        this.setState({
          savedTags: res.data
      })
    })
  }

  changeCurrentEditCity (idx) {
    var temp = this.state.currentCities[idx];
    console.log('changing current city', temp.latLng);
    this.setState ({
      currentEditCity: temp,
      currentCityCenter: temp.latLng
    })
    console.log(this.state);
  }

  createNewEvent () {
    var newEvent = {
      activityName: 'Click To Edit New Event',
      date: '',
      time: '',
      location: '',
      notes: '',
    }
    var tempCurrentEditCity = this.state.currentEditCity;
    var tempEvents = tempCurrentEditCity.events;
    tempEvents.push(newEvent);
    tempCurrentEditCity.events = tempEvents;
    this.setState ({
      currentEditCity: tempCurrentEditCity
    })
    console.log(this.state.currentEditCity);
  }

  deleteCity() {
    console.log(this.state, 'hi')
    axios({
      method: "get",
      url: "/api/deleteCity",
      params: {
        cityName: this.state.currentCities.locationName,
        tripTag: this.state.savedTags
      }
    })
    console.log('hihihihi')
  }

  saveEvent (idx, activityName, date, time, location, notes) {
    var cityToEdit = this.state.currentEditCity;
    var eventsToEdit = cityToEdit.events;
    var eventEditChanges = {
      activityName: activityName,
      date: date,
      time: time,
      location: location,
      notes: notes
    };
    eventsToEdit[idx] = eventEditChanges;
    eventsToEdit.sort(function(a,b) {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      } else {
        if (a.time < b.time) {
          return -1;
        } else {
          return 1;
        }
      }
    })
    cityToEdit.events = eventsToEdit;
    var city = {
      locationName: cityToEdit.locationName,
      dateOfArrival: cityToEdit.dateOfArrival,
      dateOfDeparture: cityToEdit.dateOfDeparture,
      events: eventsToEdit
    }
    this.setState ({
      currentEditCity: city
    })
    console.log(this.state.currentEditCity);

  }

  addCity (locationName, dateOfArrival, dateOfDeparture, latLng) {
    var city = {
      locationName: locationName,
      dateOfArrival: dateOfArrival,
      dateOfDeparture: dateOfDeparture,
      latLng: latLng,
      events: [
        {
          activityName: 'Arrival',
          date: dateOfArrival,
          time: '',
          location: locationName,
          notes: '',
        },
        {
          activityName: 'Departure',
          date: dateOfDeparture,
          time: '',
          location: locationName,
          notes: '',
        }
      ]
    }
    var tempCities = this.state.currentCities;
    tempCities.push(city);
    this.setState ({
      currentCities: tempCities
    })
    console.log(this.state);
  }

  addTags (tripName) {
    this.setState ({
      tags: tripName
    })
    console.log(this.state);
  }

  saveNewTrips() {
    var atag = this.state.tags;
    var current = this.state.currentCities;
    axios({
      method: "POST",
      url: "/api/saveNewTrip",
      data: {
        tags: atag,
        currentCities: current
      }
    });
    axios.get('/api/tagList')
      .then(res => {
        this.setState({
          savedTags: res.data
      })
    })
    this.saveToSavedTags(atag);
  }

  saveToSavedTags(tag) {
    this.state.savedTags.push(tag);
  }

  deleteCity(clicked) {
    axios({
      method: "get",
      url: "/api/deleteCity",
      params: {
        cityName: this.state.currentCities[0].locationName,
        tripTag: this.state.tags
      }
    })
    console.log('sent!!', this.state.currentCities[0].locationName)
  }

  tagClicked(clickedit) {
    axios({
      method: "get",
      url: "/api/savedTrips",
      params:{
        tag: clickedit
      }
    })
    .then(res => {
      console.log(res, 'RES')
      var temp = [];
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].cityName !== undefined) {
          var tempObj = {};
          tempObj.locationName = res.data[i].cityName;
          tempObj.dateOfArrival = res.data[i].dateOfArrival;
          tempObj.dateOfDeparture = res.data[i].dateOfDeparture;
          tempObj.events = res.data[i].events;
          temp.push(tempObj)
        }
      }
      this.setState({
        currentCities: temp,
        tags: clickedit
      })
    })
  }

  render() {

    return (
      <div>
        <WebsiteName/>

        <InputBar changeCityMarkers={this.changeCityMarkers} addCityToParent={this.addCity} addTagsToParent={this.addTags}
          saveNewTrips={this.saveNewTrips} currentCities={this.state.currentCities} changeCurrentEditCity={this.changeCurrentEditCity}
        />
                <Route exact path={`/home/edit`} render={() => (
          <EditPlanDisplay zoom={this.state.cityZoom} mapCenter={this.state.currentCityCenter} cityMarkers={this.state.cityMarkers} saveEvent={this.saveEvent} 
          createNewEvent={this.createNewEvent} savedTags={this.state.savedTags} 
          tagClicked={this.tagClicked} currentEditCity={this.state.currentEditCity}/>
        )}/>
        <Route exact path={`/home`} render={() => (
            <ShowCityTrip zoom={this.state.worldZoom} mapCenter={this.state.worldCenter} currentCities={this.state.currentCities} tags={this.state.tags} cityMarkers={this.state.cityMarkers} savedTags={this.state.savedTags} 
            tagClicked={this.tagClicked}
          />
        )}/>

          

      
      </div>
    )
  }
}