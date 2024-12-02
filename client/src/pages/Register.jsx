//React Imports
import { useRef, useState } from "react";
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

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

    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();
    const password = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    registerNewUser();
  }

  const registerNewUser = async() => {
    try{
      const response = await createUserWithEmailAndPassword(
        auth, email.current.value, password.current.value
      )
      if(!response) {
        throw new Error('Sorry, something went wrong');
      }
      else {
        //clear form data here
        navigate('/signin');
      }
    }
    catch(error) {
        console.log(error);
    }
  }

     return (
        <>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: "center", marginTop: "8%"}}>

            <br/>
            <form onSubmit={handleSubmit}>
            <h2>Create an Account</h2>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <TextField
                        id="standard-basic"
                        label="First Name"
                        variant="standard"
                        color="primary"
                        name="firstName"
                        required
                        inputRef={firstName}/>
                </FormControl>
                <br />
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <TextField
                        id="standard-basic"
                        label="Last Name"
                        variant="standard"
                        color="primary"
                        name="lastName"
                        required
                        inputRef={lastName}/>
                </FormControl>
                <br />
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <TextField
                        id="standard-basic"
                        label="Email"
                        variant="standard"
                        color="primary"
                        name="email"
                        required
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
                    required
                    inputRef={password}
                    />
                </FormControl>
                <br/>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <Button onClick={handleSubmit} variant='outlined'>Register</Button>
                </FormControl>
            </form>
        </Box>
        </>
     )
}