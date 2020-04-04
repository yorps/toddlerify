import React, { Component } from "react";
import ArtistIcon from "./ArtistIcon"
import './Artist.css';

class ArtistList extends Component {

    render() {
        return <div>
            <div className="artistList">
                {this.props.artists.map((artist, i) => {
                    return (<ArtistIcon
                        key={i}
                        artist={artist}
                        selectArtist={this.props.selectArtist}
                        globalSelectedArtist={this.props.selectedArtist}
                        selectionMode={this.props.selectionMode}
                        startSelectionMode={this.props.startSelectionMode}
                        small="true" />)
                })}
            </div>
            

        </div>

    }
}

export default ArtistList;