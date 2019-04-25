import React, { Component } from 'react'
import {geolocated} from 'react-geolocated';

class Geo extends Component {
  render() {
    return (
      <div className="container">
      <div className="home">

      
        {(this.props.isGeolocationEnabled === true) ?
        (this.props.coords !== undefined) ? 
        ( 
        <div>
            
            <h3 className="home--welcome">
                Geolocation Information
                {console.log(this.props.coord)}
            </h3>
            { this.props.coords !== null &&(<div>
            <h3 className="home--prompt">
                Your latitude is {this.props.coords.latitude}
            </h3>
            <h3 className="home--prompt">
                Your longitude is {this.props.coords.longitude}
            </h3>
            <h3 className="home--prompt">
                {this.props.coords.altitude === null ? "Your altitude is unknown on this device.": `Your altitude is ${this.props.coords.altitude} meters.`} 
                
            </h3>
            <h3 className="home--prompt">
            {this.props.coords.speed === null ? "Your current speed is unknown on this device.": `Your current speed is ${this.props.coords.speed} m/s.`} 
            </h3>
            </div>)}
            <p className="home--token"> Refresh the page if geolocation does not show after a quick moment.</p>
        </div>) : (<div>
            <h3 className="home--welcome">
                Geolocation Information
            </h3>
            <h3 className="home--prompt">
            Calculating Geolocation information...
            </h3>
        </div>)
        :(<h3 className="home-prompt">
            Geolocation is not enabled on this device/browser!
        </h3>)
        }

        </div>
      </div>
    )
  }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
      },
    userDecisionTimeout: 10000
})(Geo)