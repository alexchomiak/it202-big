import './App.scss';
import '@material/theme/dist/mdc.theme.css'
import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory'
import Spotify from 'spotify-web-api-js'
import logo from './logo.svg';
import Home from './Home'
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


function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  console.log(hashParams);
  return hashParams;
}


class App extends Component {
  state = {
    userCode : null,
    loginURL: null,
    login: false,
    user: null
  }
  
  constructor() {
    super()
    var loginURL

    console.log(this.access_token)
    if(this.access_token === '') {
      var url = "https://accounts.spotify.com/authorize?"
      
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




      loginURL = url;
      this.login = true;
      this.setState({loginURL})
      if(!window.location.href.includes("access_token")) {
        window.location.replace(loginURL);
      }
   

  }
  else {
  
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
      localStorage['accesstoken'] = ''
      window.location.replace(loginURL);
    })

    
    
  }
 
  }

  access_token = document.cookie
  componentDidMount() {
    
  }
  
  componentDidUpdate() {
    /*
   if(this.state.userCode === null) {
     this.setState({login: true})
   }

  if(this.state.userCode !== null) {
      spotifyApi.setAccessToken(this.state.userCode)

      spotifyApi.getMe().then((me) => {
          this.setState(() => ({
              me
          }))

          console.log(me.id)

          console.log("attempting playlist creation -------")
          
          

          
          console.log("------------------------------------")

      } )

      console.log('spotify loaded')
      console.log(this.state.username)

      /*
      spotifyApi.getArtist()
 
      

      spotifyApi.getAlbum('0y4nzndpCMRS5wj3lkWl8A').then((album) => {
          //console.log(album)
          this.setState({imgSrc: album.images[2].url})
      })
  

      spotifyApi.getArtist("3ddT1Q3KQAm1G7UcIfz5KJ").then((res) => {
          console.log(res)
      })
      */
     
  }
  
  

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL} history={history} >
        <div>
          <Header/>
          <NavBar/>
          

          <Route path="/test" component={Builder}/>
          { window.location.href.includes("access_token") ? (
            <Route  exact path={"/"} component={() => {
              const params = getHashParams()
              if(this.state.userCode === null) {
                this.access_token = params.access_token
                document.cookie = params.access_token
                console.log(params)
                this.setState(() => ({userCode: params.access_token}))
              }
             

               return (<Redirect to= {"/"}/>)
            }}/>

          ) : (

            <div>
              {/*
              <Route  exact path={ "/"} component={() => (<Home userCode={this.state.userCode}/>)}/>  
              */}
              
            </div>

          )}
          


         
        
          
          
          </div>
    
      </Router>
      
      
    )
  }
}

export default App;
