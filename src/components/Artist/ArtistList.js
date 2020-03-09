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
                        id={artist.id}
                        name={artist.name}
                        img={artist.images[1].url}
                        selectArtist={this.props.selectArtist}
                        globalSelectedArtist={this.props.selectedArtist}
                        small="true" />)
                })}
                <div className="addArtistButton" onClick={this.props.addArtist}>+</div>
            </div>
            

        </div>

    }
}

export default ArtistList;