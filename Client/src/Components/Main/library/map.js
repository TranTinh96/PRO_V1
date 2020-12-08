import React, { Component } from 'react';
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MyMapComponent = compose(
  withProps({
    googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyDTloIPYZ_EESszfyz4a1ybNVUqtaW5ho0&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `780px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{lat: 10.773558, lng: 106.659476 }}
  >
    {props.isMarkerShown && (
      <Marker position={{ lat: 10.773558, lng: 106.659476 }} />
    )}
  </GoogleMap>
));

export default class Map extends Component {
  render() {
    return (
      < MyMapComponent  isMarkerShown/>
    )
  }
}




  