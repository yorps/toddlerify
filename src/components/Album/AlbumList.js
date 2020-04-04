import React, { Component } from "react";
import AlbumIcon from "./AlbumIcon";
import PropTypes from "prop-types";
import './Album.css';
import { IconContext } from "react-icons";
import { MdMusicVideo } from "react-icons/md";

class AlbumList extends Component {

    render() {

        const showList = this.props.albums.length > 0;

        return <div>
            {showList &&
                <IconContext.Provider value={{ className: "titleIcon" }}>
                    <MdMusicVideo title="Albums" />
                </IconContext.Provider>
            }
            <div className="albumList">
                {this.props.albums.map((album, i) => {
                    const isSelected = this.props.storedAlbums.findIndex(i => (i.id === album.id)) >= 0;

                    return (<AlbumIcon
                        key={album.id}
                        album={album}
                        playAlbum={this.props.playAlbum}
                        addAlbum={this.props.addAlbum}
                        deleteAlbum={this.props.deleteAlbum}
                        selectionMode={this.props.selectionMode}
                        startSelectionMode={this.props.startSelectionMode}
                        isSelected={isSelected}
                    />)
                })}
            </div>


        </div>

    }
}

export default AlbumList;


AlbumList.propTypes = {
    albums: PropTypes.arrayOf(PropTypes.object),
    storedAlbums: PropTypes.arrayOf(PropTypes.object),
    playAlbum: PropTypes.func,
    addAlbum: PropTypes.func,
    deleteAlbum: PropTypes.func
};