import React from 'react';
import '../styles/Home.css';
import TopArtists from "./TopArtists";
import RecentPlays from "./RecentPlays";
import NewReleaseHeader from "./NewReleaseHeader";

const Home = (props) => {

    return (
        <div className="home-container">
            <NewReleaseHeader newReleasesList={props.newReleasesList}/>
            <div className="content">
                <TopArtists topArtists={props.topArtists}/>
                <RecentPlays recentTracks={props.recentTracks}/>
            </div>

        </div>
    );
};

export default Home;
