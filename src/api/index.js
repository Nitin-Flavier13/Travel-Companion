import axios from "axios";

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

const getPlacesData = async (type,sw,ne) => {
    try{
        const options = {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY,
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        };
        const {data: {data}} = await axios.request(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,options);
        // console.log(data);
        return data;
    }
    catch(error){
        console.error("Error in getting places data " + error);
    }
}

export default getPlacesData; 