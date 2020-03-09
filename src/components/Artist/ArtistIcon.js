import React, { Component } from "react";

class ArtistIcon extends Component {

    onClick = (e) => {
        this.props.selectArtist(this.props.id);
    };


    render() {
        let iconClass = "artistIcon ";
        iconClass += (this.props.globalSelectedArtist == null) ? "neutral" :
        (this.props.globalSelectedArtist === this.props.id) ? "selected" :
        "unselected";
        return <div className="iconFloat">
                <div
                    onClick={this.onClick}
                    className={iconClass}
                    title={this.props.name}
                    style={{ backgroundImage: `url(${this.props.img})` }} />
        </div>;
    }
}

export default ArtistIcon;
