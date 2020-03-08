import React, { Component } from "react";
import AlbumIcon from "./AlbumIcon"
import SpotifyWebApi from 'spotify-web-api-node';
import "./Album.css"

class AlbumsByArtistList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            loading: false
        }

        this.spotifyApi = null;
    }

    componentDidMount() {
        this.loadAlbums();
    }

    UNSAFE_componentWillReceiveProps() {
        this.loadAlbums();
    }

    loadAlbums() {
        this.spotifyApi = new SpotifyWebApi();
        this.spotifyApi.setAccessToken(this.props.accessToken);


        this.spotifyApi.getArtistAlbums(this.props.artistId, { limit: 50 }).then(
            function (data) {
                let total = data.body.total;
                if (total > 50) {
                    console.warn("more than 50 results for selected artist");
                }

                this.setAlbums(data.body.items);
                this.forceUpdate();
            }.bind(this),
            function (err) {
                console.error(err);
            }
        );
    }

//    shouldComponentUpdate(nextProps) {
//            // only re-render if props.value has changed
//            return this.props.value !== nextProps.value;
//    }

    setAlbums(albums) {
        this.setState({ albums: [], loading: false });
        this.setState({ albums: albums, loading: true });
        //this.forceUpdate();
    }

    render() {
        return <div className="albumList">
            {this.state.albums.map((album, i) => {
                return (<AlbumIcon key={album.id}
                    className="albumIcon"
                    id={album.id}
                    name={album.name}
                    imgUrl={album.images[1].url}
                    selectAlbum={this.props.selectAlbum}
                    albumUri={album.uri}
                />)
            })}
        </div>

    }

}

export default AlbumsByArtistList;


/*

ALBUM EXAMPLE

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
