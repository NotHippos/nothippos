import React from 'react';
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";



const MapWithASearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?&v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDvgO7kKFpb6Fo9FHcFfAIIcO4HMERU1fU",
    loadingElement: <div style={{ height: `100%`, width: `20%` }} />,
    containerElement: <div style={{ height: `300px`, width:`100%`, margin: `20px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

     this.setState({
        bounds: null,
        center: {
          lat: 41.9, lng: -87.624
        },
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

         places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const makerPoint = <Marker position={{ lat: 41.9, lng: -87.624 }} />;
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

         this.setState({
            center: nextCenter,
            markers: nextMarkers,
            marker:  markerPoint
          });
          // refs.map.fitBounds(bounds);
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(function(props) {
  return (
    <div className="mapView">
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={props.zoom}
    center={props.mapCenter}
    onBoundsChanged={props.onBoundsChanged}
    >



   {props.cityMarkers.map((marker, index) =>
      <Marker key={index} position={marker.position} />
    )}
  </GoogleMap>
  </div>
)}
);

<MapWithASearchBox />

export default MapWithASearchBox;



