import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AlbumsByArtistList from './components/AlbumsByArtist/AlbumsByArtistList'
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router} from 'react-router-dom';
import Dashboard from './Dashboard';


const routing = (

    <Router>
            <Route exact path="/" component={App} />
            <Route path="/dashboard/:accessToken" component={Dashboard} />
            <Route path="/albums/:artistId/:accessToken" component={AlbumsByArtistList} />
    </Router>
)
ReactDOM.render(routing, document.getElementById('root'));

//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
