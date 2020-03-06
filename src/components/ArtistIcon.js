import React, { Component } from "react";
import SpotifyWebApi from 'spotify-web-api-node';

class ArtistIcon extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            name: "",
            imgUrl: ""
        };

        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(this.props.accessToken);


        spotifyApi.getArtist(this.props.id)
            .then(function (data) {
                this.setState({
                    name: data.body.name,
                    imgUrl: data.body.images[1].url
                });

                // console.log('Artists information', data.body);
            }.bind(this), function (err) {
                console.error(err);
            });


    }


    onClick = (e) => {
        console.debug("Open Albums for Artist " + this.props.id);
    };


    render() {
        return <div 
        className="artistIcon"  
        title={this.state.name} 
        onClick={this.onClick} 
        style={{ backgroundImage: `url(${this.state.imgUrl})` }}>

        </div>;
    }
}

export default ArtistIcon;
