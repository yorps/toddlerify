import React, { Component } from "react";
import FavSelector from "./../FavSelector/FavSelector";

class ArtistIcon extends Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.handleButtonPress = this.handleButtonPress.bind(this);
        this.handleButtonRelease = this.handleButtonRelease.bind(this);
    }

    onClick = (e) => {
        if (!this.props.selectionMode) {
            this.props.selectArtist(this.props.artist.id);
        }
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
                    style={{ backgroundImage: `url(${img})` }} >
            {this.props.selectionMode &&
                <FavSelector 
                    selected={this.props.isSelected}
                    selectCallback={this.props.addArtist}
                    unselectCallback={this.props.deleteArtist}
                    itemId={this.props.artist.id}
                    item={this.props.artist} />
            }
            </div>
        </div>;
    }
}

export default ArtistIcon;
