import React, { Component } from "react";
import './App.css';
import ArtistList from "./ArtistList/ArtistList"

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: "",
            output: "",
            func: "sha256"
        };
    }


    render() {
        return <div><h1>DASHBOARD</h1>
            <ArtistList accessToken={this.props.accessToken}/>
        </div>;
    }
}

export default Dashboard;
