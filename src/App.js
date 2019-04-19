import './App.scss';
import '@material/theme/dist/mdc.theme.css'
import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory'
import Spotify from 'spotify-web-api-js'
import logo from './logo.svg';
import { Switch,BrowserRouter as Router,Redirect, Route, Link } from "react-router-dom";
import Builder from './Builder'
import QueryBuilder from './QueryBuilder';
import Header from './Header'
import NavBar from './NavBar'



var spotifyApi = new Spotify()
const queryString = require('query-string')
const clientToken = "d1a2f3a8c7b0428ab9c14b1c175cbc69"
const history = createHistory({
  basename: process.env.PUBLIC_URL
})
class App extends Component {
  
  access_token 

  state = {
    user: null,
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    //console.log(hashParams);
    return hashParams;
  }

  login = false;
  loginUrl = null

  constructor() {
    super()
    var loginURL
    this.access_token = localStorage.getItem("token")
    
    console.log("loaded token " + this.access_token)
    if( this.access_token === null || this.access_token === "" || this.access_token === undefined) {
      var url = "https://accounts.spotify.com/authorize?"
      console.log('no token found')
      if (process.env.PUBLIC_URL === "") {
          //url = "http%3A%2F%2Flocalhost:3000%2Fcallback"
          url += queryString.stringify({
              redirect_uri: "http://localhost:3000",
              response_type: "token",
              client_id: clientToken,
              scope:"user-read-private user-read-email user-library-read playlist-modify-public playlist-modify-private ugc-image-upload",
              state: "123"
          })
        
       } 
       else {
          url += queryString.stringify({
              redirect_uri: "https://alexchomiak.github.io/it202-big",
              response_type: "token",
              client_id: clientToken,
              scope:"user-read-private user-read-email user-library-read playlist-modify-public playlist-modify-private ugc-image-upload",
              state: "123"
          })

     
       } 



     
      this.loginURL = url;
       this.login = true;
  }
  else {
      this.login = false;
  
      spotifyApi.setAccessToken(this.access_token)
      spotifyApi.getMe().then((me) => {
        this.setState(() => ({
            user: me
        }))
  
        console.log(me)
  
        spotifyApi.getMySavedTracks().then((tracks) => {
          console.log(tracks);
        })
       
      
    },(err) => {
      localStorage.setItem("token","")
      setTimeout(() => {
        window.location.href = loginURL;
      },500)
      
    })

    
    
  }
 
  }

  render() {
    if(!this.login || window.location.href.includes("access_token"))
    return (
      <Router basename={process.env.PUBLIC_URL} history={history} >
        <div>
          <Header/>
          <NavBar/>
          


          <Route path="/build" component={() => {
            return <Builder api={spotifyApi} user={this.state.user}/>
          }}/>


          { window.location.href.includes("access_token") ? (
            <Route  exact path={"/"} component={() => {
              const params = this.getHashParams()
              
              this.access_token = params.access_token
              localStorage.setItem("token",params.access_token)
              console.log(params)
              this.setState(() => ({userCode: params.access_token}))
                this.login = false;
               return (<Redirect to= {"/"}/>)
            }}/>

          ) : (

            <div>
              {
              <Route  exact path={ "/"} component={() => (<h1>home {this.access_token}</h1>)}/>  
              }
              
            </div>

          )}
          


         
        
          
          
          </div>
    
      </Router>
      
      
    )
    else {
      return (
        <div>
          {console.log(this.loginURL)}
           
        <a href={this.loginURL} > Login </a>
        </div>
       
        
      )
    }
  }
}

export default App;
