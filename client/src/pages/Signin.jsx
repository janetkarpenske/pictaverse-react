//React Imports
import { useState } from 'react';
import { useRef } from "react";

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

export default function Signin() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const email = useRef();
    const password = useRef();

  function handleSubmit(event) {
    console.log("Signing in...");
    event.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;
    console.log(enteredEmail, enteredPassword)
    //the downside with refs is to clear it after ward it is not recommended to directly
    //manipulate the DOM
    //example: email = '';
  }

    return (
        <>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: "center", marginTop: "8%"}}>
            <form>
                <h2>Sign In</h2>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <TextField
                        id="standard-basic"
                        label="Username"
                        variant="standard" 
                        color="primary"
                        name="email"
                        inputRef={email}/>
                </FormControl>
                <br />
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
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
                    inputRef={password}
                    />
                </FormControl>
                <br/>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <Button onClick={handleSubmit} variant='outlined'>Sign In</Button>
                </FormControl>
            </form>
        </Box>
        </>
    )
}