import React, { Component } from "react";

class AlbumIcon extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);

        this.state = {
            play: false
        }
    }

    onClick = (e) => {
        this.props.selectAlbum(e.target.id, this.props.album.uri);
    };

    render() {
        let img = this.props.album.images && this.props.album.images[1] ?
        this.props.album.images[1].url : 'placeholder';

        return <div className="albumIcon"
            id={this.props.album.id}
            onClick={this.onClick}
            title={this.props.album.name}
            style={{ backgroundImage: `url(${img})` }}>
      
        </div>;
    }
}

export default AlbumIcon;
