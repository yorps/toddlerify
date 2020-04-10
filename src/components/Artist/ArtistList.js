import React, { Component } from "react";
import ArtistIcon from "./ArtistIcon"
import './Artist.css';

class ArtistList extends Component {

    render() {
        return <div>
            <div className="artistList">
                {this.props.artists.map((artist, i) => {
                    const isSelected = this.props.storedArtists.findIndex(i => (i.id === artist.id)) >= 0;

                    return (<ArtistIcon
                        key={i}
                        artist={artist}
                        addArtist={this.props.addArtist}
                        selectArtist={this.props.selectArtist}
                        deleteArtist={this.props.deleteArtist}
                        globalSelectedArtist={this.props.selectedArtist}
                        selectionMode={this.props.selectionMode}
                        startSelectionMode={this.props.startSelectionMode}
                        isSelected={isSelected}
                        small="true" />)
                })}
            </div>
            

        </div>

    }
}

export default ArtistList;