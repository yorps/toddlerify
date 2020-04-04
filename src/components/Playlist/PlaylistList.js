import React, { Component } from "react";
import PlaylistIcon from "./PlaylistIcon";
import PropTypes from "prop-types";
import './Playlist.css';
import { IconContext } from "react-icons";
import { MdQueueMusic } from "react-icons/md";

class PlaylistList extends Component {

    addPlaylist() {
        //TODO
    }

    deletePlaylist() {
        //TODO
    }

    render() {

        return <div>
            <IconContext.Provider value={{ className: "titleIcon" }}>
                <MdQueueMusic title="Playlists" />
            </IconContext.Provider>
            <div className="playlistList">
                {this.props.playlists.map((playlist, i) => {
                    const isSelected = this.props.storedPlaylists.findIndex(i => (i.id === playlist.id)) >= 0;

                    return (<PlaylistIcon
                        key={i}
                        playlist={playlist}
                        playPlaylist={this.props.playPlaylist}
                        addPlaylist={this.props.addPlaylist}
                        deletePlaylist={this.props.deletePlaylist}
                        selectionMode={this.props.selectionMode}
                        startSelectionMode={this.props.startSelectionMode}
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
    addPlaylist: PropTypes.func,
    deletePlaylist: PropTypes.func
};