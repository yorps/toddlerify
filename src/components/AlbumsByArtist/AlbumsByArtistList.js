import React, { Component } from "react";
import PropTypes from "prop-types";
import AlbumList from "../Album/AlbumList";
import ArtistList from "../Artist/ArtistList";
import SpotifyWebApi from 'spotify-web-api-node';
import "../Album/Album.css";
import { IconContext } from "react-icons";
import { FaArrowAltCircleLeft } from "react-icons/fa";


class AlbumsByArtistList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            loading: false,
            selectionMode: false
        }

        this.loadingBlocksize = 50;
        this.selectionCallback = this.selectionCallback.bind(this);

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

    selectionCallback() {
        this.setState({ selectionMode: true });
    }

    render() {

        return <div className="albumList">
            <div>
                <IconContext.Provider value={{ className: "backIcon" }}>
                    <div>
                        <FaArrowAltCircleLeft onClick={this.props.cancelArtistSelection} />
                    </div>
                </IconContext.Provider>
            </div>

            <ArtistList
                artists={this.props.artists}
                storedArtists={this.props.artists}
                selectArtist={this.props.selectArtist}
                deleteArtist={this.props.deleteArtist}
                selectedArtist={this.props.selectedArtist}
                selectionMode={this.props.selectionMode}
                startSelectionMode={this.props.startSelectionMode} />
            <AlbumList
                albums={this.state.albums}
                addAlbum={this.props.addAlbum}
                deleteAlbum={this.props.deleteAlbum}
                playAlbum={this.props.playAlbum}
                storedAlbums={this.props.storedAlbums}
                selectionMode={this.props.selectionMode}
                startSelectionMode={this.props.startSelectionMode}
            />


        </div>

    }

}

export default AlbumsByArtistList;

AlbumsByArtistList.propTypes = {
    accessToken: PropTypes.string,
    artistId: PropTypes.string,
    storedAlbums: PropTypes.arrayOf(PropTypes.object),
    playAlbum: PropTypes.func,
    addAlbum: PropTypes.func,
    deleteAlbum: PropTypes.func,
    selectionMode: PropTypes.bool,
    startSelectionMode: PropTypes.func
};



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
