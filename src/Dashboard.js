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
        this.addArtist = this.addArtist.bind(this);
        this.deleteArtist = this.deleteArtist.bind(this);

        this.selectAlbum = this.selectAlbum.bind(this);
        this.playAlbum = this.playAlbum.bind(this);
        this.addAlbum = this.addAlbum.bind(this);
        this.deleteAlbum = this.deleteAlbum.bind(this);

        this.playPlaylist = this.playPlaylist.bind(this);
        this.addPlaylist = this.addPlaylist.bind(this);
        this.deletePlaylist = this.deletePlaylist.bind(this);

        this.addItem = this.addItem.bind(this);
        this.cancelSearch = this.cancelSearch.bind(this);
        this.startSelectionMode = this.startSelectionMode.bind(this);
        this.stopSelectionMode = this.stopSelectionMode.bind(this);

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
            tracksPlaying: [],
            selectionMode: false
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
        this.loadAlbums();

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

    /** LOAD **/


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

    loadAlbums() {

        this.spotifyApi.getAlbums(this.albumIds).then(
            function (data) {
                const albums = this.state.albums.concat(data.body.albums); //! don't push, use concat
                this.setState({ albums: albums });
            }.bind(this),
            function (err) {
                console.error(err);
            }
        );

        // for (let i in this.albumIds) {
        //     let albumId = this.albumIds[i]

        //     this.spotifyApi.getAlbum(albumId).then(
        //         function (data) {
        //             const playlists = this.state.playlists.concat(data.body); //! don't push, use concat
        //             this.setState({ playlists: playlists });
        //         }.bind(this),
        //         function (err) {
        //             console.error(err);
        //         }
        //     );
        // }      
    }


    /* ARTIST */
    selectArtist(artistId) {
        this.setState({ selectedArtist: artistId });
    }

    addArtist(artistId) {
        const artists = this.state.artists.concat(artistId); //! don't push, use concat
        this.setState({ artists: artists });
        this.artistIds.push(artists.id);
        localStorage.setItem("toddlify_artists", this.artistIds.toString());
    }

    playAlbum(albumId, albumUri) {
        var uris = [albumUri];
        this.setState({ selectedAlbum: albumId, isPlaying: true, tracksPlaying: uris });
    }

    selectAlbum(albumId) {
        const albums = this.state.albums.concat(albumId);
        this.setState({ albums: albums });
    }


    addPlaylist(playlist) {
        const playlists = this.state.playlists.concat(playlist); //! don't push, use concat
        this.setState({ playlists: playlists });
        this.playlistIds.push(playlist.id);
        localStorage.setItem("toddlify_playlists", this.playlistIds.toString());
    }

    deletePlaylist(playlist) {
        const playlists = this.state.playlists;
        playlists.splice(playlists.indexOf(playlist), 1);
        this.setState({ playlists: playlists });
        this.playlistIds.splice(this.playlistIds.indexOf(playlist.id), 1);
        localStorage.setItem("toddlify_playlists", this.playlistIds.toString());
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
        const albums = this.state.albums;
        albums.splice(albums.indexOf(album), 1);
        this.setState({ albums: albums });
        this.albumIds.splice(this.albumIds.indexOf(album.id), 1);
        localStorage.setItem("toddlify_albums", this.albumIds.toString());
    }

    deleteArtist(artist) {
        const artists = this.state.artists;
        artists.splice(artists.indexOf(artist), 1);
        this.setState({ artists: artists });
        this.artistIds.splice(this.artistIds.indexOf(artist.id), 1);
        localStorage.setItem("toddlify_artists", this.this.artistsId.toString());
    }

    addItem() {
        this.setState({ searchActive: true });
    }

    cancelSearch() {
        this.setState({ searchActive: false });
    }

    startSelectionMode() {
        this.setState({ selectionMode: true });
    }

    stopSelectionMode(event) {
        if (!this.state.selectionMode) return;
        let el = event.target;
        while ((el = el.parentElement)) {
            if (el.className === "favSelector") {
                return;
            }
        }
    
        this.setState({ selectionMode: false });
    }

    render() {

        return <div onMouseDown={this.stopSelectionMode}>
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
                    storedArtists={this.state.artists} 
                    addArtist={this.addArtist}
                    deleteArtist={this.deleteArtist}
                />
            }

            {!this.state.searchActive &&
                <ArtistList
                    artists={this.state.artists}
                    storedArtists={this.state.artists}
                    selectArtist={this.selectArtist}
                    deleteArtist={this.deleteArtist}
                    selectedArtist={this.state.selectedArtist}
                    selectionMode={this.state.selectionMode}
                    startSelectionMode={this.startSelectionMode} />
            }

            {(this.state.selectedArtist != null) > 0 && 
                <AlbumsByArtistList
                    accessToken={this.props.match.params.accessToken}
                    artistId={this.state.selectedArtist}
                    playAlbum={this.playAlbum} 
                    selectionMode={this.state.selectionMode}
                    startSelectionMode={this.startSelectionMode}/>
            }


            {(this.state.selectedArtist == null) > 0 && !this.state.searchActive  &&
                <PlaylistList
                    playlists={this.state.playlists}
                    storedPlaylists={this.state.playlists}
                    selectionMode={this.state.selectionMode}
                    startSelectionMode={this.startSelectionMode}
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
                    selectionMode={this.state.selectionMode}
                    startSelectionMode={this.startSelectionMode}
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
