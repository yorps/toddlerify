import React, { Component } from "react";
import FavSelector from "./../FavSelector/FavSelector";


class PlaylistIcon extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.handleButtonPress = this.handleButtonPress.bind(this);
        this.handleButtonRelease = this.handleButtonRelease.bind(this);
    }

    onClick = (e) => {
        this.props.playPlaylist(e.target.id, this.props.playlist.uri);
    };

    onLongClick() {
        this.props.startSelectionMode();
    }

    handleButtonPress = (e) => {
        this.startPress = (new Date()).getTime();
        this.buttonPressTimer = setTimeout(this.onLongClick.bind(this), 500);
    };

    handleButtonRelease = (e) => {
        clearTimeout(this.buttonPressTimer);
        let endPress = (new Date()).getTime();
        if (endPress - this.startPress < 500) {
            this.onClick(e);
        }
    };


    render() {
        let image = this.props.playlist.images[0] ?
            this.props.playlist.images[0].url : "./../placeholder.png";

        let iconClass = "playlistIcon";
        if (this.props.isSelected) iconClass += " selected";

        return <div className={iconClass}
            onTouchStart={this.handleButtonPress}
            onTouchEnd={this.handleButtonRelease}
            onMouseDown={this.handleButtonPress}
            onMouseUp={this.handleButtonRelease}
            onMouseLeave={this.handleButtonRelease}
            id={this.props.playlist.id}
            title={this.props.playlist.name}
            style={{ backgroundImage: `url(${image})` }}>
            {this.props.selectionMode &&
                <FavSelector selected={this.props.isSelected}
                    selectCallback={this.props.addPlaylist}
                    unselectCallback={this.props.deletePlaylist}
                    itemId={this.props.playlist.id}
                    item={this.props.playlist} />
            }

        </div>;
    }
}

export default PlaylistIcon;