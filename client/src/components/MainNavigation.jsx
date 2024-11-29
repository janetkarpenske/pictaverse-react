import { NavLink, useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import classes from './styles/MainNavigation.module.css';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/user-slice';

function MainNavigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let currentUser = useSelector((state => state.user.signedInUserEmail));

  const handleSignOut = () => {
    signOut(auth);
    navigate("/");
  };

  onAuthStateChanged (auth, (user) => {
    console.log("current user: ", currentUser);

    let payload;
    if(user !== null)
      {
        payload = {
          userEmail: user.email,
          userUID: user.uid
        }
      }
    else {
      payload = null;
    }

    dispatch(userActions.setSignedInUser(payload));

    if(user != null) {
      //load other immediate data needed here
    }
    else {

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
              <PublicIcon fontSize='large'/>
            </NavLink>
            </IconButton>
          </li>
          {!currentUser && <li>
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
          </li>}
          {!currentUser && <li>
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
          </li>}
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
          {currentUser && <li>
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
          </li>}
          {currentUser && <li>
            <Button variant='text' onClick={handleSignOut}>
              Signout
            </Button>
          </li>}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;