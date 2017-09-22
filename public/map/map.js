//initiates the google map function, which pastes our map with the following default values
function initMap() {

  //create a new instance of Geocoder
  var geocoder = new google.maps.Geocoder();

  //dummy data for testing that map is plotting these things
  var dillon = '1107 Fiesta St, Austin, TX 78702';
  var hackreact = {lat: 40.7505, lng: -73.9764};
  var london = {lat: 51.5074, lng: -0.1278};
  var dallas = {lat: 32.7767, lng: -96.7970};
  var houston = {lat: 29.7604, lng: -95.3698};
  var austin = {lat: 30.2672, lng: -97.7431};

  var coordsForPolyline = [];
  var cityEvents = [];
  var options = {
  zoom: 2,
  center: {lat: 37.7428, lng: -35.6806}
  };

  //create new instance of map
  var map = new google.maps.Map(document.getElementById('map'), options);

  //Creates Autocomplete feature so we can add places in a city by name and get exact coordinates
  var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
  //searches within the bondaries of the current map area first
  autocomplete.bindTo('bounds', map);
  var infoWindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
  map: map
  });

  //inserts autocomplete feature
  google.maps.event.addListener(autocomplete, 'place_changed', function(){
    infoWindow.close();
    var place = autocomplete.getPlace();
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(8);
    }
    marker.setPosition(place.geometry.location);
    infoWindow.setContent('<div>'+ place.name + '</div>');
    infoWindow.open(map, marker);
    google.maps.event.addListener(marker, 'click', function(e) {
      infoWindow.open(map, marker);
    })
    //adds coordinates to a cityEvents array, so we can remove them if we want
    cityEvents.push({
      coordinates: place.geometry.location,
      content: place.name
    });
    //then renders array
    for(var i = 0; i < cityEvents.length; i++){
      addMarker(cityEvents[i]);
    }
  });


  function getCoordinates( address, callback ) {
    var coords;
    geocoder.geocode({address: address}, function(results, status) {
      if (status === 'OK') {
        coords = results[0].geometry.location
        callback(coords)
      } else {
        alert('Please insert a city located on da planet Earf.', status)
      }
    })
    return coords; //I don't think this is actually needed
  }

  //click 'Add' --> city coordinates are pushed to markers array, marker is added
  // document.getElementById('WHAT_WE_CALL_OUR_ADD_BUTTON').addEventListener('click', function() {
    getCoordinates( /*CITY_PULLED_FROM_INPUT_ BOX --> dummy data -->*/'London, England', function(coords) {
      markers.push({
          coordinates: coords,
          content: '<h1> PULL ME FROM USER INPUT CITYSCHEMA TAGS </h1>'
        });
        addMarker(markers[markers.length-1]);

        //add coordinates to array for polyline creation
        coordsForPolyline.push(coords)
        //create new polyline
        var newTravelPath = new google.maps.Polyline({
          path: coordsForPolyline,
          geodesic: true,
          strokecolor:'#FF000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        })
        //set polyline on map
        newTravelPath.setMap(map);
        map.setCenter(coords);
        map.setZoom(13);
  })

     //click city and have map recenter on city
  // document.getElementById('CITY_LINK').addEventListener('click', function() {
  //   getCoordinates('CITY_LINK', function(coords) {
  //     map.setCenter(coords);
  //     map.setZoom(13);
  //   })
  // });

  //adds a marker
  function addMarker(props) {
    var marker = new google.maps.Marker({
      position: props.coordinates,
      map: map
    });

    //checks if we have content, if so adds pop up with the content
    if (props.content) {
      //creates info window with content that we'll pull from our user input
      var infoWindow = new google.maps.InfoWindow({
        content: props.content
      });

      //listens on click --> info window pops up
      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      });
    }
  }

  var markers = [
    {
      coordinates: dallas,
      content: '<h1> PULL ME FROM USER INPUT CITYSCHEMA TAGS </h1>'
    },
    {
      coordinates: london,
      content: '<h1> PULL ME FROM USER INPUT CITYSCHEMA TAGS </h1>'
    },
    {
      coordinates: hackreact,
      content: '<h1> PULL ME FROM USER INPUT CITYSCHEMA TAGS </h1>'
    }
  ];

  //push user inputs into markers array --
  for (var i = 0; i < markers.length; i++) {
    addMarker(markers[i]);
    coordsForPolyline.push(markers[i].coordinates)
  }

}
