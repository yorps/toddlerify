import React, { Component } from "react";
import AlbumIcon from "./AlbumIcon"
import SpotifyWebApi from 'spotify-web-api-node';

class AlbumsByArtistList extends Component {

    constructor(props) {
        super(props);

        props.artistId

        this.state = {
            artists: artists
        }
    }

    loadAlbums() {
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(this.props.accessToken);
        spotifyApi.getArtistAlbums(this.props.artistId).then(
            function(data) {
              console.log('Artist albums', data.body);
            },
            function(err) {
              console.error(err);
            }
          );
    }


    render() {
        return <div>

            {this.state.artists.map((artistId) => {
                return (<AlbumIcon id={artistId} accessToken={this.props.accessToken} /> )
            })}

        </div>

    }
}

export default AlbumsByArtistList;