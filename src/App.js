import React, {useState, useEffect} from 'react';
import Spotify from 'spotify-web-api-js'
import './App.css';
import Search from "./components/Search";
import PlayBar from "./components/PlayBar";
import Home from "./components/Home";

function App() {
    // create spotify web api
    const spotifyWebApi = new Spotify();
    const params = getHashParams();
    let hasAccessToken = !!params.access_token;

    // STATE
    const [loggedIn, updateLogIin] = useState(hasAccessToken);
    const [currentSong, changeSong] = useState("");
    const [albumArt, changeAlbumArt] = useState("");
    const [deviceId, changeDeviceId] = useState("");
    const [isPlaying, changeIsPlaying] = useState("");
    const [artistName, changeArtistName] = useState("");
    const [searched, changeSearched] = useState([]);
    const [volumePercent, changeVolumePercent] = useState(0);
    // const [songDuration, updateSongDuration] = useState(0);
    // const [songProgress, updateSongProgress] = useState(0);
    const [recentTracks, updateRecentTracks] = useState([]);
    const [topArtists, updateTopArtists] = useState([]);
    const [newReleasesList, updateNewReleasesList] = useState([]);

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
        getNowPlaying();
        getMyUserInfo();
        getRecentTracks();
        getTopArtists();
        getNewReleases();
    }, []);

    // let timer = setInterval(() => {
    //     getNowPlaying()
    // }, 5000);

    // let currentProgress = setInterval(() => {
    //     spotifyWebApi.getMyCurrentPlayingTrack({device_id: deviceId}, (err, data) => {
    //         if(err) {
    //             console.log(err);
    //         } else {
    //             console.log(data)
    //             updateSongProgress(data.progress_ms);
    //         }
    //     })
    // }, 3000);

    const getMyUserInfo = () => {
        spotifyWebApi.getMe({}, (err, data) => {
            if(err) {
                console.log(err);
            }
            else {
                // console.log("USER DATA", data)
            }
        })
    };

    const getNowPlaying = () => {
        spotifyWebApi.getMyCurrentPlaybackState()
            .then(res => {
                // console.log("HERE YA GO", getHashParams(), res);

                // nowPlaying = res.item.name;
                updateLogIin(!!params.access_token);
                changeSong(res.item.name || "");
                changeAlbumArt(res.item.album.images[1].url);
                changeDeviceId(res.device.id);
                changeIsPlaying(res.is_playing);
                changeArtistName(res.item.artists[0].name);
                // updateSongDuration(res.item.duration_ms);
                changeVolumePercent(res.device.volume_percent)
            })
            .catch(err => {
                console.log("ERROR SON ", err, err.response)
            })
    };

    const getRecentTracks = () => {
        spotifyWebApi.getMyRecentlyPlayedTracks({limit:50}, (err, data) => {
            if(err){
                console.log(err.response);
            } else {
                console.log("RECENT", data.items);
                updateRecentTracks([...data.items])
            }
        });
    };

    const getTopArtists = () => {
        spotifyWebApi.getMyTopArtists({limit:50}, (err, data) => {
            if(err){
                console.log(err.response);
            } else {
                updateTopArtists([...data.items])
                // console.log("TOP ARTISTS", data);
            }
        });
    };

    // const getTopTracks = () => {
    //     spotifyWebApi.getMyTopTracks({limit:50}, (err, data) => {
    //         if(err){
    //             console.log(err.response);
    //         } else {
    //             console.log("TOP TRACKS", data);
    //         }
    //     });
    // };

    const getNewReleases = () => {
        spotifyWebApi.getNewReleases({limit:20}, (err, data) => {
            if(err){
                console.log(err.response);
            } else {
                updateNewReleasesList([...data.albums.items]);
            }
        })
    };


    return (
        <div className="App">
            {
                !loggedIn ?
                    (
                        <a href="http://localhost:8888">
                            <button>Log in</button>
                        </a>
                    ) :
                    (
                        <div className="page-container">
                            <div className="menu">
                                <Search searched={searched}
                                        changeSearched={changeSearched}
                                        spotifyWebApi={spotifyWebApi}
                                        deviceId={deviceId}/>

                            </div>

                            <div className="content-section">
                                {/*<RecentPlays recentTracks={recentTracks}/>*/}
                                {/*<TopArtists topArtists={topArtists}/>*/}
                                <Home recentTracks={recentTracks}
                                      topArtists={topArtists}
                                      newReleasesList={newReleasesList}/>
                            </div>

                            <div className="bottom-play-bar">
                                <PlayBar spotifyWebApi={spotifyWebApi}
                                         isPlaying={isPlaying}
                                         getNowPlaying={getNowPlaying}
                                         deviceId={deviceId}
                                         artistName={artistName}
                                         currentSong={currentSong}
                                         albumArt={albumArt}
                                         volumePercent={volumePercent}
                                         changeVolumePercent={changeVolumePercent}/>
                            </div>
                        </div>
                    )
            }

        </div>
    );
}

export default App;
