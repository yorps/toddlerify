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

        this.loadingBlocksize = 50;

        this.spotifyApi = new SpotifyWebApi();
        this.spotifyApi.setAccessToken(this.props.accessToken);
    }

    componentDidMount() {
        this.loadAlbums();
    }

    //update on artist change
    componentDidUpdate(prevProps, prevState) {
        if (this.props.artistId !== prevProps.artistId) {
            this.loadAlbums();
        }
    }

    loadAlbums(offset = 0, total = null) {
        this.spotifyApi.getArtistAlbums(this.props.artistId, { offset: offset, limit: this.loadingBlocksize }).then(
            function (data) {
                let nextOffset = (data.body.offset + this.loadingBlocksize);
                let needsToLoadMore = (nextOffset < data.body.total);
                this.addAlbums(data.body.items, data.body.offset, needsToLoadMore);

                if (needsToLoadMore) {
                    this.loadAlbums(nextOffset, data.body.total);
                }
            }.bind(this),
            function (err) {
                console.error(err);
            }
        );
    }

    addAlbums(newAlbums, offset, stillLoading) {
        if (offset === 0) {
            this.setState({ albums: newAlbums, loading: stillLoading });
        } else {
            // add newAlbums to existing ones
            const albums = this.state.albums.concat(newAlbums); //! don't push, use concat
            this.setState({ albums: albums, loading: stillLoading });
        }
    }

    render() {
        return <div className="albumList">
            {this.state.albums.map((album, i) => {
                return (<AlbumIcon key={album.id}
                    className="albumIcon"
                    album={album}
                    selectAlbum={this.props.selectAlbum}
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
