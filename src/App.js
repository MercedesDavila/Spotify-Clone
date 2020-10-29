import React, { useEffect, useState } from "react";
import Player from "./Player";
import { getTokenFromUrl } from "./spotify";
import "./App.css";
import Login from "./Login";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi ();


function App() {

  const [token, setToken] = useState(null);

  useEffect(() => {
    // Set token
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if(_token) {
      setToken(_token);

      spotify.setAccessToken(_token);

      spotify.getMe().then(user =>{
      console.log('🙋 ' , user);
      })
    }


    console.log("I HAVE A TOKEN ", _token);
  }, []);

  return (
    <div className="app">
      {
      token ? 
      <Player />
       : 
      <Login />
      }
    </div>
  );
}

export default App;