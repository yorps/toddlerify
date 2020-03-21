import React, { Component } from "react";
import './Search.css';
import SearchField from "./SearchField";
import ArtistList from "./../Artist/ArtistList";
import PlaylistList from "./../Playlist/PlaylistList";
import SpotifyWebApi from "spotify-web-api-node"
import AlbumList from "../Album/AlbumList";
import { IconContext } from "react-icons";
import { FaArrowAltCircleLeft } from "react-icons/fa";

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchString: "",
            artists: [],
            playlists: [],
            albums: []
        }

        this.selectArtist = this.selectArtist.bind(this);


        this.spotifyApi = new SpotifyWebApi();
        this.spotifyApi.setAccessToken(this.props.accessToken);
        this.startSearch = this.startSearch.bind(this);
    }

    startSearch(searchString) {
        this.spotifyApi.searchArtists(searchString).then(
            function (data) {
                let artists = data.body.artists.items;
                this.setState({ artists: artists });
            }.bind(this),
            function (err) {
                console.error(err);
            }
        );


        this.spotifyApi.searchAlbums(searchString).then(
            function (data) {
                let albums = data.body.albums.items;
                this.setState({ albums: albums });
            }.bind(this),
            function (err) {
                console.error(err);
            }
        )

        this.spotifyApi.searchPlaylists(searchString).then(
            function (data) {
                let playlists = data.body.playlists.items;
                this.setState({ playlists: playlists });
            }.bind(this),
            function (err) {
                console.error(err);
            }
        )
    }

    selectArtist(artistId) {
        //TODO
    }

    render() {
        return <div className="search">

            <div>


                <IconContext.Provider value={{ className: "backIcon" }}>
                    <div>
                        <FaArrowAltCircleLeft onClick={this.props.onCancel} />
                    </div>
                </IconContext.Provider>

                <SearchField search={this.startSearch} />
            </div>
            <div class="clear"/>
            <ArtistList
                artists={this.state.artists}
                storedArtists={this.props.storedArtists}
                selectArtist={this.selectArtist}
                addArtist={this.addArtist} />
            <PlaylistList
                playlists={this.state.playlists}
                addPlaylist={this.props.addPlaylist}
                deletePlaylist={this.props.deletePlaylist}
                playPlaylist={this.props.playPlaylist}
                storedPlaylists={this.props.storedPlaylists}
            />
            <div className="clear"/>
            <AlbumList
                albums={this.state.albums}
                addAlbum={this.props.addAlbum}
                deleteAlbum={this.props.deleteAlbum}
                playAlbum={this.props.playAlbum}
                storedAlbums={this.props.storedAlbums}
            />
        </div>
    }
}

export default Search;