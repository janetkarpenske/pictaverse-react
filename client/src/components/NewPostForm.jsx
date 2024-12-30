import classes from './styles/NewPostForm.module.css';
//React Imports
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//firebase Imports
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../firebase/config';

//Material UI Imports
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

export default function NewPostForm() {

    const [postName, setPostName] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [country, setCountry] = useState('US');
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');

    let userUID = useSelector((state => state.user.signedInUserUID));
    const navigate = useNavigate();

    const handleCreatePost = (event) => {
        event.preventDefault();
        createNewPost();
        //handlePhotoUpload();
        navigate("/dashboard");
    }

    const getGoogleCoordinates = async () => {
        let queryParams = "";
        if (streetAddress) {
            queryParams = streetAddress;
        }
        if (streetAddress && city) {
            queryParams = queryParams + ", " + city;
        }
        if (state && city && streetAddress) {
            queryParams = queryParams + ", " + state
        }

        let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(queryParams)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_TOKEN}`
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch coordinates location data');
            }
            const responseData = await response.json();
            return [responseData.results[0].geometry.location.lat, responseData.results[0].geometry.location.lng];
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

    const handlePhotoChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    }

    const handlePhotoUpload = () => {
        const storageRef = ref(storage, `images/${file.name}`);
        uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                setUrl(downloadURL)
            });
        });
    };

    const createNewPost = async () => {
        setIsDisabled(true);

        let coordArray = await getGoogleCoordinates();
        console.log("Moment of truth: ", coordArray)
        try {
            await addDoc(collection(db, "upUserPosts"), {
                upCity: city,
                upCountry: country,
                upDescription: description,
                upUserUID: userUID,
                upLatitude: coordArray[0],
                upLongitude: coordArray[1],
                upPostName: postName,
                upState: state,
                upImage: "https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            });
        }
        catch (error) {
            console.log('An error occurred creating post in Firestore');
        }
        resetForm();

    }

    return (
        <>
            <div className={classes.newPostForm}>
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
                                label="Street Address"
                                variant="standard"
                                color="primary"
                                name="streetAddress"
                                required
                                value={streetAddress}
                                disabled={isDisabled}
                                onChange={(e) => { setStreetAddress(e.target.value) }} />
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
                            <label for="description" className={classes.description}>Description</label>
                            <textarea
                                className={classes.txtArea}
                                id="description"
                                name="description"
                                rows="4"
                                cols="50"
                                required
                                value={description}
                                disabled={isDisabled}
                                onChange={(e) => { setDescription(e.target.value) }} >
                            </textarea>
                        </FormControl>
                        <br />
                        <label for="fileupload" className={classes.customFileUpload}>Upload Photo</label>
                        <input id="fileupload" type="file" onChange={handlePhotoChange} disabled={false} />
                        <br />
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <Button onClick={handleCreatePost} disabled={isDisabled}>Create</Button>
                        </FormControl>
                    </form>
                </Box>
            </div>
        </>
    )
}