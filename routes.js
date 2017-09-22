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

router.post('/savedTrips', function(req, res) {
  var session = req.session.passport;
  City.find({'user': session.user.id,'tag': req.body.tags}, function(error, tripName) {
    console.log('this is the city info for a trip', tripName)
  //   if (error) {
  //     console.log(error);
  //   } 
  // }).then((tripName) => {
  //   res.send(tripName);
  });
});
router.get('/tagList', function(req, res) {
  User.find({'user': req.session.passport.user.id})
    .then(result => {
      res.send(result[0].tripTags);
    })
})

router.get('/savedTrips', function(req, res) {
  var seek = req.query.tag
  City.find({'tag': seek})
    .then(result => {
    console.log(result)  
      res.send(result)
    })
})



router.post('/saveNewTrip', function(req, res) {
  // console.log(req.body)  
  let err;
  var session = req.session.passport;

  console.log('current cities', req.body.currentCities)
  req.body.currentCities.forEach((city) => {
    console.log(city);
    
    // console.log('Creating city data')
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
      });
  });



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
      });
    }
  });

  if (err) {
    res.sendStatus(400);
  } else {
    res.redirect(201, '/#/viewTrip');
  } 
});



module.exports = router;