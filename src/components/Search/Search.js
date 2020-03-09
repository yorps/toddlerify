import React, { Component } from "react";
import './Search.css';
import SearchField from "./SearchField";
import ArtistList from "./../Artist/ArtistList"
import SpotifyWebApi from "spotify-web-api-node"

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchString: "",
            artists: []
        }
        
        this.selectArtist = this.selectArtist.bind(this);


        this.spotifyApi = new SpotifyWebApi();
        this.spotifyApi.setAccessToken(this.props.accessToken);
        this.startSearch = this.startSearch.bind(this);
    }

    startSearch(searchString) {
        this.spotifyApi.searchArtists(searchString).then(
            function (data) {
                console.debug("SEARCH RESULT", data.body.artists.items);
                let artists = data.body.artists.items;
                this.setState({artists: artists});
            }.bind(this),
            function (err) {
                console.error(err);
            }
        );
    }

    selectArtist(artistId) {
        //TODO
    }

    render() {
        return <div className="search">
            <button onClick={this.props.onCancel}>Go Back</button>
            <SearchField search={this.startSearch}/>
            <ArtistList
                artists={this.state.artists}
                selectArtist={this.selectArtist}
                addArtist={this.addArtist} />
        </div>
    }
}

export default Search;