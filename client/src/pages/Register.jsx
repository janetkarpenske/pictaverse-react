//React Imports
import { useState } from "react";
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import classes from './../components/styles/Register.module.css';

//Material UI Imports
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const navigate = useNavigate();
    const [firstNameVal, setFirstNameVal] = useState("");
    const [firstNameWasEdited, setFirstNameWasEdited] = useState(false);
    const [lastNameVal, setLastNameVal] = useState("");
    const [emailVal, setEmailVal] = useState("");
    const [passwordVal, setPasswordVal] = useState("");
    const [passwordWasEdited, setPasswordWasEdited] = useState(false);
    const [firstNameErr, setFirstNameErr] = useState(false);
    const [lastNameErr, setLastNameErr] = useState(false);
    const [lastNameWasEdited, setLastNameWasEdited] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [emailWasEdited, setEmailWasEdited] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);

    const handleEmailValChange = (event) => {
        let isEmailInvalid = false;
        if((event.target.value.length > 0 && !event.target.value.includes("@")) || (emailWasEdited && event.target.value.length == 0)) {
            isEmailInvalid = true;
        }
        setEmailWasEdited(true);
        setEmailErr(isEmailInvalid);
        setEmailVal(event.target.value);
    }

    const handlePasswordValChange = (event) => {

        let isPasswordInvalid = false;
        if((event.target.value.length > 0 && event.target.value.length < 8) || (passwordWasEdited && event.target.value.length == 0)) {
            isPasswordInvalid = true;
        }
        setPasswordWasEdited(true);
        setPasswordErr(isPasswordInvalid);
        setPasswordVal(event.target.value);
    }

    const handleFirstNameValChange = (event) => {
        let isFirstNameInvalid = false;

        if((firstNameWasEdited && event.target.value.length == 0)) {
            isFirstNameInvalid = true;
        }
        setFirstNameWasEdited(true);
        setFirstNameErr(isFirstNameInvalid);
        setFirstNameVal(event.target.value);
    }

    const handleLastNameValChange = (event) => {
        let isLastNameInvalid = false;

        if((lastNameWasEdited && event.target.value.length == 0)) {
            isLastNameInvalid = true;
        }
        setLastNameWasEdited(true);
        setLastNameErr(isLastNameInvalid);
        setLastNameVal(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        registerNewUser();
    }

    const registerNewUser = async () => {
        try {
            const response = await createUserWithEmailAndPassword(
                auth, emailVal, passwordVal
            )
            if (!response) {
                throw new Error('Sorry, something went wrong creating user in Firebase auth.');
            }
            await addDoc(collection(db, "users"), {
                userFirstName: firstNameVal,
                userLastName: lastNameVal,
                userUID: response.user.uid

            });
            navigate('/dashboard');
        }
        catch (error) {
            console.log(error);
        }
        
    }

    return (
        <>
            <div className={classes.registerForm}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: "center", marginTop: "8%" }}>

                    <br />
                    <form onSubmit={handleSubmit}>
                        <h2>Create Account</h2>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <TextField
                                error={firstNameErr}
                                helperText=""
                                id="standard-basic"
                                label="First Name"
                                variant="standard"
                                // color="primary"
                                name="firstName"
                                required
                                onChange={handleFirstNameValChange} />
                        </FormControl>
                        <br />
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <TextField
                                error={lastNameErr}
                                helperText=""
                                id="standard-basic"
                                label="Last Name"
                                variant="standard"
                                color="primary"
                                name="lastName"
                                required
                                onChange={handleLastNameValChange} />
                        </FormControl>
                        <br />
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <TextField
                                error={emailErr}
                                helperText={emailErr ? "Please enter a valid email" : ""}
                                id="standard-basic"
                                label="Email"
                                variant="standard"
                                color="primary"
                                name="email"
                                required
                                onChange={handleEmailValChange} />
                        </FormControl>
                        <br />
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                error={passwordErr}
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                name="password"
                                required
                                onChange={handlePasswordValChange}
                            />
                        </FormControl>
                        <br />
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <Button onClick={handleSubmit} variant='outlined' color='success' disabled={(
                                firstNameErr || lastNameErr || emailErr || passwordErr ||
                                firstNameVal.length === 0 || lastNameVal.length === 0 || emailVal.length === 0 || passwordVal.length === 0
                            )
                            }>Register</Button>
                        </FormControl>
                    </form>
                </Box>
            </div>
        </>
    )
}