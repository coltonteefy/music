import React, {useState, useEffect} from 'react';
import Spotify from 'spotify-web-api-js'
import './App.css';
import Search from "./components/Search";

function App() {
  const spotifyWebApi = new Spotify();
  const params = getHashParams();
  let hasAccessToken = !!params.access_token;

  const [loggedIn] = useState(hasAccessToken);
  const [currentSong, changeSong] = useState("");
  const [albumArt, changeAlbumArt] = useState("");
  const [deviceId, changeDeviceId] = useState("");
  const [isPlaying, changeIsPlaying] = useState("");
  const [artistName, changeArtistName] = useState("");
  const [searched, changeSearched] = useState([]);

  function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  if (loggedIn) {
    spotifyWebApi.setAccessToken(params.access_token);
  }

  useEffect(() => {
    console.log("HEY THERE", loggedIn, getHashParams())
    getNowPlaying();
  });

  let timer = setInterval(() => {
      getNowPlaying()
  }, 3000);

  let getNowPlaying =  () => {
    spotifyWebApi.getMyCurrentPlaybackState()
        .then(res => {
          console.log("HERE YA GO", res);

          // nowPlaying = res.item.name;
          changeSong(res.item.name || "");
          changeAlbumArt(res.item.album.images[1].url);
          changeDeviceId(res.device.id);
          changeIsPlaying(res.is_playing);
          changeArtistName(res.item.artists[0].name)
        })
        .catch(err => {
          console.log("ERROR SON ",err)
        })
  };

  let pauseSong = () => {
    console.log(isPlaying);

    spotifyWebApi.pause({device_id: deviceId}, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        getNowPlaying();
      }
    })
  };

  let playSong = () => {
    console.log(isPlaying);

    spotifyWebApi.play({device_id: deviceId}, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        getNowPlaying();
      }
    })
  };

  let nextTrack = () => {
    spotifyWebApi.skipToNext({device_id: deviceId}, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        getNowPlaying();
      }

    })
  };

  let previousTrack = () => {
    spotifyWebApi.skipToPrevious({device_id: deviceId}, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        getNowPlaying();
      }
    })


  };

  return (
      <div className="App">
        {
          !loggedIn &&
          <a href="http://localhost:8888">
            <button>Spotify</button>
          </a>
        }

        <Search searched={searched}
                changeSearched={changeSearched}
                spotifyWebApi={spotifyWebApi}
                deviceId={deviceId}/>

        <div style={{
          height: "auto",
          display: "grid",
          justifyContent: "center",
          alignContent: "center"}}>
          <img
              src={albumArt}
              alt="art"
              style={{
                width: "100%",
                height: "300px"
              }}/>

          <div className="artist-info">
            <div className="artist-name">{artistName}</div>
            <div className="artist-song">{currentSong}</div>
          </div>
        </div>

        <div className="play-pause-section">
          <i className="fas fa-step-backward" onClick={previousTrack}> </i>
          {
            isPlaying ?
                <i className="fas fa-pause"
                   onClick={pauseSong}/> :
                <i className="fas fa-play"
                   onClick={playSong}/>
          }
          <i className="fas fa-step-forward" onClick={nextTrack}> </i>
        </div>
      </div>
  );
}

export default App;
