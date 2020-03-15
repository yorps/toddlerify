import React, { Component } from "react";

class AlbumIcon extends Component {


    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.handleButtonPress = this.handleButtonPress.bind(this);
        this.handleButtonRelease = this.handleButtonRelease.bind(this);

        this.state = {
            play: false
        }
    }

    onClick = (e) => {
        this.props.selectAlbum(e.target.id, this.props.album.uri);
    };

    onLongClick = (e) => {
        console.debug("long click");
    };

    handleButtonPress() {
        this.startPress = (new Date()).getTime();
        this.buttonPressTimer = setTimeout(this.onLongClick.bind(this), 500);
    }

    handleButtonRelease() {
        clearTimeout(this.buttonPressTimer);
        let endPress = (new Date()).getTime();
        if (endPress - this.startPress < 500) {
            this.onClick();
        }
    }

    render() {
        const img = this.props.album.images && this.props.album.images[1] ?
            this.props.album.images[1].url : './../placeholder.png';

        return <div className="albumIcon"
            onTouchStart={this.handleButtonPress}
            onTouchEnd={this.handleButtonRelease}
            onMouseDown={this.handleButtonPress}
            onMouseUp={this.handleButtonRelease}
            onMouseLeave={this.handleButtonRelease}
            id={this.props.album.id}
            title={this.props.album.name}
            style={{ backgroundImage: `url(${img})` }}>

        </div>;
    }
}

export default AlbumIcon;
