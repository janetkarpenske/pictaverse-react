import classes from '../components/styles/Home.module.css';
import globeImg from '../img/globe.png';

export default function HomePage() {

    return (
        <div>
            <section className={classes.home}>
                <div className={classes.homeContent}>
                    <h1>Pictaverse</h1>
                    <h3>Share Your Travels</h3>
                    <br/>
                    <p>
                        Lorem ipsum odor amet, consectetuer adipiscing elit.
                        Bibendum pulvinar pellentesque odio praesent hac ex;
                        tempor conubia et. Quam himenaeos mi id justo, congue duis vivamus.
                        Dignissim fusce curabitur aenean phasellus class rhoncus consectetur.
                        Neque sodales netus habitant mollis eget. Magnis ipsum interdum maecenas natoque quisque magnis.
                        Fusce sem tristique vel augue eleifend id quis?
                    </p>
                    <div className={classes.btnBox}>
                        <a href="/register">Get Started</a>
                    </div>
                </div>
                <div className={classes.homeImg}>
                    <img src={globeImg}></img>
                </div>

            </section>
        </div>
    )
}