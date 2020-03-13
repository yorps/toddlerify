import React, { Component } from "react";

class ArtistIcon extends Component {

    onClick = (e) => {
        this.props.selectArtist(this.props.artist.id);
    };


    render() {
        let iconClass = "artistIcon ";
        iconClass += (this.props.globalSelectedArtist == null) ? "neutral" :
        (this.props.globalSelectedArtist === this.props.artist.id) ? "selected" :
        "unselected";

        let img = (this.props.artist.images && this.props.artist.images[1]) ? 
        this.props.artist.images[1].url : "./../placeholder.png";

        return <div className="iconFloat">
                <div
                    onClick={this.onClick}
                    className={iconClass}
                    title={this.props.artist.name}
                    style={{ backgroundImage: `url(${img})` }} />
        </div>;
    }
}

export default ArtistIcon;
