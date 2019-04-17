import React, { Component } from 'react'

import QueryBuilder from './QueryBuilder'
import GeneratePlaylist from './GeneratePlaylist'
import Spotify from 'spotify-web-api-js'
var spotifyApi = new Spotify();

export default class Builder extends Component {
    state = {
        searchQuery: null,
        userTracks: null
    }

    getUserTracks = async () => {
      var promises = []
      var tracks = []
      var parse = true;
      var initialValue = 0;

      
      

      while(parse) {
        await this.props.api.getMySavedTracks({limit:50,offset:initialValue}).then((list) => {
          let userTracks = list.items;
          tracks = [...tracks, ...userTracks]
          if(list.total < (initialValue * 50) + 50) parse = false;
        })
      }
   
      return tracks;
     
    }

    handleQuery = (query) => {
      console.log('building query -----')
      console.log(query)
      console.log('finished query -----')

      
        if(this.state.userTracks === null) {
          this.getUserTracks().then((tracks) => {
            console.log(tracks)
            this.setState(() => ({userTracks:tracks, searchQuery: query}))
          })
        } else {
          this.setState(() =>({searchQuery: query}))
        }
        
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
