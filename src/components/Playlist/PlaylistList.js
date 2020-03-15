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
        this.setState({selectionMode: true});
    }

    stopSelectionMode() {
        this.setState({selectionMode: false});
    }

    addPlaylist() {
        //TODO
    }

    deletePlaylist() {
        //TODO
    }

    render() {

        return <div>
            <div className="playlistList">
                {this.props.playlists.map((playlist, i) => {
                    const isSelected = this.props.storedPlaylists.findIndex(i => (i.id === playlist.id)) >= 0; 

                    return (<PlaylistIcon
                        key={i}
                        playlist={playlist}
                        playPlaylist={this.props.playPlaylist}
                        addPlaylist={this.props.addPlaylist}
                        deletePlaylist={this.props.deletePlaylist}
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