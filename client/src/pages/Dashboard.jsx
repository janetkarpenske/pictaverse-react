//import Map from "../components/Map";
import NewPostForm from "./../components/NewPostForm";

export default function Dashboard() {
    console.log("Rendered dashboard");
    return (
        <div className="container">
            <h1>User Dashboard</h1>
            {/* <Map /> */}
            <NewPostForm />
        </div>
    )
}