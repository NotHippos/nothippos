import React from 'react';
import Hidden from './Hidden.jsx';
import axios from 'axios';
import DropdownButton from 'react-bootstrap';


class TopBar extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			showDiv: false
		}
	this.showSavedTags = this.showSavedTags.bind(this);
	this.tagClicked = this.props.tagClicked.bind(this);
  this.createNewTrip = this.createNewTrip.bind(this);
	}

	showSavedTags () {
    if (this.state.showDiv === true) {
    	this.setState({
     	  showDiv: false
      })
    } else if (this.state.showDiv === false){
    	this.setState({
        showDiv: true	
      })
    }
  }
  
  /*
  Redirects to new page which is pretty much like creating a new trip.
  */
  createNewTrip() {
  	this.props.createNewTrip()
  }

	render(){
		let savedTags = this.props.savedTags.map((tag, i) => {
    if (this.state.showDiv === true) {
			return <Hidden tag={tag} tagClicked={this.props.tagClicked} key={i} />
			}
		})
		return ( 
			<div className="topBar">
        <ul>
  			  <li onClick={this.createNewTrip}> <h4> Create New Trip </h4> </li>
  	   	  <li onClick={this.showSavedTags}> <h4> Saved Trip </h4> </li>
        </ul>
        <div className="hiddenTags">
          {savedTags}	
        </div>    
      </div>
	  )}
}
export default TopBar;