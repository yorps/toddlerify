import React, { Component } from "react";
import PropTypes from "prop-types";
import FavSelector from "./../FavSelector/FavSelector"

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
        this.props.playAlbum(e.target.id, this.props.album.uri);
    };

    onLongClick = (e) => {
        this.props.selectionCallback();
    };

    handleButtonPress(e) {
        this.startPress = (new Date()).getTime();
        this.buttonPressTimer = setTimeout(this.onLongClick.bind(this), 500);
    }

    handleButtonRelease(e) {
        clearTimeout(this.buttonPressTimer);
        let endPress = (new Date()).getTime();
        if (endPress - this.startPress < 500) {
            this.onClick(e);
        }
    }

    render() {
        const img = this.props.album.images && this.props.album.images[1] ?
            this.props.album.images[1].url : './../placeholder.png';


        let iconClass = "albumIcon";
        if (this.props.isSelected) iconClass += " itemSelected";
        return <div className={iconClass}
            onTouchStart={this.handleButtonPress}
            onTouchEnd={this.handleButtonRelease}
            onMouseDown={this.handleButtonPress}
            onMouseUp={this.handleButtonRelease}
            onMouseLeave={this.handleButtonRelease}
            id={this.props.album.id}
            title={this.props.album.name}
            style={{ backgroundImage: `url(${img})` }}>

            {this.props.selectionMode  &&
              <FavSelector selected="false" selectionCallback={this.props.selectionCallback}/>
            }

        </div>;
    }
}

export default AlbumIcon;


AlbumIcon.propTypes = {
    album: PropTypes.object,
    playAlbum: PropTypes.func,
    selectionMode: PropTypes.bool,
    selectionCallback: PropTypes.func,
    isSelected: PropTypes.bool
};