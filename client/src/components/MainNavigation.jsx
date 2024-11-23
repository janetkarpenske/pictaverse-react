import { NavLink } from 'react-router-dom';
import classes from './styles/MainNavigation.module.css';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';

function MainNavigation() {
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
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;