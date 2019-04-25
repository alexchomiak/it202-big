import React, { Component } from 'react'

export default class About extends Component {
  render() {
    return (
      <div className="container">
        <div className="home">
            <h3 className="home--welcome">
                About this Project.
            </h3>

            <h3 className="home--prompt">
                This project was created as the final project for IT202 at UIC.
            </h3>
            <h3 className="home--prompt">
                It is built using React, Spotify's Api and the Dad Joke Api.
            </h3>
            <h3 className="home--prompt">
                It utilizes the IndexedDB to store the Spotify API token.
            </h3>
            <h3 className="home--prompt">
                It utilizes the devices hardware GPS for the geolocation information.
            </h3>
            <h3 className="home--prompt">
                This app graphs songs as a visualization to playlists created.
            </h3>
            <h3 className="home--prompt">
                This project was developed by Alex Chomiak.
            </h3>

        </div>
      </div>
    )
  }
}
