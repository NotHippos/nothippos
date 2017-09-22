const mongoose = require('mongoose');

const db = mongoose.connection;

db.on('error', () => console.error('EARroar!'));
db.once('open', function() {
  console.log('The doors are open! The doors are open.')
})

mongoose.connect('mongodb://hippo:hippo@ds141524.mlab.com:41524/destinations_hippo');

module.exports = db;
