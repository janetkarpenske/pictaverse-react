import { useState, useEffect } from "react";
import classes from './styles/Map.module.css';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { db } from './../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore'
import mapStyle from './styles/mapStyle';
import picture from "./../img/bckgrnd_temp.jpg";

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

    useEffect(() => {
        
        const getPosts = async () => {
            setIsLoadingPosts(true);
            const q = query(collection(db, "upUserPosts"), where("upUserUID", "==", "7H4JVjnqAXVST9qaME0JLvvd3bE3"));

            let userPostsArr = [];

            const querySnapshot = await getDocs(q);
            console.log("Query snapshot: ", querySnapshot);
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
                    upID: doc.id
                };
                userPostsArr.push(post);
            });
            setUserPosts(userPostsArr);
            setIsLoadingPosts(false);
        }

        getPosts();
        console.log("Here...", userPosts);
    }, [])

    console.log("Map selected marker is: ", mapSelectedMarker);

    return (
        <>
            <div className={classes.postContainer}>
                {userPosts && userPosts.length > 0 && (
                    userPosts.map((post) => (
                        <div className={classes.postCard} onClick={() => setMapSelectedMarker(post)}>
                            <h1 key={post.upID}>{post.upPostName}</h1>
                            <h2>{post.upCity}, {post.upState}</h2>
                            <br />
                            <div className={classes.postImg}>
                                <img src={picture} width="100%" height="100%"/>
                            </div>
                            <div className={classes.postDetails}>
                                <p>{post.upDescription}</p>
                            </div>
                            
                        </div>
                    ))
                )}
            </div>
            <div className={classes.mapContainer}>
                {!isLoadingPosts && userPosts.length > 0 && <LoadScript googleMapsApiKey="" >
                    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} defaultOptions={{styles: mapStyle}}  >
                        {userPosts.map((post) => (
                            <>
                            <Marker key={post.upID}
                                icon={customIcon}
                                position={{
                                    lat: post.upLatitude,
                                    lng: post.upLongitude
                                }}
                                onClick={() => {
                                    setMapSelectedMarker(post);
                                }}
                            />
                        </>
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
                                <div className="popupPost">
                                    <h4>{mapSelectedMarker.upPostName}</h4>
                                    <img className="popupImg" src={mapSelectedMarker.image}></img>
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </LoadScript>}
            </div>
        </>
    )
}