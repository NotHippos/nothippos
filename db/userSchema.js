var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  user: String,
  tripTags: Array
})

module.exports = mongoose.model('User', userSchema);
