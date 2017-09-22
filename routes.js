const express = require('express');
const router = express.Router();
const City = require('./db/citySchema');
const User = require('./db/userSchema');
var app = express();
var bodyParser = require('body-parser')


// router.get('/', function(req, res) {
//   res.redirect('/#/');
// });



router.get('/login',function(req, res) {
  res.redirect('/#/login'); 
});

router.get('/tagList', function(req, res) {
  var session = req.session.passport;
  User.find({'user': session.user.id})
    .then(result => {
      res.send(result[0].tripTags)
    })
});


router.get('/savedTrips', function(req, res) { 
  var session = req.session.passport; 
  var seek = req.query.tag
  City.find({'tag': seek, 'user': session.user.id})
    .then(result => {  
      res.send(result) 
    })
});

router.get('/deleteCity', function(req, res) {
  var session = req.session.passport;
  var cityName = req.query.cityName;
  var tripName = req.query.tripTag;
  // need to get user, tripName, city
  // delete entry from db
  console.log('HEREEEEE')
  City.find({'tripName': tripName, 'cityName': cityName, 'user': session.user.id})
    .then((error, cityInfo) => {
      if (error) {
        console.log(error);
      } else {
        console.log(cityInfo);
        // res.send(cityInfo); 
      }
    })
});

// router.get('/deleteCity', function(req, res) {
//   City.find({'cityName': })
// });

router.post('/saveNewTrip', function(req, res) {
  var session = req.session.passport;
  let err;

  req.body.currentCities.forEach((city) => {
      City.create({
        tag: req.body.tags,
        user: session.user.id,
        cityName: city.locationName,
        dateOfArrival: city.dateOfArrival,
        dateOfDeparture: city.dateOfDeparture,
        events: city.events
      }).then((error) => {
        if (error) {
          err = error;
        }
      })
  })

  User.findOne({'user': session.user.id}, function(err, data) {
    if (err) {
    } else if (!data) {
      User.create({
        user: session.user.id
      });
    } else if (data) {
      var tempTripTags = data.tripTags;
      tempTripTags.push(req.body.tags);

      data.save(error => {
        if (error) {
          err = error;
        } else {
          User.tripTags = tempTripTags;          
        }
      })
    }
  })

  if (err) {
    res.sendStatus(400);
  } else {
    res.redirect(201, '/#/viewTrip');
  } 
});



module.exports = router;