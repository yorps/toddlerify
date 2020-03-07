import React, { Component } from "react";
import { artists } from "../../config";
import ArtistIcon from "./ArtistIcon"
import './Artist.css';

class ArtistList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            artists: artists
        }
    }


    render() {
        return <div>

            {this.state.artists.map((artistId, i) => {
                return (<ArtistIcon key={i} id={artistId} accessToken={this.props.accessToken} small="true"/> )
            })}

        </div>

    }
}

export default ArtistList;