import React, { Component } from "react";
import './App.css';
import ArtistList from "./components/Artist/ArtistList"
import AlbumsByArtistList from "./components/Album/AlbumsByArtistList";
import SpotifyPlayer from 'react-spotify-web-playback';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.selectArtist = this.selectArtist.bind(this);
        this.selectAlbum = this.selectAlbum.bind(this);

        this.state = {
            selectedArtist: null,
            selectedAlbum: null,
            isPlaying: false,
            tracksPlaying: []
        }
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


    render() {

        return <div>
            <ArtistList
                accessToken={this.props.match.params.accessToken}
                selectArtist={this.selectArtist} 
                selectedArtist={this.state.selectedArtist}/>

            {(this.state.selectedArtist != null) > 0 &&
                <AlbumsByArtistList
                    accessToken={this.props.match.params.accessToken}
                    artistId={this.state.selectedArtist} 
                    selectAlbum={this.selectAlbum}/>
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
