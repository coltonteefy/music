import React from 'react';
import '../styles/PlayBar.css';
import VolumeController from "./VolumeController";

const PlayBar = (props) => {

    // let updateProgress = () => {
    //   // props.spotifyWebApi
    // };

    let playSong = () => {
        props.spotifyWebApi.play({device_id: props.deviceId}, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                props.getNowPlaying();
            }
        })
    };

    let pauseSong = () => {
        props.spotifyWebApi.pause({device_id: props.deviceId}, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                props.getNowPlaying();
            }
        })
    };

    let nextTrack = () => {
        props.spotifyWebApi.skipToNext({device_id: props.deviceId}, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                props.getNowPlaying();
            }

        })
    };

    let previousTrack = () => {
        props.spotifyWebApi.skipToPrevious({device_id: props.deviceId}, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                props.getNowPlaying();
            }
        })


    };


    return (
        <div className="play-bar-container">
            <section className="artist-section">
                <img
                    src={props.albumArt}
                    alt="art"/>
                <div className="artist-name-song">
                    <div className="artist-name">{props.artistName}</div>
                    <div className="artist-song">{props.currentSong}</div>
                </div>
            </section>
            <section className="control-btns">
                <span className="material-icons">shuffle</span>
                <i className="fas fa-step-backward back" onClick={previousTrack}> </i>
                <div className="play-pause-box">
                    {
                        props.isPlaying ?
                            <i className="fas fa-pause pause"
                               onClick={pauseSong}/> :
                            <i className="fas fa-play play"
                               onClick={playSong}/>
                    }
                </div>
                <i className="fas fa-step-forward forward" onClick={nextTrack}> </i>
                <span className="material-icons animated">repeat</span>
            </section>
            <section className="volume">
                <VolumeController spotifyWebApi={props.spotifyWebApi}
                                  volumePercent={props.volumePercent}
                                  changeVolumePercent={props.changeVolumePercent}/>
            </section>

        </div>
    );
};

export default PlayBar;
