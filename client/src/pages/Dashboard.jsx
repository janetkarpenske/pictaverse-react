import Map from "../components/Map";
import classes from "./../components/styles/Dashboard.module.css";
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";

export default function Dashboard() {
    console.log("Rendered dashboard");
    const navigate = useNavigate();

    const handleNavigate = (e) => {
        navigate("/newPost");
    }

    return (
        <div className="container">
            <div className={classes.buttonBanner}>
                <Button variant='outlined' onClick={handleNavigate}>
                    + New Post
                </Button>
            </div>

            <br />
            <Map />
        </div>
    )
}