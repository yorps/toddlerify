import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import Dashboard from "./Dashboard";
import SpotifyWebApi from 'spotify-web-api-node';
import { config } from "./config";
import * as $ from "jquery";

class App extends Component {

  constructor() {
    super();
    this.state = {
      token: null,
      error: false,
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

      $.ajax({
        method: "POST",
        url: "https://accounts.spotify.com/api/token",
        data: {
          "grant_type": "authorization_code",
          "code": applicationCode,
          "redirect_uri": config.redirectUri,
          "client_secret": config.clientSecret,
          "client_id": config.clientId,
        },
        success: function (result) {
          if (result.access_token) {
            //Login Step 2 was ok

            const access_token = result.access_token;
            //Test: 
            //spotifyApi.setAccessToken(access_token);
            //spotifyApi.getArtist("1l6d0RIxTL3JytlLGvWzYe");

            this.setState({ token: access_token });
          } else {
            this.setState({error: true});
          }
        }.bind(this),
        error: function(result) {
          this.setState({error: true});
        }.bind(this)
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



          {this.state.token ? (
          <Dashboard>

          </Dashboard>) : ""}
          

          {this.state.error ?
            (<div>Login to Spotify failed. Please check your config.js</div>)
          : ""}




        </header>
      </div>
    );
  }
}

export default App;
