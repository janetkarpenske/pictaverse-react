# react-pictaverse

Social media site that utilizes Geolocation and Mapbox so users can create posts and tag their favorite/recommended vacation and travel spots.

Utilizes: 
- Redux and Redux-Toolkit for state-management
- React Router
- Material UI for stylization
- Firebase for authentication/authorization and database storage
- Mapbox for map usage
- OpenWeather - for geocoding and reverse geocoding

## Project Setup
Navigate to project's client/ directory and create a .env file with the following contents:
```sh
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_OPEN_WEATHER_API_KEY=
```
Reach out to repo owner for access to required keys.

In client directory install packages:
```sh
npm install
```

### Client-side Setup:

Still within project's client directory, run npm run start.
```sh
npm run start
```

### Server-side Setup:

Coming soon!

### Compile and Minify for Production

```sh
npm run build
```