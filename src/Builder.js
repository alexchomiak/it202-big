import React, { Component } from 'react'

import QueryBuilder from './QueryBuilder'
import GeneratePlaylist from './GeneratePlaylist'
import Spotify from 'spotify-web-api-js'
var spotifyApi = new Spotify();

export default class Builder extends Component {
    state = {
        searchQuery: null,
    }

    

    handleQuery = (query) => {
      console.log('building query -----')
      console.log(query)
      console.log('finished query -----')

      
       
      this.setState(() =>({searchQuery: query}))
        
        
    }

    resetQuery = () => {
        this.setState(() =>({searchQuery: null}))
    }

  render() {


   
    //return (    <GeneratePlaylist query={null} userTracks={this.state.userTracks} user={this.props.user} api={this.props.api}/>
     // )
    

    return (
      
      <div>
        {this.state.searchQuery === null ? 
        <QueryBuilder handleQuery={this.handleQuery}/>
    :
    <GeneratePlaylist resetQuery={this.resetQuery} query={this.state.searchQuery} userTracks={this.state.userTracks} user={this.props.user} api={this.props.api}/>
    }
      </div>
    )
  }
}
