import classes from '../components/styles/Home.module.css';

export default function HomePage() {

    return (
        <div>
            <section className={classes.home}>
                <div className={classes.homeContent}>
                    <h1>pictaverse.</h1>
                    <h3>travel by photos</h3>
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
                <div className={classes.homeSci}>
                    <a href="">LI</a>
                    <a href="">GH</a>
                </div>
            </section>
        </div>
    )
}