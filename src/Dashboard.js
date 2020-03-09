import React, { Component } from "react";
import './App.css';
import { artists } from "./config";
import SpotifyWebApi from "spotify-web-api-node";
import ArtistList from "./components/Artist/ArtistList";
import AlbumsByArtistList from "./components/Album/AlbumsByArtistList";
import SpotifyPlayer from 'react-spotify-web-playback';
import Search from "./components/Search/Search"

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.selectArtist = this.selectArtist.bind(this);
        this.selectAlbum = this.selectAlbum.bind(this);
        this.addArtist = this.addArtist.bind(this);
        this.cancelSearch = this.cancelSearch.bind(this);

        this.state = {
            artists: [],
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

    selectArtist(artistId) {
        this.setState({ selectedArtist: artistId });
    }

    selectAlbum(albumId, albumUri) {
        this.setState({ selectedAlbum: albumId });
        this.playAlbum(albumId, albumUri);
    }

    playAlbum(albumId, albumUri) {
        var uris = [albumUri];
        this.setState({ isPlaying: true, tracksPlaying: uris });
    }

    addArtist() {
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
                selectedArtist={this.state.selectedArtist}
                addArtist={this.addArtist} />

            {(this.state.selectedArtist != null) > 0 &&
                <AlbumsByArtistList
                    accessToken={this.props.match.params.accessToken}
                    artistId={this.state.selectedArtist}
                    selectAlbum={this.selectAlbum} />
            }





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
