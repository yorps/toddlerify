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
        this.props.selectArtist(this.props.id);
    };


    render() {
        let iconClass = "artistIcon ";
        iconClass += (this.props.globalSelectedArtist == null) ? "neutral" :
        (this.props.globalSelectedArtist === this.props.id) ? "selected" :
        "unselected";
        return <div className="iconFloat">
                <div
                    onClick={this.onClick}
                    className={iconClass}
                    title={this.state.name}
                    style={{ backgroundImage: `url(${this.state.imgUrl})` }} />
        </div>;
    }
}

export default ArtistIcon;
