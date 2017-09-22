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
    	"marginLeft": "50px"
    };
    var dest = {
    	"marginLeft": "50px",
    	"fontWeight": "bold" 
    };
    var teamName = {
      "marginLeft": "70px",
      "fontWeight": "bold",
      fontSize: 60,
      color: "blue"
    }
    return (
  		<div>
  			<div className="login" >
  			<br /><br /><br /><br /><br /><br /><br /><br /><br />
	  			<h1 style={dest}>Welcome to Destinations!</h1>
		      <br /><br /><br />
		      <h2 style={{"marginLeft": "50px"}}> Plan your trip today! </h2>
		      <br /><br /><br />
		        <Button style={dest}> <a href="/auth/facebook">Login with Facebook</a></Button>
  			<br /><br /><br /><br /><br /><br /><br /><br /><br />
  			<br /><br /><br /><br /><br />
        <h4 style={teamName}> Hippos </h4>
  			<h5 className="members" style={styleName}> Dillon, Eric, Max, Minwoo </h5>
  			</div>
  			</div>
    )
	}
}
