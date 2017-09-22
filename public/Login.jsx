import React from 'react';
import { Button } from 'react-bootstrap';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
    var styleName = {
    	fontSize: 40,
    	color: "black",
    	align: "center",
    	"margin-left": "50px"
    };
    var dest = {
    	"margin-left": "50px",
    	"font-weight": "bold" 
    };

    return (
  		<div>
  			<div className="login" >
  			<br /><br /><br /><br /><br /><br /><br /><br /><br />
	  			<h1 style={dest}>Welcome to Destinations!</h1>
		      <h2 style={{"margin-left": "50px"}}> Plan your trip today! </h2>
		      <br /><br /><br />
		        <Button style={dest}> <a href="/auth/facebook">Login with Facebook</a></Button>
  			<br /><br /><br /><br /><br /><br /><br /><br /><br />
  			<br /><br /><br /><br /><br /><br /><br /><br /><br />
  			<h5 className="members" style={styleName}> Dillon, Eric, Max, Minwoo </h5>
  			</div>
  			</div>
    )
	}
}
