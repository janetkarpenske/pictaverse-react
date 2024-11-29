import { useState } from "react";
import ReactMapGL from 'react-map-gl';

const TOKEN = "accessTokenHereFromEnv"

export default function Map() {

    const [viewport, setViewport] = useState(
        { 
            latitude: 37.7577,
            longitude: -122.4376,
            zoom: 8, width: '100vw',
            height: '100vh'
        }
    );

    return (
        <div style={{width: "100vh", height: "100vh"}}>
            {/* <ReactMapGL {...viewport} mapboxApiAccessToken={TOKEN} onViewportChange={(newViewport) => setViewport(newViewport)} /> */}
        </div>
    )
}