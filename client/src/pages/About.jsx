import classes from './../components/styles/About.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function AboutPage() {

    return (
        <div className={classes.background}>
            <div className='container-narrow'>
                <h1 className={classes.slogan}>Share your travels, seek inspiration, and <span className={classes.green}>connect with others.</span></h1>
                <br />
                <div className={classes.quote}>
                    "To see the world, things dangerous to come to, to see behind walls, draw closer, to find each other, and to feel. That is the purpose of life." - The Secret Life of Walter Mitty
                </div>
                <div className={classes.row}>
                    <div className={classes.columnLeft}>
                        <img width='100%' src='https://images.pexels.com/photos/238622/pexels-photo-238622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'></img>
                    </div>
                    <div className={classes.columnRight}>
                        <h1 style={{marginBottom: '30px'}}>Share your memories.</h1>
                        <h1 style={{marginBottom: '130px', marginLeft: "300px"}}>Be <span className={classes.green}>inspired.</span></h1>
                        <br/>
                        <p>Pictaverse is a demo React.js application that utilizes geolocation and maps to let users post their
                            favorite travel and vacation recommendations. This project also uses: Redux, Redux-Toolkit, TypeScript,
                            Material UI, and Google API's (for maps and geocoding).</p>
                            <br/><br/>
                            <br/>
                            <br/>
                            <br/>
                           </div>
                </div>
                <br />
            </div>
        </div>
    )
}