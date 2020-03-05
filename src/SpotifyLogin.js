import React from 'react'
import { config } from "./config";
import SpotifyWebApi from 'spotify-web-api-node'


class SpotifyLogin extends React.Component {

    constructor(props) {
        super(props);

        this.state= {
            debug: ""
        }

        this.login();
    }

    login () {
       
        //var SpotifyWebApi = SpotifyWebApi
        //var SpotifyWebApi = require('spotify-web-api-node');
 

        // credentials are optional
        var spotifyApi = new SpotifyWebApi({
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            redirectUri: config.redirectUri
        });

        console.debug(spotifyApi);


        // Get an access token and 'save' it using a setter
spotifyApi.authorizationCodeGrant().then(
    function(data) {
      console.log('The access token is ' + data.body['access_token']);
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
      console.log('Something went wrong!', err);
    }
  );

/*

        // Get Elvis' albums
spotifyApi.getArtistAlbums(
    '43ZHCT0cAZBISjO8DG9PnE',
    { limit: 10, offset: 20 },
    function(err, data) {
      if (err) {
        console.error('Something went wrong!');
      } else {
        console.log(data.body);
      }
    }
  );*/

    }

    /*handleInputChange = (e) => {
        this.generateHash(e.target.value, this.state.func);
    };*/


    render() {

        return (
            <div>
            
                        <textarea id="debugOutput"
                                  rows="10"
                                  className="form-control"
                                  value={this.state.debug}>

                                  </textarea>
                    </div>
        )

    }
}
export default SpotifyLogin