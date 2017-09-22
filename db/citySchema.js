var mongoose = require('mongoose');

var citySchema = mongoose.Schema({
  tag: String,
  user: String,
  cityName: String,
  dateOfArrival: String,
  dateOfDeparture: String,
  events: Array
});
  

module.exports = mongoose.model('City', citySchema);
 