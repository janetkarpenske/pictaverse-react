import classes from './../components/styles/AboutPage.module.css';
export default function AboutPage() {

    return (
        <div className={classes.background}>
            <div className='container-narrow'>
                <h1 className={classes.slogan}>Share your travels, seek inspiration, and <span className={classes.green}>connect with others.</span></h1>
                <br />
                <div className={classes.description}>
                    Pictaverse is a React.js application that utilizes geolocation and maps to let users post their
                    favorite travel and vacation recommendations. This project also uses: Redux, Redux-Toolkit,
                    Material UI, and Google API's (for maps and geocoding).
                    <br />
                    <br />
                </div>

                <div className={classes.gridContainer}>
                    <div className={classes.captionCol}>
                        <span className={classes.caption} style={{marginLeft: "14%"}}>What is Pictaverse?
                        </span>
                    </div>
                    <div className={classes.contentCol} style={{border: "solid 3px var(--color-primary-900)"}}>
                        <span className={classes.contentCustom}>
                            <p>
                            Pictaverse is a React.js application that utilizes geocoding and Google Map API to let users post about their
                            favorite travel and vacation spots. </p>
                        </span>
                    </div>

                    <div className={classes.contentCol} style={{border: "solid 3px rgb(90, 206, 125)"}}>
                        <span className={classes.content}>
                            <ol className={classes.content} style={{marginLeft: "22%"}}>
                                <li>Sign In or Register an account</li>
                                <li>Blog about where You've Been</li>
                                <li>Connect with Other Users</li>
                                <li>See Where Other's Have Been
                                </li>
                                <li>Plan your excusions</li>
                            </ol>
                        </span>
                    </div>
                    <div className={classes.captionCol} style={{backgroundColor: "rgb(90, 206, 125)"}}> <span className={classes.caption}>How It Works</span></div>
                    <div className={classes.captionCol} style={{backgroundColor: "var(--color-primary-700)"}}><span className={classes.caption}>Built With...</span></div>
                    <div className={classes.contentCol} style={{border: "solid 3px var(--color-primary-700)"}}>
                        <span className={classes.content}>
                            <ul className={classes.content} style={{ fontWeight: "600", textAlign: "center" }}>
                                <li>React</li>
                                <li>Redux & Redux-Toolkit</li>
                                <li>Google Maps Javascript API</li>
                                <li>Google Geocode API</li>
                                <li>Firebase Authentication</li>
                                <li>Firestore Database & Firebase Storage</li>
                                <li>Material UI</li>
                            </ul>
                        </span></div>

                </div>
            </div>
        </div>
    )
}