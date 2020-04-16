import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeUp from '@material-ui/icons/VolumeUp';

import '../styles/VolumeController.css';

const useStyles = makeStyles({
    root: {
        width: 200,
    }
});

const CustomSlider = withStyles({
    thumb: {
        height: 18,
        width: 18,
        backgroundColor: 'rgb(120, 114, 223)',
        border: '1px solid rgb(255, 255, 255)',
        marginTop: -6,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    track: {
        height: 8,
        borderRadius: 4,
        color: 'rgba(120, 114, 223, .5)'
    },
    rail: {
        height:6,
        borderRadius: 4,
        color: 'rgb(185, 185, 185)'
    },
})(Slider);

const VolumeController = (props) => {
    const classes = useStyles();
    // const [value, setValue] = useState(props.volumePercent);

    const handleChange = (event, newValue) => {
        // setValue(newValue);
        props.changeVolumePercent(newValue);

        props.spotifyWebApi.setVolume(newValue, {}, (err, data) => {
            if(err) {
                console.log(err)
            }
            else{
                console.log(data);
            }
        })
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item style={{color: "rgb(185, 185, 185)", marginTop: "5px"}}>
                    <VolumeUp/>
                </Grid>
                <Grid item xs>
                    <CustomSlider value={props.volumePercent} onChange={handleChange} aria-labelledby="continuous-slider"/>
                </Grid>
            </Grid>
        </div>
    );
};

export default VolumeController;
