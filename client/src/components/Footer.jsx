import classes from './styles/Footer.module.css';

export default function Footer() {

    return (
        <>
        <ul className={classes.list}>
            <li className={classes.footer}>The footer</li>
            <li className={classes.footer}>Pictaverse</li>
        </ul>
        </>
    )
}