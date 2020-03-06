import React, { Component } from "react";

class AlbumIcon extends Component {

    render() {
        return <div className="albumIcon" 
        name={this.props.name} 
        style={{backgroundImage: `url(${ this.props.imgUrl })`}}>

        </div>;
    }
}

export default AlbumIcon;
