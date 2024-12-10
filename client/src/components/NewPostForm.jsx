//React Imports
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//firebase Imports
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

//Material UI Imports
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

export default function NewPostForm() {

    const [postName, setPostName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [country, setCountry] = useState('US');
    let userUID = useSelector((state => state.user.signedInUserUID));

    const handleCreatePost = (event) => {
        event.preventDefault();
        createNewPost();
    }

    const getCoordinates = async () => {
        let queryParams = "";
        if (city) {
            queryParams = city;
        }
        if (state && city) {
            queryParams = queryParams + "," + state
        }
        //country must be ISO 3166 country code
        if (country && state && city) {
            queryParams = queryParams + "," + country
        }
        let limit = 2;
        let url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + queryParams + '&limit=' + limit + '&appid=' + process.env.REACT_APP_OPEN_WEATHER_API_KEY;
        try {
            console.log("Making API call...");
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch location data');
            }
            const responseData = await response.json();
            return [responseData[0].lat, responseData[0].lon];
        }
        catch (err) {
            console.log(err);
        }
    }
    const resetForm = () => {
        setCity('');
        setCountry('');
        setDescription('');
        setPostName('');
        setState('');
        setIsDisabled(false);
    }
    const createNewPost = async () => {
        setIsDisabled(true);

        let coordArray = await getCoordinates();
        console.log("Coord array returned: ", coordArray);
        try {
            await addDoc(collection(db, "upUserPosts"), {
                upCity: city,
                upCountry: country,
                upDescription: description,
                upUserUID: userUID,
                upLatitude: coordArray[0],
                upLongitude: coordArray[1],
                upPostName: postName,
                upState: state
            });
        }
        catch (error) {
            console.log('An error occurred creating post in Firestore');
        }
        resetForm();
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: "center", marginTop: "8%" }}>

                <br />
                <form onSubmit={handleCreatePost}>
                    <h2>Create a Post</h2>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <TextField
                            id="standard-basic"
                            label="Enter a Name for your post"
                            variant="standard"
                            color="primary"
                            name="postName"
                            required
                            value={postName}
                            disabled={isDisabled}
                            onChange={(e) => { setPostName(e.target.value) }} />
                    </FormControl>
                    <br />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <TextField
                            id="standard-basic"
                            label="Description"
                            variant="standard"
                            color="primary"
                            name="description"
                            required
                            value={description}
                            disabled={isDisabled}
                            onChange={(e) => { setDescription(e.target.value) }} />
                    </FormControl>
                    <br />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <TextField
                            id="standard-basic"
                            label="City"
                            variant="standard"
                            color="primary"
                            name="city"
                            required
                            value={city}
                            disabled={isDisabled}
                            onChange={(e) => { setCity(e.target.value) }} />
                    </FormControl>
                    <br />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <TextField
                            id="standard-basic"
                            label="State"
                            variant="standard"
                            color="primary"
                            name="State"
                            required
                            value={state}
                            disabled={isDisabled}
                            onChange={(e) => { setState(e.target.value) }} />
                    </FormControl>
                    <br />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <Button onClick={handleCreatePost} variant='outlined' disabled={isDisabled}>Create</Button>
                    </FormControl>
                </form>
            </Box>
        </>
    )
}