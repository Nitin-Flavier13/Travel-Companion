import React from 'react';
import getPlacesData from "./api/index";
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { CssBaseline,Grid } from '@material-ui/core';

const App = () => {
    const [places,setPlaces] = React.useState([]);
    const [filteredPlaces,setFilteredPlaces] = React.useState([]);
    const [coordinates,setCoordinates] = React.useState({lat: 0,lng: 0});
    const [bounds,setBounds] = React.useState({sw: 0,ne: 0});
    const [childClick,setChildClick] = React.useState(0);
    const [isLoading,setIsLoading] = React.useState(false);

    const [type,setType] = React.useState('restaurants');
    const [rating,setRating] = React.useState('');

    // getting initial position 
    React.useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({coords: {lat,lng}})=>{
            setCoordinates({lat: lat,lng: lng});
        })
    },[]);

    React.useEffect(()=>{
        const filteredPlaces = places.filter((place)=> place.rating > rating);
        setFilteredPlaces(filteredPlaces);
    },[rating]);

    React.useEffect(()=>{
        // console.log(coordinates,bounds);
        setIsLoading(true);
        getPlacesData(type,bounds.sw,bounds.ne)
        .then((data)=>{
            // console.log(data);
            setPlaces(data?.filter((place)=> place.name && place.num_reviews > 0));
            setFilteredPlaces([]);
            setIsLoading(false);
        })
    },[type,bounds]);
    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List 
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClick={childClick}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>    
                <Grid item xs={12} md={8}>
                    <Map 
                       setCoordinates = {setCoordinates}
                       setBounds = {setBounds}
                       coordinates = {coordinates}
                       places={filteredPlaces.length ? filteredPlaces : places}
                       setChildClick={setChildClick}
                    />
                </Grid>    
            </Grid>
        </>
    );
}

export default App;