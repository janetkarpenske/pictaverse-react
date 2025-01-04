//import { useSelector } from "react-redux";
import store from './../store/index';
import { redirect } from "react-router-dom";

export function isUserAuthenticated() {
    //let authenticatedUserUID = useSelector((state => state.user.signedInUserUID));
    const state = store.getState();

    const authenticatedUserUID = state.user.signedInUserUID;

    console.log("In helper: ", authenticatedUserUID);

    if (!authenticatedUserUID) {
        return redirect("/signin");
    }
    else {
        return true;
    }
}