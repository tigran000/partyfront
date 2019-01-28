import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Input } from 'antd';

const mapStyles={
    width: "400px",
    height: "200px",
    margin: "2px auto"
}
 
class MapContainer extends Component {
    state = {
        name: "Party locatiion",
        position: {
          lat: 37.77,
          lng: -122.42
        }
    };

    onMarkerDragEnd = (coord) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        this.setState({position: {lat, lng }})
    }

  render() {
    const {position, name} = this.state;

    return (
        <div>
            <Input 
                className="input" 
                placeholder="Address" 
            />
            <Input
                value={position.lat}
                onBlur={this.changeLat} 
                className="input" 
                placeholder="Lat" 
            /> 
            <Input 
                value={position.lng}
                onBlur={this.changeLng} 
                className="input" 
                placeholder="Lng"
            /> 
            <Map
                google={this.props.google}
                style={mapStyles}
                zoom={14}
            >
                <Marker
                    position={position}
                    draggable={true}
                    onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}
                    name={name}
                />
            </Map>
        </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyABXOuxZCI3Rmrd5wEEFPEx_jDUGiCEJbw")
})(MapContainer)