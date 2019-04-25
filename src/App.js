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
import Home from './Home'
import { Button } from '@rmwc/button';
import Dexie from 'dexie';
import Geo from './Geo'
import Dad from './Dad'
import About from './About'
const db = new Dexie('mydatabase')
db.version(1).stores({token: '++id,usertoken'})


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
    apikey: ""
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
    //db.table('token').clear()
    db.table('token').toArray().then((tb) => {
      console.log(tb)
      if(tb.length === 0) this.access_token = ""
      else  {
        this.access_token = tb[0].usertoken
        this.setState({apikey: tb[0].usertoken})
      }


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
       this.setState({login: true})
  }
  else {
    this.setState({login: false})
  
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
      db.table('token').clear().then((res) => {})
      localStorage.setItem("token","")
      setTimeout(() => {
        window.location.href = loginURL;
      },500)
      
    })

    
    
  }
    })
    //this.access_token = localStorage.getItem("token")
    
    

    
 
  }



  render() {
    if(!this.state.login || window.location.href.includes("access_token"))
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
              db.table('token').clear().then((res) => {})

              

              this.access_token = params.access_token
              localStorage.setItem("token",params.access_token)

              db.token.add({usertoken: params.access_token})

            

              db.table('token').toArray().then((tb) => {
                console.log(tb)
                console.log(params)
             
                this.setState({login: false,apikey: params.access_token})

                
              })
              this.setState(() => ({userCode: params.access_token}))
              this.access_token = params.access_token
              spotifyApi.setAccessToken(params.access_token)

              return (<Redirect to= {"/"}/>)

              
            

             
            }}/>

           
          ) : (

            <div>
              {
              <Route  exact path={ "/"} component={() => {
                return (
                  <Home apiToken={this.state.apikey}/>
                )
              }}/>  
              }
              
            </div>

          )}
          
              
          { /* routes */ !this.state.login && (<div>
              <Route exact path="/geo" component={Geo}/>
              <Route exact path="/dad" component={Dad}/>
              <Route exact path="/about" component={About}/>
              </div>
          )}
         
        
          
          
          </div>
    
      </Router>
      
      
    )
    else {
      return (
        <div>
                    <Header/>

           <div className="container login">
          {console.log(this.loginURL)}
        <h3 className="loginPrompt">  Please login with Spotify to use this application.</h3>
        <Button  raised onClick={() => {window.location.href = this.loginURL}} style={{"width":"40%"}} label="Login"  />

        </div>
        </div>
       
       
        
      )
    }
  }
}

export default App;
