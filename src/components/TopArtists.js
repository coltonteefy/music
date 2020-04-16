import React from 'react';
import Carousel from 'nuka-carousel';

import '../styles/TopArtists.css';

const TopArtists = (props) => {
    return (
        <div className="top-artists-container">
            <h1 className="top-artist-label">
                Your Top Artist
            </h1>
            <div className="top-artist-list">
                <Carousel className="top-artist-slider"
                          slidesToShow={5}
                          slidesToScroll={5}
                          cellAlign="left"
                          cellSpacing={1}
                          dragging={true}
                          wrapAround={true}
                          slideWidth={.9}>
                    {
                        props.topArtists.map((data, index) => {
                            return(
                                <div className="each-artist" key={index}>
                                    {/*<div className="artist-image" style={{backgroundImage: `url(${data.images[1].url})`}}> </div>*/}
                                    <img src={data.images[2].url} alt="" className="artist-img"/>
                                    <h4>{data.name}</h4>
                                </div>
                            )
                        })
                    }
                </Carousel>
            </div>
        </div>
    );
};

export default TopArtists;
