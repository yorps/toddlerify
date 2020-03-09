import React, { Component } from "react";
import PlaylistIcon from "./PlaylistIcon"
import './Playlist.css';

class PlaylistList extends Component {

    render() {
        return <div>
            <div className="playlistList">
                {this.props.playlists.map((playlist, i) => {
                    return (<PlaylistIcon
                        key={i}
                        playlist={playlist}
                        selectPlaylist={this.props.selectPlaylist}
                        />)
                })}
            </div>
            

        </div>

    }
}

export default PlaylistList;