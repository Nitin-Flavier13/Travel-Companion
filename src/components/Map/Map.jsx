import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';

const Map = ({setCoordinates,setBounds,coordinates,places,setChildClick}) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');  // will set to false if larger than 600px

    function handleChange(e){
        setCoordinates({lat: e.center.lat,lng: e.center.lng});
        setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw});
    }

    function handleChildClick(child){
        setChildClick(child);
        console.log("inside childClick");
        console.log({child});
    }

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
               bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
               defaultCenter = {coordinates}
               center={coordinates}
               defaultZoom={14}
               margin={[50,50,50,50]}
               options={''}
               onChange={handleChange}
               onChildClick={handleChildClick} // if user clicks on the restaurent on the map
            >
            {
                places?.map((place,i)=>(
                    <div 
                        className={classes.markerContainer} 
                        lat={Number(place.latitude)} 
                        lng = {Number(place.longitude)}
                        key = {i}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" fontSize='large'/>
                            ):(
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant="subtitle2" gutterBottom>{place.name}</Typography>
                                    <img
                                        className={classes.pointer}
                                        src = {place.photo ? place.photo.images.large.url : null}
                                        alt = {place.name}
                                    />
                                    <Rating size="small" value={Number(place.rating)} readOnly/>
                                </Paper>
                            )
                        }

                    </div>
                ))
            }
            </GoogleMapReact>
        </div>
    );
}

export default Map;