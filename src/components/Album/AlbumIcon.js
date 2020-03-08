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
        this.props.selectAlbum(e.target.id, this.props.albumUri);
    };

    render() {
        return <div className="albumIcon"
            id={this.props.id}
            onClick={this.onClick}
            title={this.props.name}
            style={{ backgroundImage: `url(${this.props.imgUrl})` }}>
      
        </div>;
    }
}

export default AlbumIcon;
