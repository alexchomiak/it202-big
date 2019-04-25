
import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        return (
            <div className="container">
            <div className="home">
            <h3 className="home--welcome"> Welcome to PeopleTheDJ!</h3>
                <h3 className="home--prompt"> Click the build tab to begin building your playlist!</h3>
                <h3 className="home--prompt"> Your Specific Spotify API token for this application (stored in IndexedDB):</h3>
                <p className="home--token"> {this.props.apiToken} </p>
                <p className="home--token"> (refresh if token not showing due to bug with spotify api)</p>
            </div>
               
            </div>
        )
    }
}
        
    