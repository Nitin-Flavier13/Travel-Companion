import React from 'react';
import {Autocomplete} from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles'

const Header = ({setCoordinates}) => {
    const classes = useStyles();
    const [autocomplete,setAutoComplete] = React.useState(null);
    const onLoadHandle = (autoC) => setAutoComplete(autoC);

    const onPlaceChangedHandle = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();

        setCoordinates({lat,lng});
    }
    
    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography variant='h5' className={classes.title}>
                    Travel Companion
                </Typography>
                <Box display="flex">
                    <Typography variant='h6' className={classes.title}>
                        Find Out New Places
                    </Typography>
                    <Autocomplete onLoad={onLoadHandle} onPlaceChanged={onPlaceChangedHandle}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder='Search ...' classes={{root: classes.inputRoot,input: classes.inputInput}}/>
                        </div>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;