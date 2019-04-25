import React, { Component } from 'react'
import axios from 'axios'
import {Button} from '@rmwc/button'
export default class Dad extends Component {
    state = {
        joke: ""
    }
    componentDidMount(){
        this.getDadJoke()
    }

    getDadJoke = () => {
        axios.get("https://icanhazdadjoke.com/slack").then((res) => {
            this.setState({joke:res.data.attachments[0].text})
        })
       
    }
  render() {
      

     
      
    return (
      <div className="container">
        <div className="home">
            <h3 className="home--welcome"> Random Dad Jokes </h3>
           
            <h3 className="home--prompt">{this.state.joke}</h3>
            <Button className="queryButton" raised onClick={this.getDadJoke}>
                New Joke
            </Button>
           
        </div>
      </div>
    )
  }
}
