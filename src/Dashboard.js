import React, { Component } from "react";
import './App.css';
import { initialData } from "./config";
import SpotifyWebApi from "spotify-web-api-node";
import ArtistList from "./components/Artist/ArtistList";
import AlbumList from "./components/Album/AlbumList";
import AlbumsByArtistList from "./components/Album/AlbumsByArtistList";
import SpotifyPlayer from 'react-spotify-web-playback';
import Search from "./components/Search/Search";
import PlaylistList from "./components/Playlist/PlaylistList";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.selectArtist = this.selectArtist.bind(this);
        this.playAlbum = this.playAlbum.bind(this);
        this.addAlbum = this.addAlbum.bind(this);
        this.selectAlbum = this.selectAlbum.bind(this);
        this.playPlaylist = this.playPlaylist.bind(this);
        this.addPlaylist = this.addPlaylist.bind(this);
        this.deletePlaylist = this.deletePlaylist.bind(this);
        this.addItem = this.addItem.bind(this);
        this.cancelSearch = this.cancelSearch.bind(this);

        this.artistIds = [];
        this.playlistIds = [];
        this.albumIds = [];

        this.state = {
            artists: [],
            playlists: [],
            albums: [],
            selectedArtist: null,
            selectedAlbum: null,
            isPlaying: false,
            searchActive: false,
            tracksPlaying: []
        }

        this.spotifyApi = new SpotifyWebApi();
        this.spotifyApi.setAccessToken(this.props.match.params.accessToken);
    }

    componentDidMount() {

        var isStored = localStorage.getItem("toddlify");
        if (!isStored) {
            // initial load from config
            this.loadConfigData();
            localStorage.setItem("toddlify", "stored");
        } else {
            // load from local storage
            this.artistIds = localStorage.getItem("toddlify_artists");
            this.artistIds = this.artistIds ? this.artistIds.split(',') : [];
            this.playlistIds = localStorage.getItem("toddlify_playlists");
            this.playlistIds = this.playlistIds ? this.playlistIds.split(',') : [];
            this.albumIds = localStorage.getItem("toddlify_albums");
            this.albumIds = this.albumIds ? this.albumIds.split(',') : [];
        }

        this.loadArtists();
        this.loadPlaylists();
        //this.loadAlbums();
    }



    /**
     * Initial loading config data. 
     * Only for the first signup or after a reset of storage data.
     */
    loadConfigData() {

        this.artistIds = initialData.artists;
        this.playlistIds = initialData.playlists;
        this.albumIds = initialData.albums;
        localStorage.setItem("toddlify_artists", this.artistIds.toString());
        localStorage.setItem("toddlify_playlists", this.playlistIds.toString());
        localStorage.setItem("toddlify_albums", this.albumIds.toString());
    }

    /*
     * Save 
    saveToStorage() 
    */

    loadArtists() {
        this.spotifyApi.getArtists(this.artistIds).then(
            function (data) {
                this.setState({ artists: data.body.artists });
            }.bind(this),
            function (err) {
                console.error(err);
            }
        );
    }

    loadPlaylists() {
        for (let i in this.playlistIds) {
            let playlistId = this.playlistIds[i]

            this.spotifyApi.getPlaylist(playlistId).then(
                function (data) {
                    const playlists = this.state.playlists.concat(data.body); //! don't push, use concat
                    this.setState({ playlists: playlists });
                }.bind(this),
                function (err) {
                    console.error(err);
                }
            );
        }
    }

    selectArtist(artistId) {
        this.setState({ selectedArtist: artistId });
    }

    playAlbum(albumId, albumUri) {
        var uris = [albumUri];
        this.setState({ selectedAlbum: albumId, isPlaying: true, tracksPlaying: uris });
    }

    selectAlbum(albumId) {
        const albums = this.state.albums.concat(albumId);
        this.setState({ albums: albums });
    }

    /* Add Playlist */
    addPlaylist(playlist) {
        const playlists = this.state.playlists.concat(playlist); //! don't push, use concat
        this.setState({ playlists: playlists });
        this.playlistIds.push(playlist.id);
        localStorage.setItem("toddlify_playlists", this.playlistIds.toString());
    }

    deletePlaylist(playlistId) {
        //TODO
    }

    playPlaylist(playlistId, playlistUri) {
        var uris = [playlistUri];
        this.setState({ isPlaying: true, tracksPlaying: uris });
    }

    addAlbum(album) {
        const albums = this.state.albums.concat(album);
        this.setState({ albums: albums });
        this.albumIds.push(album.id);
        localStorage.setItem("toddlify_albums", this.albumIds.toString());
    }

    deleteAlbum(album) {
        //TODO
    }

    addItem() {
        this.setState({ searchActive: true });
    }

    cancelSearch() {
        this.setState({ searchActive: false });
    }


    render() {

        return <div>
            {this.state.searchActive &&
                <Search
                    accessToken={this.props.match.params.accessToken}
                    onCancel={this.cancelSearch}
                    storedAlbums={this.state.albums}
                    playAlbum={this.playAlbum}
                    addAlbum={this.addAlbum}
                    deleteAlbum={this.deleteAlbum}
                    storedPlaylists={this.state.playlists}
                    playPlaylist={this.playPlaylist}
                    addPlaylist={this.addPlaylist}
                    deletePlaylist={this.deletePlaylist}
                    storedArtists={this.state.artists} />
            }

            {!this.state.searchActive &&
                <ArtistList
                    artists={this.state.artists}
                    selectArtist={this.selectArtist}
                    selectedArtist={this.state.selectedArtist} />
            }

            {(this.state.selectedArtist != null) > 0 && 
                <AlbumsByArtistList
                    accessToken={this.props.match.params.accessToken}
                    artistId={this.state.selectedArtist}
                    playAlbum={this.playAlbum} />
            }


            {(this.state.selectedArtist == null) > 0 && !this.state.searchActive  &&
                <PlaylistList
                    playlists={this.state.playlists}
                    storedPlaylists={this.state.playlists}
                    playPlaylist={this.playPlaylist}
                    addPlaylist={this.addPlaylist}
                    deletePlaylist={this.deletePlaylist}
                />
            }

            <div className="clear" />

            {(this.state.selectedArtist == null) > 0 && !this.state.searchActive  &&
                <AlbumList
                    albums={this.state.albums}
                    addAlbum={this.addAlbum}
                    deleteAlbum={this.deleteAlbum}
                    playAlbum={this.playAlbum}
                    storedAlbums={this.state.albums}
                />
            }


            <div className="clear" />

            <div className="addItemButton" onClick={this.addItem}>+</div>



            <div className="footer">
                {this.state.isPlaying &&

                    <SpotifyPlayer
                        token={this.props.match.params.accessToken}
                        uris={this.state.tracksPlaying}
                        autoPlay="true"
                        styles={{
                            bgColor: '#282c34',
                            color: '#fff',
                            loaderColor: '#fff',
                            sliderColor: '#1cb954',
                            savedColor: '#fff',
                            trackArtistColor: '#ccc',
                            trackNameColor: '#fff',
                        }}
                    />

                }
            </div>
        </div>;

    }
}

export default Dashboard;
