import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import Dashboard from "./Dashboard";
//import SpotifyLogin from './SpotifyLogin';
import 'spotify-web-api-node';
import SpotifyWebApi from 'spotify-web-api-node';
import { config } from "./config";

class App extends Component {

  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0
      },
      is_playing: "Paused",
      progress_ms: 0
    };
 
  }


  componentDidMount() {

    // AUTO LOGIN TO SPOTIFY
    // See https://developer.spotify.com/documentation/general/guides/authorization-guide/

    var scopes = ['user-read-private', 'user-read-email'],
      state = 'loginok';

    let spotifyApi = new SpotifyWebApi({
      "clientId": config.clientId,
      "clientSecret": config.clientSecret,
      "redirectUri": config.redirectUri
    });

    let applicationCode = this.findGetParameter("code");

    if (!applicationCode) {
      // Init Login Step 1  
      window.location.href = spotifyApi.createAuthorizeURL(scopes, state);
    } else if (applicationCode) {
      // Login Step 1 was ok
      const request = require('request'); // "Request" library

      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: applicationCode,
          redirect_uri: config.redirectUri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(config.clientId + ':' + config.clientSecret).toString('base64'))
        },
        json: true
      };

      request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {

          //Login Step 2 ok

          let access_token = body.access_token;
          //refresh_token = body.refresh_token;

          spotifyApi.setAccessToken(access_token);
          spotifyApi.getArtist("1l6d0RIxTL3JytlLGvWzYe");

          this.setState({token: access_token});
          

        } else {
          console.log("error");

        };
      });
    }
  }


  findGetParameter(parameterName) {
    var result = null,
      tmp = [];
    window.location.search
      .substr(1)
      .split("&")
      .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      });
    return result;
  }


  render() {


    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>


          {this.state.token && (
            <Dashboard/>
          )}

{!this.state.token && (
            <div>Login to Spotify failed. Please check your config.js</div>
          )}

        
        </header>
      </div>
    );
  }
}

export default App;
