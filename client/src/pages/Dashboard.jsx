import Map from "../components/Map";
import classes from "./../components/styles/Dashboard.module.css";
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import redMarker from './../img/redsmall.png';
import blueMarker from './../img/deepbluesmall.png';

export default function Dashboard() {
    console.log("Rendered dashboard");
    const navigate = useNavigate();

    const handleNavigate = (e) => {
        navigate("/newPost");
    }

    return (
        <div className="container">
            <div className={classes.buttonBanner}>
                <div className={classes.leftBtns}>
                    <Button variant='outlined' onClick={handleNavigate}>
                        + New Post
                    </Button>
                    <Button variant='outlined' color="success" disabled>
                        Filter
                    </Button>
                </div>
                <div className={classes.rightBtns}>
                    <div>
                        <img src={redMarker} width="18px"></img>
                        <p>Your posts</p>
                    </div>
                    <div>
                        <img src={blueMarker} width="18px"></img>
                        <p>Other user posts</p>
                    </div>
                </div>
            </div>

            <br />
            <Map />
        </div>
    )
}