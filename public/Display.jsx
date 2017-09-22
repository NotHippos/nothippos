import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class Displayed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {


    }
    this.changeValue = this.changeValue.bind(this);
  }
  changeValue () {
    this.props.changeCurrentEditCity(this.props.idx);
  }


  render() {
    return (
      <div>
          <Link to={`/home/edit`}>
            <h4 onClick={this.changeValue}>{this.props.city.locationName}</h4>
          </Link>
      </div>
    )
  }
}