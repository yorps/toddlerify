import React, { Component } from "react";

class PlaylistIcon extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick = (e) => {
        this.props.selectPlaylist(e.target.id, this.props.playlist.uri);
    };

    render() {
        return <div className="playlistIcon"
            onClick={this.onClick}
            id={this.props.playlist.id}
            title={this.props.playlist.name}
            style={{ backgroundImage: `url(${this.props.playlist.images[0].url})` }}>
      
        </div>;
    }
}

export default PlaylistIcon;