import classes from './styles/UserDashboard.module.css';
import CircularProgress from '@mui/material/CircularProgress';

export default function UserDashboard() {

    return (
        <div className={classes.dashboardBody}>

            <div className={classes.columnLeft}>
                <h1>Left Col</h1>
            </div>
            <div className={classes.columnMid}>
                <h1>Your Dashboard</h1>
                <div className={classes.row}>
                    <div className={classes.box}>
                        <div className={classes.boxText}>
                            <p>Your Posts</p>
                            <h3>3</h3>
                        </div>
                        <div className={classes.boxVisual}>
                            <CircularProgress variant="determinate" value={75} color="secondary" size="3rem" />
                        </div>
                    </div>
                    <div className={classes.box}>
                        <div className={classes.boxText}>
                            <p>Post Likes</p>
                            <h3>26</h3>
                        </div>
                        <div className={classes.boxVisual}>
                            <CircularProgress variant="determinate" value={72} size="3rem" />
                        </div>
                    </div>
                    <div className={classes.box}>
                        <div className={classes.boxText}>
                            <p>Comments</p>
                            <h3>14</h3>
                        </div>
                        <div className={classes.boxVisual}>
                            <CircularProgress variant="determinate" value={89} color="success" size="3rem" />
                        </div>
                    </div>
                </div>
                <div className={classes.newUsersRow}>

                </div>
            </div>
            <div className={classes.columnRight}>
                <h1>Right Col</h1>
            </div>

        </div>
    )
}