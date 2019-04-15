import React, { Component } from 'react'

import QueryBuilder from './QueryBuilder'
import GeneratePlaylist from './GeneratePlaylist'
export default class Builder extends Component {
    state = {
        searchQuery: null
    }


    handleQuery = (query) => {
        this.setState(() =>({searchQuery: query}))
    }

    resetQuery = () => {
        this.setState(() =>({searchQuery: null}))
    }

  render() {
    return (
      <div>
        {this.state.searchQuery === null ? 
        <QueryBuilder handleQuery={this.handleQuery}/>
    :
    <GeneratePlaylist/>
    }
      </div>
    )
  }
}
