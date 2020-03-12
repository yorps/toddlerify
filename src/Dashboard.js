import React, { Component } from "react";
import './App.css';
import { artists, playlists } from "./config";
import SpotifyWebApi from "spotify-web-api-node";
import ArtistList from "./components/Artist/ArtistList";
import AlbumsByArtistList from "./components/Album/AlbumsByArtistList";
import SpotifyPlayer from 'react-spotify-web-playback';
import Search from "./components/Search/Search"
import PlaylistList from "./components/Playlist/PlaylistList";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.selectArtist = this.selectArtist.bind(this);
        this.selectAlbum = this.selectAlbum.bind(this);
        this.selectPlaylist = this.selectPlaylist.bind(this);
        this.addItem = this.addItem.bind(this);
        this.cancelSearch = this.cancelSearch.bind(this);

        this.state = {
            artists: [],
            playlists: [],
            selectedArtist: null,
            selectedAlbum: null,
            isPlaying: false,
            searchActive: false,
            tracksPlaying: []
        }

        this.spotifyApi = new SpotifyWebApi();
        this.spotifyApi.setAccessToken(this.props.match.params.accessToken);
    }

    componentDidMount () {
        this.loadArtists();
        this.loadPlaylists();
    }

    loadArtists() {
        this.spotifyApi.getArtists(artists).then(
            function (data) {
                this.setState({artists: data.body.artists});
            }.bind(this),
            function (err) {
                console.error(err);
            }
        );
    }

    loadPlaylists() {
        for (let i in playlists) {
            let playlist = playlists[i]
            
            this.spotifyApi.getPlaylist(playlist).then(
                function (data) {
                    const playlists = this.state.playlists.concat(data.body); //! don't push, use concat
                    this.setState({playlists: playlists});
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

    selectAlbum(albumId, albumUri) {
        var uris = [albumUri];
        this.setState({selectedAlbum: albumId, isPlaying: true, tracksPlaying: uris });
    }

    selectPlaylist(playlistId, playlistUri) {
        var uris = [playlistUri];
        this.setState({ isPlaying: true, tracksPlaying: uris });
    }

    addItem() {
        this.setState({ searchActive: true });
    }

    cancelSearch() {
        this.setState({searchActive: false});
    }

               
    render() {

        return <div>
            {this.state.searchActive &&
                <Search 
                accessToken={this.props.match.params.accessToken}
                onCancel={this.cancelSearch}/>
            }

            <ArtistList
                artists={this.state.artists}
                selectArtist={this.selectArtist}
                selectedArtist={this.state.selectedArtist} />

            {(this.state.selectedArtist != null) > 0 &&
                <AlbumsByArtistList
                    accessToken={this.props.match.params.accessToken}
                    artistId={this.state.selectedArtist}
                    selectAlbum={this.selectAlbum} />
            }

            <PlaylistList
                    playlists={this.state.playlists}
                    selectPlaylist={this.selectPlaylist}
            />

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
