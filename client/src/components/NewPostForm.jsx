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

const allTagOptions = ["Family-Friendly", "Kid-Friendly", "Adult-Only", "Outdoor", "Indoor", "Food & Drinks", "Physical Activity", "Shopping", "Relaxing", "Strenuous"]

export default function NewPostForm() {

    const [postName, setPostName] = useState('');
    const [postNameWasEdited, setPostNameWasEdited] = useState(false);
    const [postNameErr, setPostNameErr] = useState(false);
    const [postTagline, setPostTagline] = useState('');
    const [postTaglineWasEdited, setPostTaglineWasEdited] = useState(false);
    const [postTaglineErr, setPostTaglineErr] = useState(false);
    const [streetAddress, setStreetAddress] = useState('');
    const [streetAddressWasEdited, setStreetAddressWasEdited] = useState(false);
    const [streetAddressErr, setStreetAddressErr] = useState(false);
    const [city, setCity] = useState('');
    const [cityWasEdited, setCityWasEdited] = useState(false);
    const [cityErr, setCityErr] = useState(false);
    const [state, setState] = useState('');
    const [stateWasEdited, setStateWasEdited] = useState(false);
    const [stateErr, setStateErr] = useState(false);
    const [description, setDescription] = useState('');
    const [descriptionWasEdited, setDescriptionWasEdited] = useState(false);
    const [descriptionErr, setDescriptionErr] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [country, setCountry] = useState('US');
    const [file, setFile] = useState(null);
    const [allTags, setAllTags] = useState(allTagOptions);
    const [selectedTags, setSelectedTags] = useState([]);
    const [url, setUrl] = useState('');

    let userUID = useSelector((state => state.user.signedInUserUID));
    const navigate = useNavigate();

    const handleCreatePost = async (event) => {
        event.preventDefault();
        await createNewPost();

        navigate("/dashboard");
    }

    const handlePostNameChange = (event) => {
        let isPostNameInvalid = false;

        if((postNameWasEdited && event.target.value.length == 0)) {
            isPostNameInvalid = true;
        }
        setPostNameWasEdited(true);
        setPostNameErr(isPostNameInvalid);
        setPostName(event.target.value);
    }
    const handleTaglineChange = (event) => {
        let isTaglineInvalid = false;

        if((postTaglineWasEdited && event.target.value.length == 0)) {
            isTaglineInvalid = true;
        }
        setPostTaglineWasEdited(true);
        setPostTaglineErr(isTaglineInvalid);
        setPostTagline(event.target.value);
    }
    const handleAddressChange = (event) => {
        let isAddressInvalid = false;
        if((streetAddressWasEdited && event.target.value.length == 0)) {
            isAddressInvalid = true;
        }
        setStreetAddressWasEdited(true);
        setStreetAddressErr(isAddressInvalid);
        setStreetAddress(event.target.value);
    }
    const handleCityChange = (event) => {
        let isCityInvalid = false;
        if((cityWasEdited && event.target.value.length == 0)) {
            isCityInvalid = true;
        }
        setCityWasEdited(true);
        setCityErr(isCityInvalid);
        setCity(event.target.value);
    }
    const handleStateChange = (event) => {
        let isStateInvalid = false;
        if((stateWasEdited && event.target.value.length == 0)) {
            isStateInvalid = true;
        }
        setStateWasEdited(true);
        setStateErr(isStateInvalid);
        setState(event.target.value);
    }
    const handleDescriptionChange = (event) => {
        let isDescriptionInvalid = false;
        if((descriptionWasEdited && event.target.value.length == 0)) {
            isDescriptionInvalid = true;
        }
        setDescriptionWasEdited(true);
        setDescriptionErr(isDescriptionInvalid);
        setDescription(event.target.value);
    }
    const handleAddTag = (idx) => {
        setSelectedTags(prev => {
            return [...prev, allTags[idx]]
        })
        setAllTags(prev => {
            let tmp = [...prev];
            tmp.splice(idx, 1);
            return tmp;
        })
    }
    const handleRemoveTag = (idx) => {
        setAllTags(prev => {
            return [...prev, selectedTags[idx]]
        })
        setSelectedTags(prev => {
            let tmp = [...prev];
            tmp.splice(idx, 1);
            return tmp;
        })
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

    const createNewPost = async () => {
        setIsDisabled(true);

        const storageRef = ref(storage, `images/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        let modifiedDesc = description.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

        modifiedDesc = modifiedDesc.replace(/\n/g, "<br>");


        let coordArray = await getGoogleCoordinates();
        try {
            await addDoc(collection(db, "upUserPosts"), {
                upCity: city,
                upStreetAddress: streetAddress,
                upCountry: country,
                upDescription: modifiedDesc,
                upUserUID: userUID,
                upLatitude: coordArray[0],
                upLongitude: coordArray[1],
                upPostName: postName,
                upTags: selectedTags,
                upState: state,
                upTagline: postTagline,
                upURL: downloadURL ?? ""
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
                        <h2>Create a New Post</h2>
                        <FormControl sx={{ m: 1, width: '28ch' }} variant="outlined">
                            <TextField
                                id="standard-basic"
                                error={postNameErr}
                                label="Enter a Name for your post"
                                variant="standard"
                                color="primary"
                                name="postName"
                                required
                                value={postName}
                                disabled={isDisabled}
                                onChange={handlePostNameChange} />
                        </FormControl>
                        <br />
                        <FormControl sx={{ m: 1, width: '28ch' }} variant="outlined">
                            <TextField
                                id="standard-basic"
                                error={postTaglineErr}
                                label="Enter Tagline"
                                variant="standard"
                                color="primary"
                                name="postTagline"
                                required
                                value={postTagline}
                                disabled={isDisabled}
                                onChange={handleTaglineChange} />
                        </FormControl>
                        <br />
                        <FormControl sx={{ m: 1, width: '28ch' }} variant="outlined">
                            <TextField
                                id="standard-basic"
                                error={streetAddressErr}
                                label="Street Address"
                                variant="standard"
                                color="primary"
                                name="streetAddress"
                                required
                                value={streetAddress}
                                disabled={isDisabled}
                                onChange={handleAddressChange} />
                        </FormControl>
                        <br />
                        <FormControl sx={{ m: 1, width: '28ch' }} variant="outlined">
                            <TextField
                                id="standard-basic"
                                error={cityErr}
                                label="City"
                                variant="standard"
                                color="primary"
                                name="city"
                                required
                                value={city}
                                disabled={isDisabled}
                                onChange={handleCityChange} />
                        </FormControl>
                        <br />
                        <FormControl sx={{ m: 1, width: '28ch' }} variant="outlined">
                            <TextField
                                id="standard-basic"
                                error={stateErr}
                                label="State"
                                variant="standard"
                                color="primary"
                                name="State"
                                required
                                value={state}
                                disabled={isDisabled}
                                onChange={handleStateChange} />
                        </FormControl>
                        <br />
                        <FormControl sx={{ m: 1, width: '28ch' }} variant="outlined">
                            <label for="description" className={classes.description}>Description</label>
                            <textarea
                                className={classes.txtArea}
                                error={descriptionErr}
                                id="description"
                                name="description"
                                rows="4"
                                cols="50"
                                required
                                value={description}
                                disabled={isDisabled}
                                onChange={handleDescriptionChange} >
                            </textarea>
                        </FormControl>
                        <br />
                        {!file && (<>
                            <label for="fileupload" className={classes.customFileUpload}>Upload Photo</label>
                            <input id="fileupload" type="file" onChange={handlePhotoChange} disabled={false} />
                        </>)}
                        {
                            file &&
                            <p>{file.name} Selected</p>
                        }
                        <br /><br />
                    </form>

                </Box>
                <div className={classes.tagOptions}>
                    <h3>Selected Tags</h3>
                    {selectedTags.map((tag, idx) => (
                        <span key={idx} className={classes.availableTags} onClick={() => handleRemoveTag(idx)}>{tag}</span>
                    ))}
                    <h3>Select Tags to Add</h3>
                    {allTags.map((tag, idx) => (
                        <span key={idx} className={classes.availableTags} onClick={() => handleAddTag(idx)}>{tag}</span>
                    ))}
                </div>
                <Button 
                    onClick={handleCreatePost} 
                    variant='outlined' 
                    style={{ bottom: "-30px", marginLeft: "46%" }}
                    disabled={(postNameErr || postTaglineErr || streetAddressErr || cityErr || stateErr ||
                        postName.length === 0 || postTagline.length === 0 || streetAddress.length === 0 || city.length === 0 || state.length === 0
                    )}
                >
                    Create
                </Button>

            </div>
        </>
    )
}