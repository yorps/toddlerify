import React, { Component } from "react";
import PlaylistIcon from "./PlaylistIcon";
import PropTypes from "prop-types";
import './Playlist.css';

class PlaylistList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectionMode: false
        }
        this.startSelectionMode = this.startSelectionMode.bind(this);
        this.stopSelectionMode = this.stopSelectionMode.bind(this);
    }

    startSelectionMode() {
        console.debug("startSelectionMode");
        this.setState({selectionMode: true});
    }
    stopSelectionMode() {
        this.setState({selectionMode: false});
    }

    render() {

        return <div>
            <div className="playlistList">
                {this.props.playlists.map((playlist, i) => {

                    const isSelected = this.props.storedPlaylists.indexOf(playlist) >= 0;

                    return (<PlaylistIcon
                        key={i}
                        playlist={playlist}
                        playPlaylist={this.props.playPlaylist}
                        selectPlaylist={this.props.selectPlaylist}
                        selectionMode={this.state.selectionMode}
                        startSelectionMode={this.startSelectionMode}
                        stopSelectionMode={this.stopSelectionMode}
                        isSelected={isSelected}
                        />)
                })}
            </div>
            

        </div>

    }
}

export default PlaylistList;


PlaylistList.propTypes = {
    playlists: PropTypes.arrayOf(PropTypes.object),
    storedPlaylists: PropTypes.arrayOf(PropTypes.object),
    playPlaylist: PropTypes.func,
    selectPlaylist: PropTypes.func
};