import React, { Component } from "react";

class AlbumIcon extends Component {

    constructor(props) {
        super(props);

        /*
        this.state = {
            id: this.props.id,
            name: this.props.name,
            imgUrl: this.props.imgUrl
        };*/
    }


    render() {
        return <div className="albumIcon" 
        name={this.props.name} 
        style={{backgroundImage: `url(${ this.props.imgUrl })`}}>

        </div>;
    }
}

export default AlbumIcon;
