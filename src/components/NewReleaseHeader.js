import React, {useState, useEffect} from 'react';
import NewReleaseCarousel from "nuka-carousel";
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import '../styles/NewReleaseHeader.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    mainColor: {
        color: "rgb(249, 179, 166)"
    }
}));


const NewReleaseHeader = (props) => {
    const classes = useStyles();
    const [newReleaseList, updateNewReleaseList] = useState([]);

    useEffect(() => {
        console.log("HERE", props.newReleasesList);
        if (props.newReleasesList.length > 0) {
            update();
        }
    }, [props.newReleasesList]);

    let update = () => {
        updateNewReleaseList(props.newReleasesList)
    };

    return (
        <div className="new-release-container">
            <h1 className="new-release-label">New Releases</h1>
            <NewReleaseCarousel className="new-release-slider"
                                slidesToShow={4}
                                slidesToScroll={1}
                                cellAlign="left"
                                cellSpacing={0}
                                autoplay={true}
                                transitionMode={"fade"}
                                heightMode={"current"}
                                slideWidth={1}
                                wrapAround={true}
                                pauseOnHover={true}
                                withoutControls={true}>
                {
                    newReleaseList.length > 0 &&
                    newReleaseList.map((data, index) => {
                        return (
                            <div id="curve"
                                 className="card"
                                 key={index + data.artists[0].name}
                                 style={{backgroundImage: `url(${data.images[1].url})`}}>
                                <div className="footer">
                                    <div className="play-btn-container">
                                        <div className="slider-play-btn">
                                            <IconButton className="nr-play-btn"
                                                        aria-label="play album">
                                                <PlayArrowIcon className={classes.mainColor} fontSize={"large"}/>
                                            </IconButton>
                                        </div>
                                    </div>

                                    <div className="info">
                                        <div className="nr-artist-name">{data.artists[0].name}</div>
                                        <div className="nr-artist-album">{data.name}</div>
                                    </div>
                                </div>
                                <div className="card-blur"/>
                            </div>
                        )

                    })
                }
            </NewReleaseCarousel>
        </div>
    );
};

export default NewReleaseHeader;


/*

<div className="slider-section"
                                 key={index + data.artists[0].name}>
                                <div className="image-box" style={{backgroundImage: `url(${data.images[1].url})`}}>
                                    <div className="slider-section-artist-info">
                                        <h4>{data.artists[0].name}</h4>
                                        <h3>{data.name}</h3>

                                        <div className="slider-play-btn">
                                            <IconButton className="nr-play-btn" color={"secondary"}  aria-label="add an alarm">
                                                <PlayArrowIcon fontSize={"large"}/>
                                            </IconButton>
                                        </div>
                                    </div>

                                </div>
                                <img src={data.images[0].url}
                                     alt=""
                                     className="release-image"
                                     id={"image-" + index}
                                     key={"image" + index}/>
                                <div className="slider-play-btn">
                                    <IconButton className="nr-play-btn" color={"secondary"}  aria-label="add an alarm">
                                        <PlayArrowIcon fontSize={"large"}/>
                                    </IconButton>
                                </div>
                                <div className="slider-section-artist-info">
                                    <h4>{data.artists[0].name}</h4>
                                    <h3>{data.name}</h3>
                                </div>
                            </div>


 */
