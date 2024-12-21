import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import classes from './styles/Map.module.css';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { db } from './../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore'
import mapStyle from './styles/mapStyle';
import picture from "./../img/bckgrnd_temp.jpg";
import { useNavigate } from "react-router-dom";

//MUI imports
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import Box from '@mui/material/Box';

const GOOGLE_MAPS_API_TOKEN = process.env.REACT_APP_GOOGLE_MAPS_API_TOKEN;

const containerStyle = {
    width: '100%',
    height: '83vh'
};
const center = {
    lat: 45.6280,
    lng: -122.6739
};

const customIcon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';

export default function Map() {
    console.log("Rendering map...");
    const [userPosts, setUserPosts] = useState([]);
    const [mapSelectedMarker, setMapSelectedMarker] = useState(null);
    const [isLoadingPosts, setIsLoadingPosts] = useState(false);

    const navigate = useNavigate();

    let authenticatedUserUID = useSelector((state => state.user.signedInUserUID));
    //const memoizedUserUID = useMemo(() => authenticatedUserUID, [authenticatedUserUID]);

    useEffect(() => {
        //, where("upUserUID", "==", authenticatedUserUID)
        const getPosts = async () => {
            setIsLoadingPosts(true);
            const q = query(collection(db, "upUserPosts"));

            let userPostsArr = [];

            const querySnapshot = await getDocs(q);
            querySnapshot?.forEach((doc) => {
                const post = {
                    upCity: doc.data().upCity,
                    upCountry: doc.data().upCountry,
                    upUserUID: doc.data().upUserUID,
                    upState: doc.data().upState,
                    upLatitude: doc.data().upLatitude,
                    upLongitude: doc.data().upLongitude,
                    upPostName: doc.data().upPostName,
                    upDescription: doc.data().upDescription,
                    upImage: doc.data().upImage,
                    upID: doc.id
                };
                userPostsArr.push(post);
            });
            setUserPosts(userPostsArr);
            setIsLoadingPosts(false);
        }

        getPosts();
    }, [authenticatedUserUID])

    const handleClick = () => {
        console.log("Clicked: ", mapSelectedMarker.upID)
        navigate(`/posts/${mapSelectedMarker.upID}`)
    }
    return (
        <>
            {isLoadingPosts && (
                <Box sx={{ display: 'flex' }} className={classes.loader}>
                    <CircularProgress size="80px" />
                </Box>
            )}
            {!isLoadingPosts && (
                <div>
                    <div className={classes.postContainer}>
                        <div className={classes.gridContainer}>
                            {userPosts && userPosts.length > 0 && (
                                userPosts.map((post) => (
                                    <div key={post.upID} onClick={() => setMapSelectedMarker(post)}>
                                        <Card className={classes.muiCard}>
                                            <CardMedia
                                                sx={{ height: 140 }}
                                                image={post.upImage}
                                                title="Post Image"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {post.upPostName}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                    {post.upDescription.slice(0, 60)}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <p className={classes.cardLocation}>{post.upCity}, {post.upState}</p>
                                            </CardActions>
                                        </Card>

                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    <div className={classes.mapContainer}>
                        {!isLoadingPosts && userPosts.length > 0 && <LoadScript googleMapsApiKey="" >
                            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} defaultOptions={{ styles: mapStyle }}  >
                                {userPosts.map((post) => (
                                    <Marker key={post.upID}
                                        icon={post.upUserUID == authenticatedUserUID ? customIcon : undefined}
                                        position={{
                                            lat: post.upLatitude,
                                            lng: post.upLongitude
                                        }}
                                        onClick={() => {
                                            setMapSelectedMarker(post);
                                        }}
                                    />
                                ))}
                                {mapSelectedMarker && (
                                    <InfoWindow
                                        className={classes.mapInfoWindow}
                                        position={{
                                            lat: mapSelectedMarker.upLatitude,
                                            lng: mapSelectedMarker.upLongitude
                                        }}
                                        onCloseClick={() => {
                                            setMapSelectedMarker(null);
                                        }}
                                    >
                                        <div className="popupPost" style={{ width: '180px', height: '220px' }}>
                                            <h4>{mapSelectedMarker.upPostName}</h4>
                                            <img style={{ width: '175px', height: '150px' }} src={mapSelectedMarker.upImage}></img>
                                            <p>{mapSelectedMarker.upDescription.slice(0, 38)} ... <b onClick={handleClick} style={{ cursor: 'pointer' }}>Read More</b></p>
                                        </div>
                                    </InfoWindow>
                                )}
                            </GoogleMap>
                        </LoadScript>}
                    </div>
                </div>
            )}
        </>
    )
}