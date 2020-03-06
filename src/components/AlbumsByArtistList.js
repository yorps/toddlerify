import React, { Component } from "react";
import AlbumIcon from "./AlbumIcon"
import SpotifyWebApi from 'spotify-web-api-node';

class AlbumsByArtistList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            albums: []
        }
    }
    componentDidMount() {
        //load albums
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(this.props.match.params.accessToken);
        spotifyApi.getArtistAlbums(this.props.match.params.artistId, {limit: 50}).then(
            function(data) {
              console.log('Artist albums', data.body);
              let total = data.body.total;
              if (total > 500) {
                  console.warn("more than 50 results for selected artist");
              }
              this.setAlbums(data.body.items);
            }.bind(this),
            function(err) {
              console.error(err);
            }
          );
    }

    setAlbums(albums) {

        //sort !?
        /*
album_group: "album"
album_type: "album"
artists: Array [ {…} ]
available_markets: Array(78) [ "AD", "AE", "AR", … ]
external_urls: Object { spotify: "https://open.spotify.com/album/6QZ9X0aeJflvlniT4vqthx" }
href: "https://api.spotify.com/v1/albums/6QZ9X0aeJflvlniT4vqthx"
id: "6QZ9X0aeJflvlniT4vqthx"
images: Array(3) [ {…}, {…}, {…} ]
name: "Folge 144: Der Zuckerstückchen-Express"
release_date: "2020-01-24"
release_date_precision: "day"
total_tracks: 28
type: "album"
uri: "spotify:album:6QZ9X0aeJflvlniT4vqthx
*/

        this.setState({albums: albums});
    }

    render() {
        return <div>
            {this.state.albums.map((album, i) => {
                return (<AlbumIcon key={i} 
                    className="albumIcon"
                    id={album.id} 
                    name={album.name}
                    imgUrl={album.images[1].url}

                    accessToken={this.props.accessToken} /> )
            })}
        </div>

    }
    
}

export default AlbumsByArtistList;