# Toddlify
Spotify web client for toddlers. 


Built with React. Using [Spotify Web API Node](https://github.com/thelinmichael/spotify-web-api-node) and [react-spotify-web-playback](https://github.com/gilbarbara/react-spotify-web-playback#readme)
 

## Requirements
You need a Spotify premium account for the developer API.


## Usage

### 1.  Register an application with Spotify

Login to the [Spotify Developer Website](https://developer.spotify.com/).

Go to the Dashboard page and click "CREATE A CLIENT ID". Create it!
Once in your Dashboard, open your client page and click "Edit Settings". Add http://localhost:3000/ to the Redirect URIs of your App.


### 2. Clone this repository
`git clone https://github.com/yorps/toddlify.git`


### 3. Config
Copy the config_example.js to config.js and add your clientId and your clientSecret to the new config file.

### 4. Install dependencies & run locally
`npm install`

`npm start` 

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

