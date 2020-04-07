import React, {useState} from 'react';
import '../styles/Search.css';

let Search = (props) => {
    const [isOpened, toggleOpen] = useState(true);
    const [searchInput, updateSearchInput] = useState("");
    const [searched, changeSearched] = useState([]);

    let searchTrack = () => {
        changeSearched([]);
        updateSearchInput("");
        props.spotifyWebApi.searchTracks(`artist: ${searchInput}`,{limit:50})
            .then(data => {
                console.log('SEARCHED TRACKS ', data.tracks.items);

                changeSearched(data.tracks.items)
            }, err => {
                console.error(err);
            });
    };

    let search = () => {
        props.spotifyWebApi.search(`artist: ${searchInput}`, ["album", "artist", "playlist", "track"],{limit:50})
            .then(data => {
                console.log('SEARCHED ', data.tracks.items);

                changeSearched(data.tracks.items)
            }, err => {
                console.error(err);
            });
    };

    let openSearch = () => {
        toggleOpen(!isOpened);

        if(isOpened) {
            document.getElementById("icon").style.clipPath = "inset(0 0)";
            document.getElementById("searched-tracks-container").style.transform = "translateX(0)";
            document.getElementById("search-bar").style.transform = "translateX(0)";
            document.getElementById("close-icon").style.animation = "slide-right .5s ease forwards";
        }else {
            document.getElementById("icon").style.clipPath = "inset(0px 100% 100% 0px round 1px)";
            document.getElementById("searched-tracks-container").style.transform = "translateX(-800px)";
            document.getElementById("search-bar").style.transform = "translateX(-200px)";
            document.getElementById("close-icon").style.animation = "slide-left .5s ease forwards";
        }
    };

    let updateSearch = (e) => {
        updateSearchInput(e.target.value);
        search();
    };

    return (
        <div className="search-container">

            <i className="fas fa-search open-search-icon"
               id="toggle-icon"
               onClick={openSearch}>
            </i>

            <section className="icon" id="icon">
                <div className="top">
                    <i className="fas fa-times close-icon"
                       id="close-icon"
                       onClick={openSearch}>
                    </i>

                    <div id="search-bar">
                        <input type="text" onChange={updateSearch} value={searchInput} placeholder="Search"/>
                        {/*<i className="fas fa-search search-btn"*/}
                        {/*   onClick={search}>*/}
                        {/*</i>*/}
                    </div>
                </div>


                <section id="searched-tracks-container">
                    {
                        searched.map((data, index) => {
                            return (
                                <div className="search-results"
                                     key={index + data.album.images[1].url}
                                     style={{animationDelay: `${index * 0.1}s`}}>
                                    <img src={data.album.images[2].url} alt=""
                                         className="search-img"/>
                                    <div style={{textAlign: "left"}}>
                                        <div className="search-artist-name">
                                            {data.album.artists[0].name}
                                        </div>
                                        <div className="search-artist-song">
                                            {data.name}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </section>
            </section>


        </div>
    );
};

export default Search;
