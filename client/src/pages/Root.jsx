import { Outlet, useNavigation } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

//Outlet defines where child routes should be rendered
function RootLayout() {
    //use Navigation can be used to determine what state the router is in
    //for example if there is a loader loading data
    const navigation = useNavigation();
    //navigation.state === loading

    return (
        <>
            <MainNavigation />
            <main>
                {navigation.state === 'loading' && <p>Loading...</p>}
                <Outlet />
            </main>
        </>
    )
}

export default RootLayout;