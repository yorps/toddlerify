import React, { Component } from "react";
import './App.css';
import ArtistList from "./components/ArtistList"

class Dashboard extends Component {

    render() {
        return <div>
            <ArtistList accessToken={this.props.match.params.accessToken}/>
        </div>;
    }
}

export default Dashboard;
