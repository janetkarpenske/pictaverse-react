import { NavLink, useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import classes from './styles/MainNavigation.module.css';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';

function MainNavigation() {
  const navigate = useNavigate();
  let currentUser;

  const handleSignOut = () => {
    signOut(auth);
    console.log('Signed out')
    navigate("/");
  };

  onAuthStateChanged (auth, (user) => {
    currentUser = user;
    console.log("current user: ", currentUser);
    //userStoreRef.setUser(user);
    if(user != null) {
      //getUserPets(user.uid);
      //getUserProfile(user.uid);
    }
    else {
      //need to clear user data and pet data from stores
    };
  })

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
          <IconButton variant='text'>
            <NavLink
              to="/"
              className={({isActive}) => (
                isActive ? classes.active : undefined
              )}
              end
            >
              <PetsRoundedIcon fontSize='inherit'/>
            </NavLink>
            </IconButton>
          </li>
          <li>
            <Button variant='text'>
            <NavLink
              to="/signin"
              className={({isActive}) => (
                isActive ? classes.active : undefined
              )}
            >
              Signin
            </NavLink>
            </Button>
          </li>
          <li>
            <Button variant='text'>
            <NavLink
              to="/register"
              className={({isActive}) => (
                isActive ? classes.active : undefined
              )}
            >
              Register
            </NavLink>
            </Button>
          </li>
          <li>
            <Button variant='text'>
            <NavLink
              to="/about"
              className={({isActive}) => (
                isActive ? classes.active : undefined
              )}
            >
              About
            </NavLink>
            </Button>
          </li>
          <li>
            <Button variant='text'>
            <NavLink
              to="/dashboard"
              className={({isActive}) => (
                isActive ? classes.active : undefined
              )}
            >
              Dashboard
            </NavLink>
            </Button>
          </li>
          <li>
            <Button variant='text' onClick={handleSignOut}>
              Signout
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;