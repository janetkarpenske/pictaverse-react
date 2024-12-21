import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from './../firebase/config';
import classes from './../components/styles/PostDetailsPage.module.css';
import UserDashboard from "../components/UserDashboard";

export default function PostDetailsPage() {
    const [post, setPost] = useState(null);
    const params = useParams();

    useEffect(() => {
        async function fetchPost() {
            try {
                const docRef = doc(db, "upUserPosts", params.postId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setPost(docSnap.data());
                } else {
                    alert("No such pet exists");
                }
            }
            catch (error) {
                console.log("Error occurred fetching post from Firestore.")
            }
        }

        fetchPost();
    }, [])

    return (
        <>
            {post && (
                <div className={classes.postInfo}>
                    <h1>{post.upPostName}</h1>
                    <h2>{post.upCity}, {post.upState}</h2>
                    <img src={post.upImage} width="700px" alt="Post Image"></img>
                    <p>{post.upDescription}</p>
                    <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Mauris in integer mi adipiscing
                        turpis suscipit urna magna. Aptent at nam nisi arcu viverra congue facilisis per.
                        Primis tempus adipiscing rutrum hac conubia fermentum sem. Sit gravida sem sapien
                        donec semper nullam curabitur montes. Viverra est scelerisque dictum ultrices nam.
                        Volutpat duis etiam vulputate magna nisi. Lectus pulvinar venenatis eu quam lacinia magnis
                        taciti nec nascetur.</p>
                    <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Mauris in integer mi adipiscing
                        turpis suscipit urna magna. Aptent at nam nisi arcu viverra congue facilisis per.
                        Primis tempus adipiscing rutrum hac conubia fermentum sem. Sit gravida sem sapien
                        donec semper nullam curabitur montes. Viverra est scelerisque dictum ultrices nam.
                        Volutpat duis etiam vulputate magna nisi. Lectus pulvinar venenatis eu quam lacinia magnis
                        taciti nec nascetur. Aptent at nam nisi arcu viverra congue facilisis per.
                        Primis tempus adipiscing rutrum hac conubia fermentum sem. Sit gravida sem sapien
                        donec semper nullam curabitur montes</p>
                        <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Mauris in integer mi adipiscing
                        turpis suscipit urna magna. Aptent at nam nisi arcu viverra congue facilisis per.
                        Primis tempus adipiscing rutrum hac conubia fermentum sem. Sit gravida sem sapien
                        donec semper nullam curabitur montes. Viverra est scelerisque dictum ultrices nam.
                        Volutpat duis etiam vulputate magna nisi. Lectus pulvinar venenatis eu quam lacinia magnis
                        taciti nec nascetur.</p>
                </div>
            )}
            
        </>
    )
}