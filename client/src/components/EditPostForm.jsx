//import classes from './styles/EditPostForm.module.css';
//React Imports
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//firebase Imports
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../firebase/config';

//Material UI Imports
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { collection, doc, setDoc, addDoc } from 'firebase/firestore'
import classes from './styles/EditPostForm.module.css';

export default function EditPostForm({post, postId, cancelEdit}) {

    const [postName, setPostName] = useState(post.upPostName);
    const [city, setCity] = useState(post.upCity);
    const [state, setState] = useState(post.upState);
    const [description, setDescription] = useState(post.upDescription);
    const [isDisabled, setIsDisabled] = useState(false);
    const [country, setCountry] = useState('US');
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');

    let userUID = useSelector((state => state.user.signedInUserUID));
    const navigate = useNavigate();

    const handleEditPost = (event) => {
        event.preventDefault();
        console.log(postName);
        editExistingPost();
        //handlePhotoUpload();
        navigate("/dashboard");
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
            console.log("Making API call to get coordiantes...");
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch coordinates location data');
            }
            const responseData = await response.json();
            return [responseData[0].lat, responseData[0].lon];
        }
        catch (err) {
            console.log(err);
        }
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

    const editExistingPost = async () => {
        setIsDisabled(true);

        let coordArray = await getCoordinates();
        try {
            await setDoc(doc(db, "upUserPosts", postId), {
                upCity: city,
                upCountry: country,
                upDescription: description,
                upUserUID: userUID,
                upLatitude: coordArray[0],
                upLongitude: coordArray[1],
                upPostName: postName,
                upState: state,
                upImage: post.upImage
            });
        }
        catch (error) {
            console.log('An error occurred creating post in Firestore');
        }

    }

    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: "center", marginTop: "8%" }}>

                <br />
                <form onSubmit={handleEditPost}>
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
                        <Button onClick={cancelEdit} disabled={isDisabled}>Cancel</Button>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <Button onClick={handleEditPost} disabled={isDisabled}>Update Post</Button>
                    </FormControl>

                </form>
            </Box>
        </>
    )
}