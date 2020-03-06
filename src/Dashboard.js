import React, { Component } from "react";
import './App.css';
import ArtistList from "./components/ArtistList"

class Dashboard extends Component {

    render() {
        return <div>
            
            <ArtistList accessToken={this.props.accessToken}/>
        </div>;
    }
}

export default Dashboard;
