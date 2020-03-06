import React, { Component } from "react";
import { artists } from "../config";
import ArtistIcon from "./ArtistIcon"

class ArtistList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            artists: artists
        }
    }


    render() {
        return <div>

            {this.state.artists.map((artistId) => {
                return (<ArtistIcon id={artistId} accessToken={this.props.accessToken} /> )
            })}

        </div>

    }
}

export default ArtistList;