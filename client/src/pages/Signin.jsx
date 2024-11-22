import TextField from '@mui/material/TextField';
import { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

export default function Signin() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: "center"}}>
            <form>
                <h2>Sign In</h2>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <TextField id="standard-basic" label="Username" variant="standard" color="primary"/>
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
                    />
                </FormControl>
            </form>
        </Box>
        </>
    )
}