import React from 'react';
import useStyles from './styles';
import PlaceDetails from "../PlaceDetails/PlaceDetails"
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select} from '@material-ui/core';

const List = ({ places,childClick,isLoading,type,setType,rating,setRating }) => {
    const classes = useStyles();
    const [elRef,setElRef] = React.useState([]);
    console.log("Kiyotakamine ");
    console.log({childClick});

    // React.useEffect(()=>{
    //     const ref = Array(places?.length).fill().map((_,i) => (elRef[i] || React.createRef()));
    //     // console.log(ref);
    //     // console.log("lol "+places);
    //     setElRef(ref);
    //     console.log("sibal sekia");
    //     console.log(elRef);
    // },[places]);
    React.useEffect(() => {
        setElRef((refs) => Array(places?.length).fill().map((_, i) => refs[i] || React.createRef()));
        // console.log(elRef);
      }, [places]);

    return (
        <div className={classes.container}>
            <Typography variant="h5">Restaurents, Hotels & Attraction around you</Typography>
            {
                isLoading ? 
                <div className={classes.loading}>
                    <CircularProgress size="5rem"/>
                </div> 
                : 
            ( <>        
                <FormControl className={classes.formControl}>
                    <InputLabel>Type</InputLabel>
                    <Select value={type} onChange={(event) => {setType(event.target.value)}}>
                        <MenuItem value="restaurants">restaurants</MenuItem>
                        <MenuItem value="hotels">hotels</MenuItem>
                        <MenuItem value="attractions">attractions</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel>rating</InputLabel>
                    <Select value={rating} onChange={(event) => {setRating(event.target.value)}}>
                        <MenuItem value={0}>All</MenuItem>
                        <MenuItem value={3}>Above 3.0</MenuItem>
                        <MenuItem value={4}>Above 4.0</MenuItem>
                        <MenuItem value={4.5}>Above 4.5</MenuItem>
                    </Select>
                </FormControl>
                <Grid container spacing={3} className={classes.list}>
                    {
                        places?.map((place,i)=>{
                            // console.log(place.photo);
                            return (
                            <Grid ref={elRef[i]} item key={i} xs = {12}>
                                {
                                // console.log("inside here ")
                                console.log(elRef[i])
                                }
                                { console.log("inside here ") }
                                <PlaceDetails
                                    place={place}
                                    selected={Number(childClick) == i}
                                    refProp={elRef[i]}
                                />
                            </Grid>  
                            );  
                        })
                    }
                </Grid>
            </>
            )}
        </div>
    );
}

export default List;