import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home'
import { Switch,BrowserRouter as Router,Redirect, Route, Link } from "react-router-dom";
const queryString = require('query-string')

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
    userCode : null
  }

  
  componentDidMount() {
  }

  render() {
    return (
      <Router>
        <div>
          { window.location.href.includes("access_token") ? (
            <Route  path={ process.env.PUBLIC_URL + "/"} component={() => {
              console.log("public " + process.env.PUBLIC_URL)
              const params = getHashParams()

              if(this.state.userCode === null) {
                this.setState(() => ({userCode: params}))
              }
              
              //throw "fuck"
               return (<Home userCode={this.state.userCode}/>)
            }}/>

          ) : (

            <Route  path={ process.env.PUBLIC_URL + "/"} component={() => (<Home userCode={this.state.userCode}/>)}/>

          )}
        
          
          
          </div>
    
      </Router>
      
      
    )
  }
}

export default App;
