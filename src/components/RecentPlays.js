import React from 'react';
import '../styles/RecentPlays.css';

const RecentPlays = (props) => {
    return (
        <div className="recently-played-container">
            <h1>Recently Played</h1>
            <div className="recent-list">
                {
                    props.recentTracks.map((data, index) => {
                        return (
                            <div className="recent-track" key={index + data.played_at}>
                                <img src={data.track.album.images[1].url} alt=""/>
                                <section>
                                    <h4>
                                        {data.track.album.artists[0].name}
                                    </h4>
                                    <h3>
                                        {data.track.name}
                                    </h3>
                                </section>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default RecentPlays;
