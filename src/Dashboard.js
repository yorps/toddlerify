import React, { Component } from "react";
import './App.css';
import ArtistList from "./ArtistList/ArtistList"

//import SpotifyWebApi from 'spotify-web-api-node';
//import { config } from "./config";

class Dashboard extends Component {

    render() {
        return <div><h1>DASHBOARD</h1>
            <ArtistList />
        </div>;
    }
}

export default Dashboard;
